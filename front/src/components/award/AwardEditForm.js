import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);
  const [selectedDate, setSelectedDate] = useState(currentAward.selectedDate);

    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const userId = currentAward.userId;
  
      try {
        await Api.put(`awards/${currentAward.id}`, {
          userId,
          title,
          description,
          selectedDate
        });
      } catch (error) {
        alert(`An error occurred while updating the award: ${error.message}`);
      }

    const res = await Api.get("awardlist", userId);
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br></br>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>* 수상내역</Form.Label>
        <Form.Control
          type="text"
          placeholder="입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Label>상세내역</Form.Label>
        <Form.Control
          type="text"
          placeholder="위에서 적지 못한 수상내역에 관한 사항을 적어주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDate" className="mt-3">
        <Form.Label>* 수상년월</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy.MM.dd"
          placeholderText="YYYY.MM.DD"
        />
      </Form.Group>
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

export default AwardEditForm;
