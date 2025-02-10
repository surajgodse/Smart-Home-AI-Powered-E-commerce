// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');
const fs = require('fs').promises; 

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Successfully connected to MySQL database');
    connection.release();
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Login route
app.post('/api/login', async (req, res) => {
    console.log('Login request received:', req.body);
    const { username, password, usertype } = req.body;

    try {
        // Get user from database
        const [users] = await db.promise().query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );

        console.log('Found users:', users);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        const user = users[0];

        // Verify usertype matches
        if (user.usertype !== usertype) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user type'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                usertype: user.usertype
            },
            'your-secret-key', // Change this to a secure secret in production
            { expiresIn: '24h' }
        );

        // Send success response
        res.json({
            success: true,
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                username: user.username,
                usertype: user.usertype
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// Registration route
app.post('/api/register', async (req, res) => {
    console.log('Registration request received:', req.body);
    const { username, password, repassword, usertype } = req.body;

    // Validate password match
    if (password !== repassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords don't match!"
        });
    }

    try {
        // Check if username already exists
        const [existingUser] = await db.promise().query(
            'SELECT username FROM users WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists!'
            });
        }

        // Insert new user with plain password
        const [result] = await db.promise().query(
            'INSERT INTO users (username, password, usertype) VALUES (?, ?, ?)',
            [username, password, usertype]
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please login.',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// Create new order
app.post('/api/orders', async (req, res) => {
    console.log('Order creation request received:', req.body);
    
    try {
        // Get user info from token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authorization token provided'
            });
        }

        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.userId;

        const {
            product,
            customerName,
            customerAddress,
            creditAccountNo,
            deliveryType,
            storeLocation,
            quantity = 1
        } = req.body;

        // Calculate final price
        const finalPrice = product.price * (1 - product.discount / 100);

        // Insert order into database
        const [result] = await db.promise().query(
            `INSERT INTO Customers_orders (
                userId,
                productId,
                productName,
                price,
                discount,
                finalPrice,
                quantity,
                customerName,
                customerAddress,
                creditAccountNo,
                deliveryType,
                storeLocation
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                product.id || 'N/A', // You might want to add proper product IDs in your product data
                product.name,
                product.price,
                product.discount,
                finalPrice,
                quantity,
                customerName,
                customerAddress,
                creditAccountNo,
                deliveryType,
                deliveryType === 'inStore' ? storeLocation : null
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            orderId: result.insertId
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during order creation'
        });
    }
});

// Get user orders
app.get('/api/orders', async (req, res) => {
    try {
        // Get user info from token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authorization token provided'
            });
        }

        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.userId;

        // Get orders from database
        const [orders] = await db.promise().query(
            `SELECT * FROM Customers_orders WHERE userId = ? ORDER BY orderDate DESC`,
            [userId]
        );

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Order retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while retrieving orders'
        });
    }
});

// Get specific order
app.get('/api/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        
        // Get user info from token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authorization token provided'
            });
        }

        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.userId;

        // Get order from database
        const [orders] = await db.promise().query(
            `SELECT * FROM Customers_orders WHERE orderId = ? AND userId = ?`,
            [orderId, userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order: orders[0]
        });

    } catch (error) {
        console.error('Order retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while retrieving order'
        });
    }
});

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////
                        //AI Integration//
  //////////////////////////////////////////////////////////////////////////////////////
  const upload = multer({ storage });
  
  // Configure OpenAI
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  // Generate ticket number
  function generateTicketNumber() {
    return 'TKT' + Date.now().toString().slice(-6);
  }
  

function sanitizeAIDecision(decision) {
    // Remove any punctuation and trim whitespace
    const cleanDecision = decision.replace(/[.,!?]$/, '').trim();
    
    // Map to valid ENUM values
    const validDecisions = {
      'Refund Order': 'Refund Order',
      'Replace Order': 'Replace Order',
      'Escalate to Human Agent': 'Escalate to Human Agent'
    };
  
    return validDecisions[cleanDecision] || 'Escalate to Human Agent'; // Default fallback
  }
  
  //ticket creation endpoint
  app.post('/api/tickets', upload.single('image'), async (req, res) => {
      try {
        const { description, userId } = req.body;
        const imagePath = req.file.path;
        const ticketNumber = generateTicketNumber();
    
        // Convert image to base64
        const imageBuffer = await fs.readFile(imagePath);
        const base64Image = imageBuffer.toString('base64');
    
        // Send to OpenAI
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: [
                { 
                  type: "text", 
                  text: "Analyze this product/package image and determine the appropriate action: Refund Order, Replace Order, or Escalate to Human Agent.(Refund Order: For severely damaged items, Replace Order: For minor damages/defects, Escalate to Human Agent: For unclear cases Respond with ONLY ONE of these exact phrases."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                }
              ]
            }
          ]
        });
    
        const rawDecision = aiResponse.choices[0].message.content.trim();
        const sanitizedDecision = sanitizeAIDecision(rawDecision);
    
        // Store in database
        const [result] = await db.promise().query(
          'INSERT INTO service_tickets (ticket_id, user_id, description, image_path, ai_decision) VALUES (?, ?, ?, ?, ?)',
          [ticketNumber, userId, description, imagePath, sanitizedDecision]
        );
        
        res.json({ 
          success: true, 
          ticketNumber,
          decision: sanitizedDecision
        });
    
      } catch (error) {
        console.error('Ticket creation error:', error);
        res.status(500).json({ 
          success: false, 
          message: 'Error creating ticket',
          error: error.message
        });
      }
  });




  app.use('/uploads', express.static('uploads'));

  // Get ticket details
  app.get('/api/tickets/:ticketId', async (req, res) => {
    try {
      const { ticketId } = req.params;
      
      // Get user info from token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No authorization token provided'
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const userId = decoded.userId;
  
      // Log for debugging
      console.log('Searching for ticket:', {
        ticketId,
        userId
      });
  
      // Get ticket from database
      const [tickets] = await db.promise().query(
        `SELECT * FROM service_tickets WHERE ticket_id = ? AND user_id = ?`,
        [ticketId, userId]
      );
  
      // Log query results
      console.log('Query results:', tickets);
  
      if (tickets.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found or unauthorized access'
        });
      }
  
      res.json({
        success: true,
        ticket: tickets[0]
      });
  
    } catch (error) {
      console.error('Ticket retrieval error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while retrieving ticket',
        error: error.message // Include error message for debugging
      });
    }
  });




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});