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

//mongobd connection
mongoose
  .connect(MongoDB)
  .then(() => console.log("MongoDB  is connected to the database"))
  .catch((err) => console.log(err));

// mongo schema of user 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'technician'], default: 'user' }
});

const User = mongoose.model("User", userSchema);

// Registration 
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Validate request data
    if (!username || !email || !password) {
      throw new Error("Invalid request data");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    // Save user to database
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
    const { username, password,role } = req.body;
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ error: "username or email and password required" });
    }

    // Find user by username or email
    const user = await User.findOne({ $or: [{ username,role }] });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // checking the  password is matches are not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token, role: user.role }); // Include user role in response
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// // Login route
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password, role } = req.body;

//     // Validate input
//     if (!username || !password || !role) {
//       return res.status(400).json({ error: "Username, password, and role are required" });
//     }

//     // Find user by username and role
//     const user = await User.findOne({ username, role });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // Create token
//     // const token = jwt.sign({ id: user._id, role: user.role }, { expiresIn: "1h" });
//     // res.json({ token, role: user.role }); // Include user role in response
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Failed to login" });
//   }
// });




// Complaint Schema code
const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: mongoose.Schema.Types.String, ref: "User" },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Middleware to verify JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Complaint endpoints
app.post('/complaints', async (req, res) => {
    try {
      const { title, description } = req.body;
      const newComplaint = new Complaint({ title, description });
      await newComplaint.save();
      res.status(201).send({ message: 'Complaint created successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to create complaint' });
    }
  });

app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).send(complaints);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch complaints" });
  }
});

app.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user').populate('assignedTechnician');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

app.patch('/complaints/:id/assign', async (req, res) => {
  try {
    const { technicianId } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { assignedTechnician: technicianId, status: 'In Progress' }, { new: true }).populate('assignedTechnician');
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign technician' });
  }
});

app.get("/technicians", async (req, res) => {
  try {
    const technicians = await User.find({ role: "technician" }).select("username");
    res.json(technicians);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ error: "Failed to fetch technicians" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port no. ${PORT}`);
});
