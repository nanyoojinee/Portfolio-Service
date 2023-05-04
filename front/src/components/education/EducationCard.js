import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
  // UTC+0 시간에서 UTC+9 시간으로 변환
  const entranceDate = new Date(education.entranceDate);
  const graduationDate = new Date(education.graduationDate);
  entranceDate.setUTCHours(entranceDate.getUTCHours() + 9);
  graduationDate.setUTCHours(graduationDate.getUTCHours() + 9);
  // YYYY-MM-DD 형식으로 출력
  const formattedEntranceDate = entranceDate.toLocaleDateString("ko-KR", {year: 'numeric', month: '2-digit'});
  const formattedGraduationDate = graduationDate.toLocaleDateString("ko-KR", {year: 'numeric', month: '2-digit'});
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
        <Col
          xs={12}
          md={10}
          className="justify-content-center">
          <span>{education.school}</span>
          <br />
          <span className="text-muted">
            {education.major} ({education.graduationStatus})
          </span>
          <br />
          <span>
            {formattedEntranceDate}~{formattedGraduationDate}
          </span>
          <br />
          <span>
          {(education.score === "0") || (education.scoremax === "0") ? "" : `${education.score} / ${education.scoremax}`}
          </span>
        </Col>
        {isEditable && (
          <>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-end">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3">
                편집
              </Button>
            </Col>
            <Col
              xs={6}
              md={1}>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}>
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
