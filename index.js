// const express = require('express');
// const mongo = require("./connect");
// // const studentRouter = require('./router/student')
// const mentorRouter = require("./router/mentor");

// const app = express();
// mongo.connect();
// app.use(express.json());

// app.use("/",(req, res, next) => {
//     res.send("middleware");
//     next();
// })
// app.use("/mentor", mentorRouter);
// // app.use("/student", studentRouter);
// app.listen(3001);

const express = require("express");
const mongo = require("./connect");
const mentorRouter = require("./router/mentor");
const studentRouter = require("./router/student");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
mongo.connect();

app.use("/", (req, res, next) => {
  console.log("Middleware");
  // res.send("hello");
  next();
});
app.use("/mentor", mentorRouter);
app.use("/student", studentRouter);

app.listen(process.env.PORT);
