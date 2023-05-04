import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectDetail, setProjectDetail] = useState(currentProject.projectDetail);
    const [startDate,setStartDate] = useState(new Date(currentProject.startDate))
    const [endDate,setEndDate] = useState(new Date(currentProject.endDate))

    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!projectName || !startDate || !endDate) {
        return alert("프로젝트 내역, 제작년월은 필수 입력 값입니다.");
      }
      const userId = currentProject.userId;
    
      try {
        await Api.put(`projects/${currentProject.id}`, {
          userId,
          projectName,
          projectDetail,
          startDate,
          endDate
        });
      } catch (error) {
        alert(`An error occurred while updating the project: ${error.message}`);
      }

        const res = await Api.get("projectlist", userId);
        setProjects(res.data);
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
          <br></br>
          <Form.Label>* 프로젝트내역</Form.Label>
          <Form.Group controlId="formBasicTitle">
            <Form.Control
              type="text"
              placeholder="입력"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Form.Group>
    
          <Form.Group controlId="formBasicDescription" className="mt-3">
            <Form.Label>상세 업무 및 성과</Form.Label>
            <Form.Control
              type="text"
              placeholder="위에서 적지 못한 프로젝트내역에 관한 사항을 적어주세요."
              value={projectDetail}
              onChange={(e) => setProjectDetail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate" className="mt-4">
            <Form.Label>제작년월</Form.Label>
            <Row>
              <Col sm={3} className="mt-2">  
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy.MM"
                  showMonthYearPicker
                  placeholderText="시작 날짜"
                />
              </Col>
              <Col xs="auto" className="px-0">
                <span className="mx-2" style={{fontSize: "2rem"}}>~</span>
              </Col>
              <Col sm={1} className="mt-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy.MM"
                  showMonthYearPicker
                  placeholderText="끝 날짜"
                />
              </Col>
            </Row>
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
  
  export default ProjectEditForm;
  