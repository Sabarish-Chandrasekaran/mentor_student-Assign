const mongo = require("../connect");
const { ObjectId } = require("mongodb");

// creating student
module.exports.createStudent = async (req, res, next) => {
  try {
    await mongo.selectedDb.collection("student").insertOne(req.body.student);
    await mongo.selectedDb
      .collection("studentList")
      .findOneAndUpdate(
        { _id: ObjectId("628f1735e17ff23ac164b67d") },
        { $addToSet: { nameList: { $each: [req.body.student.name] } } }
      );
    res.status(200).send({
      message: `student data created`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// changing mentor for a particular student
module.exports.updateStudent = async (req, res, next) => {
  try {
    const name = req.params.studentName;
    const student_data = await mongo.selectedDb
      .collection("student")
      .find({ name })
      .toArray();
    const mentor_data = student_data[0].mentorAssigned;
    await mongo.selectedDb
      .collection("student")
      .findOneAndUpdate(
        { name },
        { $set: { mentorAssigned: req.body.mentorAssigned } }
      );
    await mongo.selectedDb
      .collection("mentor")
      .findOneAndUpdate(
        { name: req.body.mentorAssigned },
        { $addToSet: { studentAssigned: { $each: [name] } } }
      );
    await mongo.selectedDb
      .collection("mentor")
      .findOneAndUpdate(
        { name: mentor_data },
        { $pull: { studentAssigned: name } }
      );
    res.status(200).send({
      message: `${name}'s mentor is updated`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// finding students who are assigned to particular mentor
module.exports.getStudent = async (req, res, next) => {
  try {
    const name = req.params.mentorName;
    const findData = await mongo.selectedDb
      .collection("student")
      .find({ mentorAssigned: name })
      .toArray();
    res.status(200).json({ message: `student who were assigned to ${name}` });
    res.send(findData);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
