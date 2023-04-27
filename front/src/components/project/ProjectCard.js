import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
    
    const handleDelete = async () => {
        await Api.delete("projects", project.id).then(() => {
            setProjects((prevProjects) => prevProjects.filter((a) => a.id !== project.id));
        });
    };

    return (
        <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{project.projectName}</span>
            <br />
            <span className="text-muted">{project.projectDetail}</span>
          </Col>
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
          )}
          {isEditable && (
            <Col xs lg="1">
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                삭제
              </Button>
            </Col>
            
          )}
        </Row>
      </Card.Text>
    );
  }
  
  export default ProjectCard;
  