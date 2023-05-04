import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static async addProject({ userId, projectName, projectDetail, startDate, endDate }) {
    const id = uuidv4();
    const project = { id, userId, projectName, projectDetail, startDate, endDate };
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

    project.projectDetail = toUpdate.projectDetail;

    if (toUpdate.startDate) {
      project.startDate = toUpdate.startDate;
    }

    if (toUpdate.endDate) {
      project.endDate = toUpdate.endDate;
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
