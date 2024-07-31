const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:27017",
      "http://localhost:5005",
    ],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
//get all cohorts
app.get("/api/cohort", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.log("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});
//get single Cohort
app.get("/api/cohort/:id", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//post Cohort
app.post("/api/cohort", async (req, res, next) => {
  try {
    const response = await Cohort.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//update Cohort
app.put("/api/cohort/:id", async (req, res, next) => {
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//delete Cohort
app.delete("/api/cohort/:id", async (req, res, next) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
// Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:id", async (req, res, next) => {
  try {
    const response = await Student.find({
      cohort: req.params.id
    }).populate("cohort")
  

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

//get all students
app.get("/api/students", (req, res) => {
  Student.find({}).populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.log("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});
//get single student
app.get("/api/students/:id", async (req, res) => {
  try {
    const response = await Student.findById(req.params.id).populate("cohort");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//post student
app.post("/api/students", async (req, res, next) => {
  try {
    const response = await Student.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//update student
app.put("/api/students/:id", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});
//delete student
app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
