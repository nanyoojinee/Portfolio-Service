import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const graduationList = ['재학중', '학사졸업', '석사졸업', '박사졸업'];

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;

    await Api.post("education/create", {
      user_id: portfolioOwnerId,
      school,
      major,
      graduationStatus,
    });

    const res = await Api.get("educationlist", user_id);

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
      {graduationList.map((graduation,index)=>
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
  )}

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
