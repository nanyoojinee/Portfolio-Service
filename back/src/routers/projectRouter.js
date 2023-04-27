import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post("/project/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const user_id = req.body.user_id;
    const projectName = req.body.projectName;
    const projectDetail = req.body.projectDetail;

    const newProject = await ProjectService.addProject({
      user_id,
      projectName,
      projectDetail,
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

projectRouter.put("/projects/:id", async function (req, res, next) {
  try {
    const projectId = req.params.id;

    const projectName = req.body.projectName ?? null;
    const projectDetail = req.body.projectDetail ?? null;

    const toUpdate = { projectName, projectDetail };

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

projectRouter.get("/projectlist/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const projectList = await ProjectService.getProjectList({ user_id });
    res.status(200).send(projectList);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
