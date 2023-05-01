import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const graduationList = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = portfolioOwnerId;

    const response = await Api.post("education/create", {
      userId: portfolioOwnerId,
      school,
      major,
      graduationStatus,
    });
    // create에 성공했다면
    if (response.status === 200) {
      // 추가된 award 객체를 만들고 (response에서 새롭게 생성된 award의 id를 준다고 가정했을 경우)
      const newCertificate = {
        school,
        major,
        graduationStatus,
        id: response.id,
      };
      // 기존 Awards 배열에 맨 앞에 추가
      setEducations((prev) => [newCertificate, ...prev]);
      setIsAdding(false);
    }

    const res = await Api.get("educationlist", userId);

    setEducations(res.data);

    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <br />
      {graduationList.map((graduation, index) => (
        <Form.Check
          key={graduation}
          inline
          label={graduation}
          name="graduationStatus"
          type={"radio"}
          id={`inline-radio-${index}`}
          value={graduation}
          checked={graduationStatus === graduation}
          onChange={(e) => setGraduationStatus(e.target.value)}
        />
      ))}

      <br />
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

export default EducationAddForm;
