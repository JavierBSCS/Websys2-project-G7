// routes/users.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
// MongoDB setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "ecommerceDB";
// Show registration form
router.get('/register', (req, res) => {
res.render('register', { title: "Register" });
});
// Handle form submission
router.post('/register', async (req, res) => {
try {
await client.connect();
const db = client.db(dbName);
const usersCollection = db.collection('users');
// Get form data
const newUser = {
name: req.body.name,
email: req.body.email,
password: req.body.password
};
// Insert into MongoDB
await usersCollection.insertOne(newUser);
res.send("User registered successfully!");
} catch (err) {
console.error("Error saving user:", err);
res.send("Something went wrong.");
}
});
module.exports = router;