import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing }) {
  const handleDelete = async () => {
    try {
      await Api.delete("educations", education.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">
            {education.major} ({education.graduationStatus})
          </span>
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

export default EducationCard;
