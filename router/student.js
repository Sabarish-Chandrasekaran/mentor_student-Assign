const express = require("express");
const router=express.Router();
const studentModules = require("../modules/student")

// url for creating student
router.post("/create", studentModules.createStudent);

// url for changing mentor for a particular student
router.put("/update/:studentName", studentModules.updateStudent);

// finding students who are assigned to particular mentor
router.get("/get/:mentorName", studentModules.getStudent);


module.exports = router;
