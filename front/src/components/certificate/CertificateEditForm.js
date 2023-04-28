import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  const [certificateName, setCertificateName] = useState(currentCertificate.certificateName);
  const [certificateDetail, setCertificateDetail] = useState(currentCertificate.certificateDetail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = currentCertificate.user_id;

    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      certificateName,
      certificateDetail,
    });

    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicCertificateName">
        <Form.Control
          type="text"
          placeholder="자격증내역"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCertificateDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={certificateDetail}
          onChange={(e) => setCertificateDetail(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
