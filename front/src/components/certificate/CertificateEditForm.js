import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  const [certificateName, setCertificateName] = useState(currentCertificate.certificateName);
  const [certificateDetail, setCertificateDetail] = useState(currentCertificate.certificateDetail);
  const [certificationDate, setCertificationDate] = useState(currentCertificate.certificationDate);
  const [certificationGrade, setCertificationGrade] = useState(currentCertificate.certificationGrade);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const userId = currentCertificate.userId;
  
    try {
      await Api.put(`certificates/${currentCertificate.id}`, {
        userId,
        certificateName,
        certificateDetail,
        certificationDate,
        certificationGrade
      });
    } catch (error) {
      alert(`An error occurred while updating the certificate: ${error.message}`);
    }

    const res = await Api.get("certificatelist", userId);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicCertificateName">
        <Form.Control
          type="text"
          placeholder="자격증명"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </Form.Group>
      <Row className="mt-3" style={{ width: "100%" }}>
        <Form.Group as={Col} controlId="formBasicCertificationDate" className="mt-3">
          <Form.Label>자격증 취득일</Form.Label>
          <br />
          <DatePicker
            selected={certificationDate}
            onChange={(date) => setCertificationDate(date)}
            dateFormat="yyyy.MM.dd"
            placeholderText="YYYY.MM.DD"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicCertificationGrade" className="mt-3">
          <Form.Label>자격증 등급</Form.Label>
          <Form.Control
            style={{width:"80%"}}
            type="text"
            placeholder="등급"
            value={certificationGrade}
            onChange={(e) => setCertificationGrade(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicCertificateDetail" className="mt-3" >
          <Form.Label>상세내역</Form.Label>
          <Form.Control
            style={{width:"100%"}}
            type="text"
            placeholder="상세내역"
            value={certificateDetail}
            onChange={(e) => setCertificateDetail(e.target.value)}
          />
        </Form.Group>
      </Row>
      <br>
      
      </br>
      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-primary"  size="sm" type="submit" className="me-3">
            확인
          </Button>
          <Button variant= "outline-dark"  size="sm" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
