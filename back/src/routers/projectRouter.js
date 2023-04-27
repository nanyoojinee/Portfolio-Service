import is from "@sindresorhus/is"
import {Router} from 'express';
import {login_required} from '../middlewares/login_required';
import { projectAddService } from '../services/projectService';

const projectRouter = Router();
//login_required 나중에 넣으삼
projectRouter.post('/project', async function (req,res,next) {
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        // req (request) 에서 데이터 가져오기
        const id = req.body.id;
        const projectName = req.body.projectName;
        const projectDetail = req.body.projectDetail;

        // 위 데이터를 프로젝트 db에 추가하기
        const newProject = await projectAddService.addProject({
            id,
            projectName,
            projectDetail
        })

        if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.put('/project/edit', login_required, async function(req,res,next) {
    try {
        //Object Id로 사용자가 작성한 프로젝트를 추출함.
        const id = req.params.id;
        const ProjectName = req.body.projectName ?? null;
        const ProjectDetail = req.body.projectDetail ?? null;

        const toUpdate = {ProjectName, ProjectDetail};

        // 해당 Object id로 Project 정보를 찾아 업데이트함. 업데이트 요소가 없을시 생략
        const updatedProject = await projectAddService.setProject({id, toUpdate});

        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }
        res.status(200).json(updatedProject)
    } catch (error) {
        next(error);
    }
});

export {projectRouter}