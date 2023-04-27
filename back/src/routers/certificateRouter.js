import is from "@sindresorhus/is"
import {Router} from 'express';
import {login_required} from '../middlewares/login_required';
import { certificateService } from '../services/certificateService';

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post('/certificate/create', async function (req,res,next) {
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        // req (request) 에서 데이터 가져오기
        const user_id = req.body.user_id;
        const certificateName = req.body.certificateName;
        const certificateDetail = req.body.certificateDetail;

        // 위 데이터를 프로젝트 db에 추가하기
        const newCertificate = await certificateService.addCertificate({
            user_id,
            certificateName,
            certificateDetail
        })

        res.status(201).json(newCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get("/certificates/:id", async function (req,res,next) {
    try {
        const certificateId = req.params.id;

        const certificate = await certificateService.getAward({certificateId});

        if([certificate].errorMessage) {
            throw new Error(certificate.errorMessage)
        }
        res.status(200).send(certificate);
    } catch (error) {
        next(error);
    }
})

certificateRouter.put('/certificates/:id', async function(req,res,next) {
    try {
        //URI로 사용자가 작성한 프로젝트를 추출함.
        const certificateId = req.params.id;
        const certificateName = req.body.certificateName ?? null;
        const certificateDetail = req.body.certificateDetail ?? null;

        const toUpdate = {certificateName, certificateDetail};

        // 해당 Object id로 Certificate 정보를 찾아 업데이트함. 업데이트 요소가 없을시 생략
        const updatedCertificate = await certificateService.setCertificate({certificateId, toUpdate});

        if (updatedCertificate.errorMessage) {
            throw new Error(updatedCertificate.errorMessage);
        }
        res.status(200).json(updatedCertificate)
    } catch (error) {
        next(error);
    }
});

certificateRouter.delete("certificates/:id", async function (req,res,next) {
    try {
        const certificateId = req.params.id;

        const deleteCertificate = await certificateService.deleteCertificate({ certificateId });

        if(deleteCertificate.errorMessage) {
            throw new Error(deleteCertificate.errorMessage);
        }
        res.status(200).send(deleteCertificate);
    } catch (error) {
        next(error);
    }
})

certificateRouter.get("certificatelist/:user_id", async function (req,res,next) {
    try {
        const user_id = req.params.user_id;
        const certificateList = await certificateService.getCertificateList({ user_id });
        res.status(200).send(certificateList);
    } catch (error) {
        next(error);
    }
})

export {certificateRouter}