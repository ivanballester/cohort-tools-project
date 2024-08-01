const config = (app)=>{
    const express = require("express");
    const morgan = require("morgan");
    const cookieParser = require("cookie-parser");
    const cors = require("cors");

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
    cors({
      origin:[process.env.ORIGIN]

    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(cookieParser());
  


}

module.exports = config
