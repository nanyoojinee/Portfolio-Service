import { EducationModel } from "../schemas/education";

class Education {
  // 생성
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }
  // 찾기
  static async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }
  // 전체 목록 찾기
  static async findByUserId({ user_id }) {
    const educations = await EducationModel.find({ user_id });
    return educations;
  }
  // 수정
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateEducation;
  }
  // 삭제
  static async deleteById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Education };
