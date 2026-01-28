// IMPORT REQUIRED MODULES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// APP CONFIGURATION
const app = express();
app.use(cors()); // Allow frontend (React) to talk to backend
app.use(express.json()); // Allow JSON data from frontend

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// CREATE MONGOOSE MODEL
const Person = mongoose.model(
  "Person",
  {
    name: String,
    age: Number,
  },
  "person",
);

// READ - GET ALL PEOPLE
app.get("/", async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// CREATE - ADD NEW PERSON
app.post("/", async (req, res) => {
  const person = await Person.create(req.body);
  res.json(person);
});

// UPDATE - EDIT PERSON BY ID
app.put("/:id", async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id, // ID from URL
      req.body, // Updated data
      { new: true }, // Return updated document
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - REMOVE PERSON BY ID

app.delete("/:id", async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: "Person deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
// START SERVER
app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
