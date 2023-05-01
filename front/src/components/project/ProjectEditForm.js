import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
    const [projectName, setProjectName] = useState(currentProject.projectName);
    const [projectDetail, setProjectDetail] = useState(currentProject.projectDetail);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
    
      const userId = currentProject.userId;
    
      try {
        await Api.put(`projects/${currentProject.id}`, {
          userId,
          projectName,
          projectDetail,
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
        <Form.Group controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="프로젝트내역"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicDescription" className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={projectDetail}
            onChange={(e) => setProjectDetail(e.target.value)}
          />
        </Form.Group>
  
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
  
  export default ProjectEditForm;
  