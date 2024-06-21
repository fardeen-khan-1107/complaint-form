const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const MongoDB = "mongodb://127.0.0.1:27017/fardeen";

// mongodb connection
mongoose
  .connect(MongoDB)
  .then(() => console.log("MongoDB is connected to the database"))
  .catch((err) => console.log(err));

// mongo schema of user 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'technician'], default: 'user' }
});

const User = mongoose.model("User", userSchema);
app.get("/",(req,res)=>{
  res.send("Server is ready");
})
// Registration 
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      throw new Error("Invalid request data");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.send("Registration successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ error: "username, password  required" });
    }

    const user = await User.findOne({ username, role });
    if (!user) return res.status(400).json({ error: "Invalid data" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid data" });

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "unable to login" });
  }
});

// Complaint Schema code
const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, ref: "User" },
  assignedTechnician: { type: String, ref: "User" },
  status: { type: String, default: 'Pending' } // Added status field
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Middleware to verify JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ message: "Access denied" });

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Fetch complaints assigned to a specific technician
app.get('/technicians/:username/complaints', async (req, res) => {
  try {
    const { username } = req.params;
    const complaints = await Complaint.find({ assignedTechnician: username });
    res.json(complaints);
  } catch (error) {
    res.status(500).send('Error fetching complaints');
  }
});

// Create a new complaint
app.post('/complaints', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newComplaint = new Complaint({ title, description });
    await newComplaint.save();
    res.status(201).send({ message: 'Complaint created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create complaint' });
  }
});

// Fetch all complaints
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).send(complaints);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch complaints" });
  }
});

// Assign a technician to a complaint
app.put('/complaints/:id/assign', async (req, res) => { // Changed from PATCH to PUT
  try {
    const { technician } = req.body; // expecting technician username
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id, 
      { assignedTechnician: technician, status: 'In Progress' }, 
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign technician' });
  }
});

// Mark a complaint as fixed
app.put('/complaints/:id/fix', async (req, res) => { // New endpoint to mark complaint as fixed
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id, 
      { status: 'Fixed' }, 
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark complaint as fixed' });
  }
});

// Fetch all technicians

app.listen(PORT, () => {
  console.log(`Server is listening on the port no. ${PORT}`);
});
