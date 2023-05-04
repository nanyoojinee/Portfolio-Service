import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";
// 파일 업로드 기능이 없으나 form-data로 application/json 처럼 요청을 받으려면 multer().none()로 설정하면 가능함
const multer = require("multer");

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.body.userId;
    const certificateName = req.body.certificateName;
    const certificateDetail = req.body.certificateDetail;
    const certificationDate = req.body.certificationDate;
    const certificationGrade = req.body.certificationGrade;

    const newCertificate = await CertificateService.addCertificate({
      userId,
      certificateName,
      certificateDetail,
      certificationDate,
      certificationGrade
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const certificate = await CertificateService.getCertificate({ certificateId });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put("/certificates/:id",multer().none(), async function (req, res, next) {
  try {
    const certificateId = req.params.id;
    const certificateName = req.body.certificateName ?? null;
    const certificateDetail = req.body.certificateDetail;
    const certificationDate = req.body.certificationDate;
    const certificationGrade = req.body.certificationGrade;

    const toUpdate = { certificateName, certificateDetail, certificationDate, certificationGrade };

    const certificate = await CertificateService.setCertificate({ certificateId, toUpdate });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.delete("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const result = await CertificateService.deleteCertificate({ certificateId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificatelist/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const certificateList = await CertificateService.getCertificateList({ userId });
    res.status(200).send(certificateList);
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };