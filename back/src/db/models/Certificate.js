import { CertificateModel } from "../schemas/certificate";

class Certificate {
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }
    static async findById({ CertificateId }) {
        const certificate = await CertificateModel.findOne({id: CertificateId});
        return certificate;
    }
    static async findByUserId({ user_id}) {
        const certificates = await CertificateModel.find({user_id});
        return certificates;
    }

    static async update({ certificateId, fieldToUpdate, newValue}) {
        const filter = { id: certificateId};
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false};

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate
    }

    static async deleteById({certificateId}) {
        const deleteCertificate = await AwardModel.deleteOne({id: certificateId});
        const checkCertificateDeleted = deleteCertificate.deletedCount === 1;
        return checkCertificateDeleted
    }
}

export {Certificate}