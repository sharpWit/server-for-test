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

// Route to handle POST requests and store data
app.post("/api/data", (req, res) => {
  const newData = req.body;

  if (newData) {
    dataStore.push(newData);
    saveDataToFile(); // Save data to file after each update
    res
      .status(201)
      .json({ message: "Data successfully added", data: { items: [newData] } });
  } else {
    res.status(400).json({ error: "Invalid data format" });
  }
});

// Route to get all data
app.get("/api/data", (req, res) => {
  res.json({ data: dataStore });
});

// Route to get a specific item by ID
app.get("/api/data/:id", (req, res) => {
  const itemId = req.params.id;
  const item = dataStore.find((item) => item.id === itemId);

  if (item) {
    res.json({ data: { items: [item] } });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Route to handle PATCH requests and update data
app.patch("/api/data/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  const index = dataStore.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    dataStore[index] = { ...dataStore[index], ...updatedData };
    saveDataToFile(); // Save data to file after each update
    res.status(200).json({
      message: "Data successfully updated",
      data: { items: [dataStore[index]] },
    });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Route to handle DELETE requests and remove data
app.delete("/api/data/:id", (req, res) => {
  const itemId = req.params.id;

  const index = dataStore.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    const deletedItem = dataStore.splice(index, 1)[0];
    saveDataToFile(); // Save data to file after each update
    res.status(200).json({
      message: "Data successfully deleted",
      data: { items: [deletedItem] },
    });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post("/", (req, res) => {
  res.status(201).send("thanks for adding something");
});

app.put("/:id", (req, res) => {
  res.status(200).send("thanks for updating something");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
