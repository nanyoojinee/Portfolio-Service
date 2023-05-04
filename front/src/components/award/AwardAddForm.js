import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!title || !selectedDate) {
      return alert("수상내역 및 수상년월은 필수 입력 값입니다.")
    }
    const userId = portfolioOwnerId;

    const response = await Api.post("award/create", {
      userId: portfolioOwnerId,
      title,
      description,
      selectedDate
    });
    // create에 성공했다면
    if(response.status === 200){
      // 추가된 award 객체를 만들고 (response에서 새롭게 생성된 award의 id를 준다고 가정했을 경우)
      const newAward = {title, description, selectedDate, id: response.id};
      // 기존 Awards 배열에 맨 앞에 추가
      setAwards(prev => [newAward , ...prev])
      setIsAdding(false);
    }


    const res = await Api.get("awardlist", userId);
    setAwards(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br></br>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>* 수상내역</Form.Label>
        <Form.Control
          type="text"
          placeholder="수상내역"
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

export default AwardAddForm;
