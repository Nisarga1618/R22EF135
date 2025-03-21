const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876; // You can change the port if needed

// Route to fetch users from the API
app.get("/users", async (req, res) => {
    try {
        const response = await axios.get("http://20.244.56.144/test/users");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Error fetching users", details: error.message });
    }
});


app.get('/posts/:userid', async (req, res) => {
    const { userid } = req.params;
    const apiUrl = `http://20.244.56.144/test/users/${userid}/posts`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

app.get('/comments/:postid', async (req, res) => {
    const { postid } = req.params;
    const apiUrl = `http://20.244.56.144/test/posts/${postid}/comments`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
