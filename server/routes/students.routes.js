const express = require("express")
const router = express.Router()

const Student = require("../models/Student.model.js");


// Retrieves all of the students for a given cohort
router.get("/cohort/:id", async (req, res, next) => {
    try {
      const response = await Student.find({
        cohort: req.params.id
      }).populate("cohort")
    
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  
  //get all students
  router.get("/", (req, res) => {
    Student.find({}).populate("cohort")
      .then((students) => {
        console.log("Retrieved students ->", students);
        res.json(students);
      })
      .catch((error) => {
        console.log(error)
      });
  });
  //get single student
  router.get("/:id", async (req, res) => {
    try {
      const response = await Student.findById(req.params.id).populate("cohort");
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //post student
  router.post("/", async (req, res, next) => {
    try {
      const response = await Student.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //update student
  router.put("/:id", async (req, res, next) => {
    try {
      const response = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //delete student
  router.delete("/:id", async (req, res, next) => {
    try {
      const response = await Student.findByIdAndDelete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  

  module.exports = router