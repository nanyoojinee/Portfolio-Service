import mongoose,{ Schema, model } from "mongoose";


const LikeSchema = new Schema({
    receiveLike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sendLike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isLiked: {
        type: Boolean,
    },
});

const LikeModel = model("Like", LikeSchema);

export { LikeModel };