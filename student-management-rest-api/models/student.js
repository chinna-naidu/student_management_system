const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    regid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    marks: [
      {
        subject: {
          type: String,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Student", studentSchema);
