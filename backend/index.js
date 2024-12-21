import express from "express";
import mysql from "mysql2"; // Use mysql2 instead of mysql
import cors from "cors";
const app = express();

// Create the connection to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1Bruksel!",
    database: "test"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to the database successfully!");
});

// Endpoint for the root
app.get("/", (req, res) => {
    res.json("Hello, this is the backend!");
});

app.use(express.json())
app.use(cors())
// Endpoint to fetch books data
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"; // SQL query to fetch books
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            return res.status(500).json({ error: "Failed to fetch books" });
        }
        return res.json(data);
    });
});

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
            return res.json("Book has been created successfully.")
    });
});

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    });
});

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id= ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ];


    db.query(q,[...values, bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully.")
    });
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend on port 8800!");
});
