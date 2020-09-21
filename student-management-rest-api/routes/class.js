const { Router } = require("express");
const isAuth = require("../middlewears/isAuth");

const router = Router();
const ClassController = require("../controllers/class");

router.post("/createclass", isAuth, ClassController.createClass);

router.get("/getclasses", isAuth, ClassController.getClasses);
router.get("/subjects/:classid", isAuth, ClassController.getSubjects);

router.delete("/class/:classid", isAuth, ClassController.deleteClass);
module.exports = router;
