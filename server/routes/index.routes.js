const express = require("express")
const router = express.Router()

router.get("/",(req,res,next)=>{
    res.status(200).json({message: "all good"})
})

const studentRouter = require("./students.routes.js")
router.use("/students",studentRouter)

const cohortRouter = require("./cohorts.routes.js")
router.use("/cohorts",cohortRouter)

module.exports = router

