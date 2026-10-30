
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Your frontend files are in the project folder.
app.use(express.static(__dirname));

// Send the homepage when someone visits the website.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the Travel Bud server.
app.listen(PORT, () => {
    console.log(`Travel Bud is running at http://localhost:${PORT}`);
});
