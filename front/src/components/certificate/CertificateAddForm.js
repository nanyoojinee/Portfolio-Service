import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDetail, setCertificateDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = portfolioOwnerId;

    const response = await Api.post("certificate/create", {
      userId: portfolioOwnerId,
      certificateName,
      certificateDetail,
    });
    // create에 성공했다면
    if(response.status === 200){
      // 추가된 award 객체를 만들고 (response에서 새롭게 생성된 award의 id를 준다고 가정했을 경우)
      const newCertificate = {certificateName, certificateDetail, id: response.id};
      // 기존 Awards 배열에 맨 앞에 추가
      setCertificates(prev => [newCertificate , ...prev])
      setIsAdding(false);
    }

    const res = await Api.get("certificatelist", userId);
    setCertificates(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
