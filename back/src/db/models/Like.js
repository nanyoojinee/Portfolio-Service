import { LikeModel } from "../schemas/like";

class Like {
    static async findLike(userId, sendId) {
      return LikeModel.findOne({ 
        receiveLike: userId,
        sendLike: sendId,
      });
    }
  
    static async createLike(userId, sendId, bool) {
      return new LikeModel({
        receiveLike: userId,
        sendLike: sendId,
        isLiked: bool
      });
    }
  }
  

export { Like };
