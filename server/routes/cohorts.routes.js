const express = require("express")
const router = express.Router()

const Cohort = require("../models/Cohort.model.js");

//get all cohorts
router.get("/", (req, res,next) => {
    Cohort.find({})
      .then((cohorts) => {
        console.log("Retrieved cohorts ->", cohorts);
        res.json(cohorts);
      })
      .catch((error) => {
        console.log(error)
      });
  });
  //get single Cohort
  router.get("/:id", async (req, res,next) => {
    try {
      const response = await Cohort.findById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //post Cohort
  router.post("/", async (req, res, next) => {
    try {
      const response = await Cohort.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //update Cohort
  router.put("/:id", async (req, res, next) => {
    try {
      const response = await Cohort.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });
  //delete Cohort
  router.delete("/:id", async (req, res, next) => {
    try {
      const response = await Cohort.findByIdAndDelete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
    }
  });

  module.exports = router