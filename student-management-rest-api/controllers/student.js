const Class = require("../models/class");
const Student = require("../models/student");
const student = require("../models/student");

exports.addStudent = (req, res, next) => {
  const regid = req.body.regid;
  const name = req.body.name;
  const email = req.body.email;
  const classid = req.body.classid;
  const student = new Student({
    name: name,
    email: email,
    regid: regid,
    marks: [],
  });
  student
    .save()
    .then(() => {
      return Class.findById(classid);
    })
    .then((classroom) => {
      return classroom.addStudent(student._id);
    })
    .then((data) => {
      return res.status(200).json({
        message: "Student Added Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getStudents = (req, res, next) => {
  const classid = req.params.classid;
  const page = +req.query.page;
  const size = +req.query.size;
  Class.findById(classid)
    .then((classroom) => {
      return classroom.getAllStudents((page - 1) * size, page * size);
    })
    .then((students) => {
      return res.status(200).json(
        students.map((std) => {
          return {
            id: std._id,
            name: std.name,
            email: std.email,
            marks: std.marks,
            regid: std.regid,
          };
        })
      );
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getOneStudent = (req, res, next) => {
  const sid = req.params.id;
  Student.findById(sid)
    .then((student) => {
      return res.status(200).json({
        id: student._id,
        name: student.name,
        email: student.email,
        marks: student.marks,
        regid: student.regid,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.updateStudent = (req, res, next) => {
  const id = req.body.id;
  const regid = req.body.regid;
  const name = req.body.name;
  const email = req.body.email;
  student
    .findById(id)
    .then((student) => {
      student.regid = regid;
      student.name = name;
      student.email = email;
      return student.save();
    })
    .then((data) => {
      return res.status(200).json({
        message: "Updated Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.addMarks = (req, res, next) => {
  const marks = req.body;
  const id = req.params.id;
  Student.findById(id)
    .then((student) => {
      student.marks = marks;
      return student.save();
    })
    .then((data) => {
      return res.status(200).json({
        message: "marks added successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getStudentMarks = (req, res, next) => {
  const sid = req.params.id;
  Student.findById(sid)
    .then((student) => {
      return res.status(200).json(student.marks);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.getStudentsCount = (req, res, next) => {
  const classid = req.params.classid;
  Class.findById(classid)
    .then((classroom) => {
      return res.status(200).json({
        totalstudents: classroom.students.length,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.deleteStudent = (req, res, next) => {
  const studentid = req.query.studentid;
  const classid = req.query.classid;
  Class.findById(classid)
    .then((classroom) => {
      return classroom.deleteStudent(studentid);
    })
    .then((data) => {
      return res.status(200).json({
        message: "successfully deleted Student",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getOneStudentByRollnumber = (req, res, next) => {
  const sid = req.params.id;
  Student.findOne({ regid: sid })
    .then((student) => {
      if (student) {
        return res.status(200).json({
          id: student._id,
          name: student.name,
          email: student.email,
          marks: student.marks,
          regid: student.regid,
        });
      } else {
        return res.status(200).json({});
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
