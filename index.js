const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;

const API_BASE_URL = "http://20.244.56.144/test";
const API_URL = "http://20.244.56.144/test/rand";


// Sliding window settings
const WINDOW_SIZE = 10;
let window = [];

app.get("/numbers/e", (req, res) => {
    let numbers = req.query.numbers;

    // Ensure numbers are an array
    if (!numbers) {
        return res.status(400).json({ error: "Numbers query param is required." });
    }

    if (!Array.isArray(numbers)) {
        numbers = [numbers]; // Convert single value to an array
    }

    numbers = numbers.map(num => parseInt(num, 10)).filter(num => !isNaN(num)); // Convert to integers

    // Maintain sliding window
    let windowPrevState = [...window]; // Save previous state
    window = [...window, ...numbers].slice(-WINDOW_SIZE);

    // Calculate average
    let avg = window.length ? (window.reduce((sum, num) => sum + num, 0) / window.length).toFixed(2) : 0;

    // Response structure
    res.json({
        windowPrevState,
        windowCurrState: window,
        numbers,
        avg: parseFloat(avg)
    });
});


app.get("/get-primes", async (req, res) => {
    try {
        const response = await axios.get("http://20.244.56.144/test/primes");
        res.json(response.data);
    } catch (error) {
        console.error("API Request Failed:", error.message);
        res.status(500).json({ error: "Error fetching prime numbers", details: error.message });
    }
});


// Route to fetch Fibonacci numbers
app.get("/fibonacci", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fibo`, {
            headers: {
                "Authorization": "Bearer YOUR_API_KEY_HERE"  // Replace with actual API key
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Fibonacci numbers:", error.message);
        res.status(500).json({ error: "Error fetching Fibonacci numbers", details: error.message });
    }
});

// Route to fetch Even numbers
app.get("/even-numbers", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fibo`); // Check if the correct endpoint is used
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Even numbers:", error.message);
        res.status(500).json({ error: "Error fetching Even numbers", details: error.message });
    }
});



app.get("/random-numbers", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching random numbers:", error.message);
        res.status(500).json({ error: "Error fetching random numbers", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
