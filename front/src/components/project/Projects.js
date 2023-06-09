import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";


function Projects({ portfolioOwnerId, isEditable, setIsEditing }){
    
    const [projects, setProjects] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card>
        <Card.Body>
          <Card.Title>프로젝트 이력</Card.Title>
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              setProjects={setProjects}
              setIsEditing={setIsEditing}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <ProjectAddForm
              portfolioOwnerId={portfolioOwnerId}
              setProjects={setProjects}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    );
  }
  
  export default Projects;