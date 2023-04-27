import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const graduationStatus = req.body.graduationStatus;

    const newEducation = await EducationService.addEducation({
      user_id,
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

educationRouter.put("/educations/:id", async function (req, res, next) {
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

educationRouter.get("/educationlist/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const EducationList = await EducationService.getEducationList({ user_id });
    res.status(200).send(EducationList);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
