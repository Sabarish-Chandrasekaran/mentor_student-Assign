const mongo = require("../connect");

// create mentor
module.exports.createMentor = async (req, res, next) => {
  try {
    await mongo.selectedDb
      .collection("mentor")
      .insertOne(req.body.mentor)
      
    res.status(200).send({
      message: `mentor data created`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// assigning mentor for students who doesn't have mentor.
module.exports.updateMentor = async (req, res, next) => {
  try {
    let name = req.params.mentorName;
    let student_list = await mongo.selectedDb
      .collection("studentList")
      .find()
      
    student_list[0].nameList.forEach(async (obj) => {
      let student_data = await mongo.selectedDb
        .collection("student")
        .find({ name: obj })
        
      if (!student_data[0].mentorAssigned) {
        await mongo.selectedDb
          .collection("student")
          .findOneAndUpdate({ name: obj }, { $set: { mentorAssigned: name } });
        await mongo.selectedDb
          .collection("mentor")
          .findOneAndUpdate(
            { name },
            { $addToSet: { studentAssigned: { $each: [obj] } } }
          );
      }
    });
    res.status(200).json({
      message: "Mentor was assigned for unassigned students",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
