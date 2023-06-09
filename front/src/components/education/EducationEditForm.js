import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [graduationStatus, setGraduationStatus] = useState(
    currentEducation.graduationStatus
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const userId = currentEducation.userId;
  
    try {
      await Api.put(`educations/${currentEducation.id}`, {
        userId,
        school,
        major,
        graduationStatus,
      });
    } catch (error) {
      alert(`An error occurred while updating the education: ${error.message}`);
    }

    const res = await Api.get("educationlist", userId);

    setEducations(res.data);

    setIsEditing(false);
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
      <Form.Check
        inline
        label="재학중"
        name="graduationStatus"
        type={"radio"}
        id={`inline-radio-1`}
        value="재학중"
        checked={graduationStatus === "재학중"}
        onChange={(e) => setGraduationStatus(e.target.value)}
      />
      <Form.Check
        inline
        label="학사졸업"
        name="graduationStatus"
        type={"radio"}
        id={`inline-radio-2`}
        value="학사졸업"
        checked={graduationStatus === "학사졸업"}
        onChange={(e) => setGraduationStatus(e.target.value)}
      />
      <Form.Check
        inline
        label="석사졸업"
        name="graduationStatus"
        type={"radio"}
        id={`inline-radio-3`}
        value="석사졸업"
        checked={graduationStatus === "석사졸업"}
        onChange={(e) => setGraduationStatus(e.target.value)}
      />
      <Form.Check
        inline
        label="박사졸업"
        name="graduationStatus"
        type={"radio"}
        id={`inline-radio-4`}
        value="박사졸업"
        checked={graduationStatus === "박사졸업"}
        onChange={(e) => setGraduationStatus(e.target.value)}
      />
      <br />
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

export default EducationEditForm;
