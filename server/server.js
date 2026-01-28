const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // ✅ Fixes Axios Network Error
app.use(express.json()); // ✅ Read JSON body

// Fake database (in-memory)
let users = [
  { id: 1, name: "Manoj", email: "manoj@test.com" },
  { id: 2, name: "Arockia", email: "arockia@test.com" },
];

// GET all users
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    data: newUser,
  });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.status(200).json({
    message: "User updated successfully",
    data: user,
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const beforeDelete = users.length;

  users = users.filter((u) => u.id != req.params.id);

  if (users.length === beforeDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
