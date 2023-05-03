import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDetail, setCertificateDetail] = useState("");
  const [certificationDate, setCertificationDate] = useState("");
  const [certificationGrade, setCertificationGrade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = portfolioOwnerId;

    const response = await Api.post("certificate/create", {
      userId: portfolioOwnerId,
      certificateName,
      certificateDetail,
      certificationDate,
      certificationGrade
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
      <br></br>
      <Form.Group controlId="formBasicCertificateName">
        <Form.Label>* 자격증 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="자격증명"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </Form.Group>
      <Row className="mt-3" style={{ width: "100%" }}>
        <Form.Group as={Col} controlId="formBasicCertificationDate" className="mt-3">
          <Form.Label>* 자격증 취득일</Form.Label>
          <br />
          <DatePicker
            selected={certificationDate}
            onChange={(date) => setCertificationDate(date)}
            dateFormat="yyyy.MM.dd"
            placeholderText="YYYY.MM.DD"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicCertificationGrade" className="mt-3">
          <Form.Label>* 자격증 등급</Form.Label>
          <Form.Control
            style={{width:"80%"}}
            type="text"
            placeholder="등급"
            value={certificationGrade}
            onChange={(e) => setCertificationGrade(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicCertificateDetail" className="mt-3" >
          <Form.Label>기타 설명</Form.Label>
          <Form.Control
            style={{width:"100%"}}
            type="text"
            placeholder="입력"
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
          <Button variant= "outline-dark"  size="sm" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
