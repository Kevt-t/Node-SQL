const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,       // Reads DB_HOST from .env
    user: process.env.DB_USER,       // Reads DB_USER from .env
    password: process.env.DB_PASSWORD, // Reads DB_PASSWORD from .env
    database: process.env.DB_NAME    // Reads DB_NAME from .env
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database with thread ID:', connection.threadId);
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Form validation middleware
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || title.length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters' });
    }
    next();
};

// Create a task
app.post('/tasks', validateTask, (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';

    connection.query(query, [title, description], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
