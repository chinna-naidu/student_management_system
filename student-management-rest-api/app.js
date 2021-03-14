const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const AuthRoutes = require("./routes/user");
const ClassRoutes = require("./routes/class");
const StudentRoutes = require("./routes/student");
const app = express();
const MONGODB_URI =
  "mongodb+srv://chinna:yourpassword@mycluster-rkyko.mongodb.net/student_management";
app.use(bodyParser.json());
app.use(cors());
app.use(AuthRoutes);
app.use(ClassRoutes);
app.use(StudentRoutes);
app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
      error: error,
      element: error.element,
    });
  } else {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  })
  .catch((err) => console.log(err));
