import {Certificate} from "../db";
import { v4 as uuidv4} from "uuid";

class certificateService{
    static async addCertificate({ user_id, certificateName, certificateDetail }) {
        
        const id = uuidv4();

        const newCertificate = {id, user_id, certificateName, certificateDetail};
        const createdNewCertificate = await Certificate.create({ newCertificate });
        createdNewCertificate.errorMessage = null;

        return createdNewCertificate;
    }
    
    static async getCertificate({CertificateId}){
        const certificate = await Certificate.findById({CertificateId});
        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증이 존재하지 않습니다.";
            return {errorMessage};
        }
        return certificate;
    }

    static async getCertificateList({ user_id }) {
        const certificate = await Certificate.findByUserId({user_id});
        return certificate;
    }

    static async setCertificate({ certificateId, toUpdate}) {
        let certificate = await Certificate.findById({ certificateId })

        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증이 존재하지 않습니다."
            return {errorMessage};
        }

        if (toUpdate.certificateName) {
            const fieldToUpdate = 'certificateName';
            const newValue = toUpdate.certificateName;
            certificate = await Certificate.update({certificateId, fieldToUpdate, newValue})
        }

        if (toUpdate.certificateDetail) {
            const fieldToUpdate = 'certificateDetail';
            const newValue = toUpdate.certificateDetail;
            certificate = await Certificate.update({certificateId, fieldToUpdate, newValue})
        }
        return certificate;
    }

    static async deleteCertificate({certificateId}) {
        const checkCertificateDeleted = await Certificate.deleteById({certificateId});

        if(!checkCertificateDeleted) {
            const errorMessage = "해당 id를 가진 자격증이 존재하지 않습니다."
            return {errorMessage}
        }
        return {status: "ok"}
    }
}

export {certificateService};