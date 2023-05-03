import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function AwardCard({ award, isEditable, setIsEditing,setAwards }) {
  
  const handleDelete = async () => {
    await Api.delete("awards", award.id).then(() => {
    setAwards((prevAwards) => prevAwards.filter((a) => a.id !== award.id));
    });
  };

  
  return (
    <Card.Text>
      <Row className="align-items-center">
      <Col xs={12} md={10} className="justify-content-center">
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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

export default AwardCard;
