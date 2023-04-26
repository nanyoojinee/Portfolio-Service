import is from "@sindresorhus/is"
import {Router} from 'express';
import {login_required} from '../middlewares/login_required';
import { projectService } from '../services/projectService';

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post('/project/create', async function (req,res,next) {
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        // req (request) 에서 데이터 가져오기
        const user_id = req.body.user_id;
        const projectName = req.body.projectName;
        const projectDetail = req.body.projectDetail;

        // 위 데이터를 프로젝트 db에 추가하기
        const newProject = await projectService.addProject({
            user_id,
            projectName,
            projectDetail
        })

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projects/:id", async function (req,res,next) {
    try {
        const projectId = req.params.id;

        const project = await projectService.getAward({projectId});

        if([project].errorMessage) {
            throw new Error(project.errorMessage)
        }
        res.status(200).send(project);
    } catch (error) {
        next(error);
    }
})

projectRouter.put('/projects/:id', async function(req,res,next) {
    try {
        //URI로 사용자가 작성한 프로젝트를 추출함.
        const projectId = req.params.id;
        const projectName = req.body.projectName ?? null;
        const projectDetail = req.body.projectDetail ?? null;

        const toUpdate = {projectName, projectDetail};

        // 해당 Object id로 Project 정보를 찾아 업데이트함. 업데이트 요소가 없을시 생략
        const updatedProject = await projectService.setProject({projectId, toUpdate});

        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }
        res.status(200).json(updatedProject)
    } catch (error) {
        next(error);
    }
});

projectRouter.delete("projects/:id", async function (req,res,next) {
    try {
        const projectId = req.params.id;

        const deleteProject = await projectService.deleteProject({ projectId });

        if(deleteProject.errorMessage) {
            throw new Error(deleteProject.errorMessage);
        }
        res.status(200).send(deleteProject);
    } catch (error) {
        next(error);
    }
})

projectRouter.get("projectlist/:user_id", async function (req,res,next) {
    try {
        const user_id = req.params.user_id;
        const projectList = await projectService.getProjectList({ user_id });
        res.status(200).send(projectList);
    } catch (error) {
        next(error);
    }
})

export {projectRouter}