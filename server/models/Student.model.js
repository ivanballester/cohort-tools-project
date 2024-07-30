const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  linkedinUrl: { type: String },
  languages: [{ type: String }],
  program: { type: String },
  background: { type: String },
  image: { type: String },
  projects: Array,
  cohort: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true }
});

const Student =   mongoose.model("Student", studentsSchema);

module.exports = Student;
