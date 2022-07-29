const express = require("express");
const router = express.Router();
const mentorModules = require("../modules/mentor");

// url for creating mentor
router.post("/create", mentorModules.createMentor);

// url for updating mentor for student who's mentor is unassigned
router.put("/update/:mentorName", mentorModules.updateMentor);

module.exports = router;
