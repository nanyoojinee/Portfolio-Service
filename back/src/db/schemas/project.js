import { Schema, model} from 'mongoose';

const ProjectSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
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