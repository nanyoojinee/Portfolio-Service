import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const graduationList = ["재학중", "학사졸업", "석사졸업", "박사졸업"];

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");

  const [entranceDate, setEntranceDate] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [score, setScore] = useState("");
  const [scoremax, setScoremax] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = portfolioOwnerId;

    const response = await Api.post("education/create", {
      userId: portfolioOwnerId,
      school,
      major,
      graduationStatus,
      entranceDate,
      graduationDate,
      score,
      scoremax
    });
    // create에 성공했다면
    if (response.status === 200) {
      // 추가된 award 객체를 만들고 (response에서 새롭게 생성된 award의 id를 준다고 가정했을 경우)
      const newCertificate = {
        school,
        major,
        graduationStatus,
        entranceDate,
        graduationDate,
        score,
        scoremax,
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
        <Form.Label>* 학교 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교명"
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
          <Form.Label>졸업(예정)년월</Form.Label>
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

export default EducationAddForm;
