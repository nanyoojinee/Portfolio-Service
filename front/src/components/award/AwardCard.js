import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function AwardCard({ award, isEditable, setIsEditing,setAwards }) {
  const handleDelete = async () => {
    await Api.delete("awards", award.id).then(() => {
    setAwards((prevAwards) => prevAwards.filter((a) => a.id !== award.id));
    });
  };
  //예외처리
  // const handleDelete = async () => {
  //   try {
  //     await Api.delete("awards", award.id);
  //     setAwards((prevAwards) => prevAwards.filter((a) => a.id !== award.id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }; 

  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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

export default AwardCard;
