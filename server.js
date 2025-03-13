require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors")

app.use(express.json());

app.use(cors({
    origin: "https://kalastusluvat.vercel.app", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));


const connection = mysql.createConnection({
    host: process.env.MYSQLHOST, // Use Railway variable
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


// Rekistering

app.post("/register", (req, res) => {
    const { username, password, full_name, email, address } = req.body;

    const query = `INSERT INTO customers (username, password, full_name, email, address) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [username, password, full_name, email, address], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully!" });
    });
});


// Kirjautuminen sisÄän 

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM customers WHERE username = ? AND password = ?`;

    connection.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) return res.status(401).json({ error: "Invalid username or password" });

        res.json({ message: "Login successful!", user: results[0] });
    });
});



app.get("/users", (req, res) => {
    connection.query("SELECT * FROM customers", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});
