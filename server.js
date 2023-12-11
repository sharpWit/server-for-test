const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");

const app = express();
const port = 3001;
const dataFilePath = path.join(__dirname, "data", "data.json");

app.use(cors());
app.use(express.json());

// Ensure the data directory exists
const dataDirectory = path.join(__dirname, "data");
fs.mkdir(dataDirectory, { recursive: true });

// Load existing data from file
let dataStore = [];
try {
  const dataFileContent = fs.readFileSync(dataFilePath, "utf-8");
  dataStore = JSON.parse(dataFileContent);
} catch (error) {
  console.error("Error reading data file:", error.message);
}

// Save data to file function
const saveDataToFile = async () => {
  try {
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(dataStore, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing data to file:", error.message);
  }
};

// Example routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to handle POST requests and store data
app.post("/api/data", (req, res) => {
  const newData = req.body;

  if (newData) {
    dataStore.push(newData);
    saveDataToFile(); // Save data to file after each update
    res.status(201).json({ message: "Data successfully added", data: newData });
  } else {
    res.status(400).json({ error: "Invalid data format" });
  }
});

// Route to get stored data
app.get("/api/data", (req, res) => {
  res.json({ data: dataStore });
});

app.post("/", (req, res) => {
  res.status(201).send("thanks for adding something");
});

app.put("/:id", (req, res) => {
  res.status(200).send("thanks for updating something");
});

app.patch("/:id", (req, res) => {
  res.status(200).send("thanks for updating something");
});

app.delete("/:id", (req, res) => {
  res.status(200).send("thanks for deleting something");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
