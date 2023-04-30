import { Schema, model } from "mongoose";

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
    enum: ["재학중", "학사졸업", "석사졸업", "박사졸업"],
    required: true,
  },
});

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
