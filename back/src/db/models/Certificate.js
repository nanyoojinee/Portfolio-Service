import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ certificate }) {
    return CertificateModel.create(certificate);
  }

  static async findById({ certificateId }) {
    return CertificateModel.findOne({ id: certificateId })
  }

  static async findByUserId({ userId }) {
    return CertificateModel.find({ userId });
  }

  static async deleteById({ certificateId }) {
    const deleteResult = await CertificateModel.deleteOne({ id: certificateId });
    return deleteResult.deletedCount === 1
  }
}

export { Certificate };
