const { Router } = require("express");
const isAuth = require("../middlewears/isAuth");
const StudentController = require("../controllers/student");
const router = Router();

router.post("/students", isAuth, StudentController.addStudent);

router.get("/students/:classid", isAuth, StudentController.getStudents);

router.get("/student/:id", isAuth, StudentController.getOneStudent);

router.patch("/students", isAuth, StudentController.updateStudent);

router.post("/marks/:id", isAuth, StudentController.addMarks);

router.get("/marks/:id", isAuth, StudentController.getStudentMarks);

router.get("/class/:classid", isAuth, StudentController.getStudentsCount);

router.delete("/delete/student", isAuth, StudentController.deleteStudent);

router.get("/result/:id", StudentController.getOneStudentByRollnumber);
module.exports = router;
