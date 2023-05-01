import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class AwardService {
  static async addAward({ userId, title, description }) {
    const id = uuidv4();
    const award = { id, userId, title, description };
    return Award.create({ award });
  }

  static async getAward({ awardId }) {
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwardList({ userId }) {
    return Award.findByUserId({ userId });
  }

  static async setAward({ awardId, toUpdate }) {
    let award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      award.title = toUpdate.title;
    }

    if (toUpdate.description) {
      award.description = toUpdate.description
    }
    
    return award.save();
  }

  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { AwardService };
