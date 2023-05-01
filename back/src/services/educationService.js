import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import { EducationModel } from "../db/schemas/education";

class EducationService {
  static async addEducation({ userId, school, major, graduationStatus }) {
    const id = uuidv4();
    const education = { id, userId, school, major, graduationStatus };
    return Education.create({ education });
  }

  static async getEducation({ educationId }) {
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return education;
  }

  static async getEducationList({ userId }) {
    return Education.findByUserId({ userId });
  }

  static async setEducation({ educationId, toUpdate }) {
    let education = await Education.findById({ educationId });

    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      education.school = toUpdate.school;
    }

    if (toUpdate.major) {
      education.major = toUpdate.major;
    }

    if (toUpdate.graduationStatus) {
        education.graduationStatus = toUpdate.graduationStatus;
      }
    
    return education.save();
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { EducationService };
