import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";
// 파일 업로드 기능이 없으나 form-data로 application/json 처럼 요청을 받으려면 multer().none()로 설정하면 가능함
const multer = require("multer");

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post("/project/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;
    const projectName = req.body.projectName;
    const projectDetail = req.body.projectDetail;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const newProject = await ProjectService.addProject({
      userId,
      projectName,
      projectDetail,
      startDate,
      endDate
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projects/:id", async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const project = await ProjectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projects/:id",multer().none(), async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const projectName = req.body.projectName ?? null;
    const projectDetail = req.body.projectDetail ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = { projectName, projectDetail, startDate, endDate };

    const project = await ProjectService.setProject({ projectId, toUpdate });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/projects/:id", async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const result = await ProjectService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/projectlist/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const projectList = await ProjectService.getProjectList({ userId });
    res.status(200).send(projectList);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
