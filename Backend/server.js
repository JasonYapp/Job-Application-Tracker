const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// Test route
app.get('/api/test', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('SELECT 1');
        await connection.end();
        res.json({ message: 'Database connected successfully! Hello from backend :)' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Signup route
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name, phone } = req.body;

    // Validate input
    if (!email || !password || !name || !phone) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Check if user already exists
        const [existingUsers] = await connection.execute(
            'SELECT email FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            await connection.end();
            return res.status(400).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await connection.execute(
            'INSERT INTO users (email, password_hash, first_name, phone_number) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, phone]
        );

        await connection.end();

        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
});


// Login route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Get user with hashed password
        const [users] = await connection.execute(
            'SELECT id, email, password_hash, first_name FROM users WHERE email = ?',
            [email]
        );

        await connection.end();

        // Check if user exists
        if (users.length === 0) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        const user = users[0];

         // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }


        // Generate JWT token 
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.first_name
            }
        });

  
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
});


//Applications route (add applications)
app.post('/api/auth/application', async (req, res) => {
    try {

        //get userID from token first
        const token = req.headers.authorization?.split('')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const { job_title, company_name, salary_range, status, job_url, notes} = req.body;

        if (!job_title || !company_name || !salary_range || !status || !job_url) {
                return res.status(400).json({ 
                    message: 'Missing required fields: job title, company name, salary, status, and job URL are required' 
                });
            }
        
        
        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            `INSERT INTO applications (
                user_id, company_name, job_title, status,  
                salary_range, job_url, notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, company_name, job_title, status, salary_range, job_url, notes || null]
        );

        await connection.end();

        res.status(201).json({
            message: 'Application successfully created',
            applicationId: result.insertId
        })


    } catch (error) {
        console.error('Database error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
        });
    }
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});