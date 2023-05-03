import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";
// 파일 업로드 기능이 없으나 form-data로 application/json 처럼 요청을 받으려면 multer().none()로 설정하면 가능함
const multer = require("multer");

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const selectedDate = req.body.selectedDate;
    const newAward = await AwardService.addAward({
      userId,
      title,
      description,
      selectedDate
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const award = await AwardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id",multer().none(),async function (req, res, next) {
  try {
    const awardId = req.params.id;
    console.log(req.body);
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const selectedDate = req.body.selectedDate ?? null;

    const toUpdate = { title, description, selectedDate };
    const award = await AwardService.setAward({
      awardId,
      toUpdate,
    });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const awardList = await AwardService.getAwardList({ userId });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
