import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ project }) {
    return ProjectModel.create(project);
  }

  static async findById({ projectId }) {
    return ProjectModel.findOne({ id: projectId })
  }

  static async findByUserId({ userId }) {
    return ProjectModel.find({ userId });
  }

  static async deleteById({ projectId }) {
    const deleteResult = await ProjectModel.deleteOne({ id: projectId });
    return deleteResult.deletedCount === 1;
  }
}

export { Project };
