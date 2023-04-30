import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";
// 파일 업로드 기능이 없으나 form-data로 application/json 처럼 요청을 받으려면 multer().none()로 설정하면 가능함
const multer = require("multer");

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;
    const school = req.body.school;
    const major = req.body.major;
    const graduationStatus = req.body.graduationStatus;

    const newEducation = await EducationService.addEducation({
      userId,
      school,
      major,
      graduationStatus,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    const educationId = req.params.id;

    const education = await EducationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id",multer().none(), async function (req, res, next) {
  try {
    const educationId = req.params.id;

    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const graduationStatus = req.body.graduationStatus ?? null;

    const toUpdate = { school, major, graduationStatus };

    const education = await EducationService.setEducation({
      educationId,
      toUpdate,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/educations/:id", async function (req, res, next) {
  try {
    const educationId = req.params.id;

    const result = await EducationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const EducationList = await EducationService.getEducationList({ userId });
    res.status(200).send(EducationList);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
