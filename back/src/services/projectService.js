import {Project} from "../db";
import { v4 as uuidv4} from "uuid";

class projectService{
    static async addProject({ user_id, projectName, projectDetail }) {
        
        const id = uuidv4();

        const newProject = {id, user_id, projectName, projectDetail};
        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null;

        return createdNewProject;
    }
    
    static async getProject({projectId}){
        const project = await Project.findById({projectId});
        if (!project) {
            const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다.";
            return {errorMessage};
        }
        return project;
    }

    static async getProjectList({ user_id }) {
        const project = await Project.findByUserId({user_id});
        return project;
    }

    static async setProject({ projectId, toUpdate}) {
        let project = await Project.findById({ projectId })

        if (!project) {
            const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다."
            return {errorMessage};
        }

        if (toUpdate.projectName) {
            const fieldToUpdate = 'projectName';
            const newValue = toUpdate.projectName;
            project = await Project.update({proejctid, fieldToUpdate, newValue})
        }

        if (toUpdate.projectDetail) {
            const fieldToUpdate = 'projectDetail';
            const newValue = toUpdate.projectDetail;
            project = await Project.update({projectid, fieldToUpdate, newValue})
        }
        return project;
    }

    static async deleteProject({projectId}) {
        const checkProjectDeleted = await Project.deleteById({projectId});

        if(!checkProjectDeleted) {
            const errorMessage = "해당 id를 가진 프로젝트가 존재하지 않습니다."
            return {errorMessage}
        }
        return {status: "ok"}
    }
}

export {projectService};