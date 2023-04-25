import { Schema, model} from 'mongoose';

const ProjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectName: {
        type: String,
        required: true,
    },
    projectDetail: {
        type: String,
        required: true,
    },
}
,{
    timestamps: true,
}
)

const ProjectModel = model("Project", ProjectSchema)

export {ProjectModel};