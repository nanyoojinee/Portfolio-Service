import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [graduationStatus, setGraduationStatus] = useState(
    currentEducation.graduationStatus
  );
  const [entranceDate, setEntranceDate] = useState(new Date(currentEducation.entranceDate));
  const [graduationDate, setGraduationDate] = useState(new Date(currentEducation.graduationDate));
  const [score, setScore] = useState(currentEducation.score?currentEducation.score:0);
  const [scoremax, setScoremax] = useState(currentEducation.scoremax?currentEducation.scoremax:0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!school || !major || !entranceDate || !graduationDate || !graduationStatus) {
      return alert("학교 이름, 전공, 입학 및 졸업년월, 졸업상태는 필수 입력 값입니다.");
    }
    if (graduationDate < entranceDate) {
      return alert("졸업일은 입학일 이후의 날짜여야 합니다.");
    }
    const userId = currentEducation.userId;

    try {
      await Api.put(`educations/${currentEducation.id}`, {
        userId,
        school,
        major,
        graduationStatus,
        entranceDate,
        graduationDate,
        score,
        scoremax,
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
        <br></br>
        <Form.Label>* 학교 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Label>* 전공</Form.Label>
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Row className="mt-3" style={{ width: "500px" }}>
        <Form.Group as={Col} controlId="formBasicEntranceDate">
          <Form.Label>* 입학년월</Form.Label>
          <DatePicker
            selected={entranceDate}
            onChange={(date) => setEntranceDate(date)}
            dateFormat="yyyy.MM"
            showMonthYearPicker
            placeholderText="YYYY.MM"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicGraduationDate">
          <Form.Label>* 졸업(예정)년월</Form.Label>
          <DatePicker
            selected={graduationDate}
            onChange={(date) => setGraduationDate(date)}
            dateFormat="yyyy.MM"
            showMonthYearPicker
            placeholderText="YYYY.MM"
          />
        </Form.Group>
      </Row>

      <Form.Group controlId="formBasicScore" className="mt-3">
        <Form.Label>평점</Form.Label>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              type="number"
              placeholder="평점"
              value={score}
              min="0"
              max="4.5"
              step="0.1"
              onChange={(e) => setScore(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="px-0">
            <span className="mx-2">점</span>
            <span className="mx-2">/</span>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="number"
              placeholder="만점"
              value={scoremax}
              min="0"
              max="4.5"
              step="0.1"
              onChange={(e) => setScoremax(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="px-0">
            <span className="mx-2">만점</span>
          </Col>
        </Row>
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

export default EducationEditForm;

