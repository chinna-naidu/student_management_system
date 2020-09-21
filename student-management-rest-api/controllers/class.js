const Class = require("../models/class.js");
exports.createClass = (req, res, next) => {
  const name = req.body.name;
  const subjects = req.body.subjects;
  if (!name) {
    const error = new Error("please enter a class name");
    error.status = 406;
    throw error;
  }
  if (!subjects) {
    const error = new Error("subjects can't be empty");
    error.status = 406;
    throw error;
  }
  const classroom = new Class({
    name: name,
    subjects: subjects,
    students: [],
    userid: req.user,
  });
  classroom
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "Successfully created a class",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClasses = (req, res, next) => {
  const userid = req.user._id;
  Class.find({ userid: userid })
    .then((classes) => {
      return res.status(200).json(
        classes.map((cls) => {
          return {
            id: cls._id,
            name: cls.name,
            subjects: cls.subjects,
            students: cls.students.length,
          };
        })
      );
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getSubjects = (req, res, next) => {
  const classid = req.params.classid;
  Class.findById(classid)
    .then((classroom) => {
      return res.status(200).json(classroom.subjects);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.deleteClass = (req, res, next) => {
  const classid = req.params.classid;
  Class.findById(classid)
    .then((classroom) => {
      return classroom.removeAllStudents();
    })
    .then(() => {
      return Class.findByIdAndDelete(classid);
    })
    .then((data) => {
      res.status(200).json({
        message: "successfully cleared classroom",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
