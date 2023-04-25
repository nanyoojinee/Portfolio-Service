import {User, Project} from "../db";
import {ObjectId} from 'mongodb'

class projectAddService{
    static async addProject({ id, projectName, projectDetail }) {
        const user = await User.findByObjectId({ id })
        if (!user) {
            const errorMessage =
            id+user+"유저를 찾을수 없습니다. 아마 ObjectId 연결 관련 에러"
            return { errorMessage };
        }
        const newProject = {id, projectName, projectDetail};
        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null;

        return createdNewProject;
    }
    
    static async setProject({ id, toUpdate}) {
        let project = await Project.findByObjectId({_id: ObjectId(id)})

        if (!project) {
            const errorMessage =
            "작성한 프로젝트를 찾을수 없습니다. 에러도 몰루겠습니다."
            return {errorMessage};
        }

        if (toUpdate.projectName) {
            const fieldToUpdate = 'projectName';
            const newValue = toUpdate.projectName;
            project = await Project.update({id, fieldToUpdate, newValue})
        }

        if (toUpdate.projectDetail) {
            const fieldToUpdate = 'projectDetail';
            const newValue = toUpdate.projectDetail;
            project = await Project.update({id, fieldToUpdate, newValue})
        }
        return project;
    }
}

export {projectAddService};