import { AwardModel } from "../schemas/award";

class Award {
  static async create({ award }) {
    return AwardModel.create(award);
  }

  static async findById({ awardId }) {
    return AwardModel.findOne({ id: awardId });
  }

  static async findByUserId({ userId }) {
    return AwardModel.find({ userId });
  }

  static async deleteById({ awardId }) {
    const deleteResult = await AwardModel.deleteOne({ id: awardId });
    return deleteResult.deletedCount === 1;
  }
}

export { Award };
