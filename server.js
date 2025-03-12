require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const urldb = 'mysql://root:mKGXwSOJLDMHFkQfaFxkjtGSBjMvTaEJ@mysql.railway.internal:3306/railway'
const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    urldb
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
