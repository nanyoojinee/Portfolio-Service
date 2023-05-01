import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static async addProject({ userId, projectName, projectDetail }) {
    const id = uuidv4();
    const project = { id, userId, projectName, projectDetail };
    return Project.create({ project });
  }

  static async getProject({ projectId }) {
    const project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }
    return project;
  }

  static async getProjectList({ userId }) {
    return Project.findByUserId({ userId });
  }

  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findById({ projectId });

    if (!project) {
      const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    if (toUpdate.projectName) {
      project.projectName = toUpdate.projectName;
    }

    if (toUpdate.projectDetail) {
      project.projectDetail = toUpdate.projectDetail;
    }

    return project.save();
  }

  static async deleteProject({ projectId }) {
    const checkProjectDeleted = await Project.deleteById({ projectId });

    if (!checkProjectDeleted) {
      const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }
    return { status: "ok" };
  }
}

export { ProjectService };
