import { Schema, model } from "mongoose";

const academicStatus = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

const EducationSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true,
  },
  school: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  graduationStatus: {
    type: String,
    enum: academicStatus,
    required: true,
  },
});

const EducationModel = model("Education", EducationSchema);

export { EducationModel };