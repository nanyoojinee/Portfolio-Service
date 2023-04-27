import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const user_id = req.body.user_id;
    const certificateName = req.body.certificateName;
    const certificateDetail = req.body.certificateDetail;

    const newCertificate = await CertificateService.addCertificate({
      user_id,
      certificateName,
      certificateDetail,
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

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const certificateName = req.body.certificateName ?? null;
    const certificateDetail = req.body.certificateDetail ?? null;

    const toUpdate = { certificateName, certificateDetail };

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

certificateRouter.get("/certificatelist/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const certificateList = await CertificateService.getCertificateList({ user_id });
    res.status(200).send(certificateList);
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };