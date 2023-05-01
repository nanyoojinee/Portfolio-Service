import { EducationModel } from "../schemas/education";

class Education {
  // 생성
  static async create({ education }) {
    return EducationModel.create(education);
  }
  // 찾기
  static async findById({ educationId }) {
    return EducationModel.findOne({ id: educationId });
  }
  // 전체 목록 찾기
  static async findByUserId({ userId }) {
    return EducationModel.find({ userId });
  }
  // 삭제
  static async deleteById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    return deleteResult.deletedCount === 1;
  }
}

export { Education };
