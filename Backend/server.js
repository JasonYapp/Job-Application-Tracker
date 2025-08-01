const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const twilio = require('twilio'); //More research on twilio integration required

const app = express();

// Initialize Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: false,
    connectTimeout: 60000,
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




// Signup route - SENDS OTP DURING SIGNUP
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name, phone } = req.body;


    if (!email || !password || !name || !phone) {
        return res.status(400).json({ 
            message: 'All fields are required' 
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


        // Temporarily store user details from SignUp form (pending OTP verification)
        await connection.execute(
            'INSERT INTO pending_users (email, password_hash, first_name, phone_number) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), first_name = VALUES(first_name), phone_number = VALUES(phone_number)',
            [email, hashedPassword, name, phone]
        );



        // Send OTP using Twilio Verify API
        const verification = await twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications
            .create({ to: phone, channel: 'sms' });

        await connection.end();

        res.status(200).json({
            message: 'OTP sent successfully. Please verify your phone number.',
            email: email 
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
});



//Verify OTP and complete Sign Up
app.post('/api/auth/signup/verify-otp', async (req, res) => {
    const {email, otp} = req.body;

    if (!email || !otp){
        return res.status(400).json({ 
            message: 'Email and OTP are required' 
        });
    }

    try {

        const connection = await mysql.createConnection(dbConfig);

        const [pendingUsers] = await connection.execute(
            'SELECT * FROM pending_users WHERE email = ?',
            [email]
        );


        if (pendingUsers.length === 0) {
            await connection.end();
            return res.status(400).json({ 
                message: 'No pending signup found' 
            });
        }

        const userData = pendingUsers[0];


        // Verify OTP using Twilio Verify API
        const verificationCheck = await twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: userData.phone_number, code: otp });

        if (verificationCheck.status !== 'approved') {
            await connection.end();
            return res.status(400).json({ 
                message: 'Invalid OTP' 
            });
        }

        // Move user to main users table
        const [result] = await connection.execute(
            'INSERT INTO users (email, password_hash, first_name, phone_number, phone_verified) VALUES (?, ?, ?, ?, ?)',
            [userData.email, userData.password_hash, userData.first_name, userData.phone_number, true]
        );

        // Delete from pending users
        await connection.execute(
            'DELETE FROM pending_users WHERE email = ?',
            [email]
        );

        await connection.end();



        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId
        });

    }   catch (error){

            console.error('OTP verification error:', error);
            res.status(500).json({ 
            message: 'Invalid or expired OTP',
            details: error.message 
        });
    }
})




//Send OTP for Forgot Password
app.post('/api/auth/ForgotPassword-Send-OTP', async (req,res) =>{
    const {email} = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ 
            message: 'Email required' 
        });
    }

    try {

        const connection = await mysql.createConnection(dbConfig);

        const [users] = await connection.execute(
            'SELECT phone_number FROM users WHERE email = ?',
            [email]
        );


        if (users.length === 0) {
            await connection.end();
            return res.status(400).json({ 
                message: 'No account found' 
            });
        }

        const phoneNumber = users[0].phone_number;

        try {
            
            // Send OTP using Twilio Verify API
            const verification = await twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });

            await connection.end();

            res.status(200).json({
                message: 'OTP sent successfully. Please verify your phone number.',
                email: email
            });

        }   catch (twilioError){
                console.error('Twilio error:', twilioError);
                return res.status(500).json({ 
                    message: 'Failed to send OTP',
                    details: twilioError.message 
                });
        }


    }   catch (error){
            console.error('Database error:', error);
            res.status(500).json({
                message: 'Internal server error',
                details: error.message
            });
    }
    
})



//Verify OTP for setting new password
app.post('/api/auth/ForgotPassword-VerifyOTP', async (req,res) =>{
    const {email, otp} = req.body;

    // Validate input
    if (!email || !otp) {
        return res.status(400).json({ 
            message: 'Email and OTP required' 
        });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        const[user] = await connection.execute(
            'SELECT * FROM users WHERE email =?',
            [email]
        );

        
        if (user.length === 0) {
            return res.status(401).json({ 
                message: 'No account found' 
            });
        }

        const userData = user[0];

        try {
            
            // Verify OTP using Twilio Verify API
            const verificationCheck = await twilioClient.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: userData.phone_number, code: otp });

            if (verificationCheck.status !== 'approved') {
                await connection.end();
                return res.status(400).json({ 
                    message: 'Invalid OTP' 
                });
            }

            await connection.end();

            res.status(200).json({
                message: 'OTP verified successfully. You can now change your password.',
                email: email 
            });

        }   catch (twilioError) {
                console.error('Twilio verification error:', twilioError);
                await connection.end();
                res.status(400).json({
                    message: 'Invalid or expired OTP',
                    details: twilioError.message
                });
        }

    }   catch (error) {
            console.error('OTP verification error:', error);
            res.status(500).json({
                message: 'Internal server error',
                details: error.message
            });
    }
});


// Reset Password route - Updates password after OTP verification
app.put('/api/auth/ForgotPassword-ResetPassword', async (req, res) => {
    const { email, newPassword } = req.body;    

    // Validate input
    if (!email || !newPassword) {
        return res.status(400).json({ 
            message: 'Email and new password are required' 
        });
    }

    // Validate password strength
    if (newPassword.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long'
        });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Check if user exists
        const [users] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(404).json({ 
                message: 'No account found' 
            });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user's password
        await connection.execute(
            'UPDATE users SET password_hash = ? WHERE email = ?',
            [hashedPassword, email]
        );

        await connection.end();

        res.status(200).json({
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }

})



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
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const { job_title, company_name, salary_range, status, job_url, notes, previous_status} = req.body;

        if (!job_title || !company_name || !salary_range || !status || !job_url || !previous_status) {
                return res.status(400).json({ 
                    message: 'Missing required fields: job title, company name, salary, status, and job URL are required' 
                });
            }
        
        
        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            `INSERT INTO applications (
                user_id, company_name, job_title, status,  
                salary_range, job_url, notes, previous_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, company_name, job_title, status, salary_range, job_url, notes || null, previous_status]
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



//Retrieve Application Data Route - Retrieves ALL objects
app.get('/api/auth/ApplicationData', async (req, res) => {
    try {

        //get userID from token first
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        

        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            `SELECT id, user_id, company_name, job_title, status, 
                salary_range, job_url, notes, created_at, updated_at, previous_status
            FROM applications
            WHERE user_id = ?
            ORDER BY status`,
            [userId]
        );

        await connection.end();

        res.json({
            success: true,
            applications: result
        });


    } catch (error) {
        console.error('Error fetching applications:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
        });
    }
})


// Retrieve SINGLE application by ID 
app.get('/api/auth/SingleApplication/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get userID from token (same as your other routes)
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        console.log('Fetching application with ID:', id, 'for user:', userId);
        
        const connection = await mysql.createConnection(dbConfig);
        
        // Query to get the application by ID AND user_id (for security)
        const [rows] = await connection.execute(
            `SELECT * FROM applications WHERE id = ? AND user_id = ?`,
            [id, userId]
        );

        await connection.end();

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        res.json(rows[0]); // Return the first (and only) result
        
    } catch (error) {
        console.error('Error fetching application:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        res.status(500).json({ 
            message: 'Server error',
            details: error.message 
        });
    }
});



//Update Application Data Route - UPDATES STATUS ONLY
app.put('/api/auth/ApplicationUpdateStatus', async (req, res) => {
    try {
        const { id, status: newStatus } = req.body;
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message:'No token provided'});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const connection = await mysql.createConnection(dbConfig);
        
        // First, get the current status (this will become previous_status)
        const [currentApp] = await connection.execute(
            `SELECT status FROM applications WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        
        if (!currentApp || currentApp.length === 0) {
            await connection.end();
            return res.status(404).json({ message: 'Application not found' });
        }
        
        const previousStatus = currentApp[0].status;
        
        // Update the application with new status and previous_status
        await connection.execute(
            `UPDATE applications 
             SET status = ?, previous_status = ?, updated_at = NOW() 
             WHERE id = ? AND user_id = ?`,
            [newStatus, previousStatus, id, userId]
        );
        
        // Fetch and return all updated applications
        const [result] = await connection.execute(
            `SELECT id, user_id, company_name, job_title, status, 
                salary_range, job_url, notes, created_at, updated_at, previous_status
            FROM applications
            WHERE user_id = ?
            ORDER BY status`,
            [userId]
        );
        
        await connection.end();
        
        res.json({
            success: true,
            applications: result
        });
        
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
});



//Edit Application Data Route 
app.put('/api/auth/EditApplication/:id', async (req, res) => {
    try {

        //get userID from token first
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const applicationId = req.params.id;

        // Validate applicationId is a number
        if (!applicationId || isNaN(applicationId)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }

        const { job_title, company_name, salary_range, status, job_url, notes, previous_status} = req.body;

        // Validate required fields
        if (!job_title || !company_name || !salary_range || !status || !job_url || !previous_status) {
            return res.status(400).json({
                message: 'Missing required fields: job title, company name, salary, status, and job URL are required'
            });
        }

        const connection = await mysql.createConnection(dbConfig);

        // Check if the application exists and belongs to the user
        const [existingRows] = await connection.execute(
            `SELECT id FROM applications WHERE id = ? AND user_id = ?`,
            [applicationId, userId]
        );

        if (existingRows.length === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Application not found or access denied'
            });
        }
        
        const [result] = await connection.execute(
            `UPDATE applications 
             SET company_name = ?, job_title = ?, status = ?, 
                 salary_range = ?, job_url = ?, notes = ?, previous_status = ?,updated_at = NOW()
             WHERE id = ? AND user_id = ?`,
            [company_name, job_title, status, salary_range, job_url, notes || null, previous_status, applicationId, userId]
        );

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Application not found or no changes made'
            });
        }

        res.status(200).json({
            message: 'Application updated successfully',
            applicationId: applicationId
        });


    } catch (error) {
        console.error('Error updating applications:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
        });
    }
})


//Delete an application by application ID
app.delete('/api/auth/DeleteApplication/:id', async (req, res) => {
    
    try {
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const applicationId = req.params.id;

        // Validate applicationId is a number
        if (!applicationId || isNaN(applicationId)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }


        const connection = await mysql.createConnection(dbConfig);

        // Check if the application exists and belongs to the user
        const [existingRows] = await connection.execute(
            `SELECT id FROM applications WHERE id = ? AND user_id = ?`,
            [applicationId, userId]
        );

        if (existingRows.length === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Application not found or access denied'
            });
        }
        
        const [result] = await connection.execute(
            `DELETE FROM applications 
             WHERE id = ? AND user_id = ?`,
            [applicationId, userId]
        );

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Application not found or no changes made'
            });
        }

        res.status(200).json({
            message: 'Application deleted successfully',
            applicationId: applicationId
        });

    }   catch (error) {
        console.error('Error deleting applications:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
        });
    } 
})



//Tasks route (add tasks)
app.post('/api/auth/task', async (req, res) => {
    try {

        //get userID from token first
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const { title, description, due_date,  job_application_id  } = req.body;

        if (!title || !due_date || !job_application_id  ) {
                return res.status(400).json({ 
                    message: 'Missing required fields' 
                });
            }
        
        
        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            `INSERT INTO tasks (
                user_id, title, description, due_date, job_application_id, is_completed
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, title, description || null, due_date, job_application_id, false]
        );

        await connection.end();

        res.status(201).json({
            message: 'Task successfully created',
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


//Retrieve tasks route (fetch tasks)
app.get('/api/auth/FetchTask/:id', async (req, res) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { id: applicationId } = req.params;

        if (!applicationId) {
            return res.status(400).json({ message: 'Application ID is required' });
        }
        
        console.log('Fetching task with ID:', applicationId, 'for user:', userId);
        
        const connection = await mysql.createConnection(dbConfig);
        
        const [rows] = await connection.execute(
            `SELECT * FROM tasks WHERE user_id = ? AND job_application_id = ?
            ORDER BY due_date ASC`,
            [userId, applicationId,]
        );

        await connection.end();

        

        res.json(rows);


    } catch (error) {
        console.error('Error fetching task:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
})


//Delete a task by taskID
app.delete('/api/auth/DeleteTask/:taskID', async (req, res) => {
    
    try {
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const taskID = req.params.taskID;

        // Validate taskID is a number
        if (!taskID || isNaN(taskID)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const connection = await mysql.createConnection(dbConfig);

        const [existingRows] = await connection.execute(
            `SELECT id FROM tasks WHERE id = ? AND user_id = ?`,
            [taskID, userId]
        );

        if (existingRows.length === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Task not found or access denied'
            });
        }
        
        const [result] = await connection.execute(
            `DELETE FROM tasks 
             WHERE id = ? AND user_id = ?`,
            [taskID, userId]
        );

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Task not found or no changes made'
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            taskID: taskID
        });

    }   catch (error) {
        console.error('Error deleting Task:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
        message: 'Internal server error',
        details: error.message 
        });
    } 
})



app.get('/api/auth/FetchUser', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token){
            return res.status(401).json({message:'No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const connection = await mysql.createConnection(dbConfig);
        
        const [result] = await connection.execute(
            `SELECT first_name FROM users WHERE id = ?`,
            [userId]
        );

        await connection.end();

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            firstname: result[0].first_name 
        });

    } catch (error) {
        console.error('Error fetching user:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message 
        });
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});