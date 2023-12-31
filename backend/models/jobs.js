const mongoose = require("mongoose");

const jobsModel = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobRequirements: { type: String, required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Job", jobsModel);
