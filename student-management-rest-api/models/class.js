const { Schema, model } = require("mongoose");
const Student = require("./student");
const ObjectId = Schema.Types.ObjectId;

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    subjects: [{ type: String }],
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

classSchema.methods.removeAllStudents = async function (id) {
  const students = this.students;
  for (let item of students) {
    await Student.findByIdAndDelete(item);
  }
  return this.save();
};
classSchema.methods.addStudent = function (studentId) {
  const students = this.students;
  students.push(studentId);
  this.students = students;
  return this.save();
};
classSchema.methods.getAllStudents = async function (lower, size) {
  const students = [];
  for (let i = 0; i < this.students.length; i++) {
    const student = await Student.findById(this.students[i]);
    students.push(student);
  }

  students.sort((a, b) => {
    if (a.regid < b.regid) {
      return -1;
    } else if (a.regid > b.regid) {
      return 1;
    } else {
      return 0;
    }
  });
  return students.slice(lower, size);
};
classSchema.methods.deleteStudent = function (studentId) {
  return Student.findByIdAndDelete(studentId)
    .then(() => {
      let students = this.students;
      let modifedstudents = students.filter((el) => {
        return el.toString() !== studentId;
      });
      this.students = modifedstudents;
      return this.save();
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = model("Class", classSchema);
