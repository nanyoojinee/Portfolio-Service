import { ProjectModel } from "../schemas/project"

class Project {
    static async create({ newProject }) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }
    static async findByObjectId({ objectId }) {
        const project = await ProjectModel.findOne({_id: objectId});
        return project;
    }
    static async update({ project_id, fieldToUpdate, newValue}) {
        const filter = { id: project_id};
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false};

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProject
    }
}

export {Project}