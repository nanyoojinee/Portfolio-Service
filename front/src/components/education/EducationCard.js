import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
  const handleDelete = async () => {
    await Api.delete("educations", education.id).then(() => {
      setEducations((prevEducations) =>
        prevEducations.filter((a) => a.id !== education.id)
      );
    });
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
      <Col xs={12} md={10} className="justify-content-center">
          <span>{education.school}</span>
          <br />
          <span className="text-muted">
            {education.major} ({education.graduationStatus})
          </span>
        </Col>
        {isEditable && (
            <>
              <Col xs={6} md={1} className="d-flex justify-content-end">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                   className="mr-3"
                >
                  편집
                </Button>
                </Col>
                    <Col xs={6} md={1}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleDelete}
                      >
                        삭제
                      </Button>
                    </Col>
                  </>
          )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
