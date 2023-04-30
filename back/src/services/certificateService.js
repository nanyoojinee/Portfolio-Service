import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static async addCertificate({ userId, certificateName, certificateDetail }) {
    const id = uuidv4();
    const certificate = { id, userId, certificateName, certificateDetail };
    return Certificate.create({ certificate });
  }

  static async getCertificate({ certificateId }) {
    const certificate = await Certificate.findById({ certificateId });
    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificateList({ userId }) {
    return Certificate.findByUserId({ userId });
  }

  static async setCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findById({ certificateId });

    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.certificateName) {
      certificate.certificateName = toUpdate.certificateName;
    }

    if (toUpdate.certificateDetail) {
      certificate.certificateDetail = toUpdate.certificateDetail;
    }
    
    return certificate.save();
  }

  static async deleteCertificate({ certificateId }) {
    const isDataDeleted = await Certificate.deleteById({ certificateId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { CertificateService };
