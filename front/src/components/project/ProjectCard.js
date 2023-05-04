import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  // UTC+0 시간에서 UTC+9 시간으로 변환
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  startDate.setUTCHours(startDate.getUTCHours() + 9);
  endDate.setUTCHours(endDate.getUTCHours() + 9);
  // YYYY-MM-DD 형식으로 출력
  const formattedStartDate = startDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
  });
  const formattedEndDate = endDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
  });
  const handleDelete = async () => {
    await Api.delete("projects", project.id).then(() => {
      setProjects((prevProjects) =>
        prevProjects.filter((a) => a.id !== project.id)
      );
    });
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <br />
        <Col xs={12} md={10} className="justify-content-center">
          <span style={{ fontSize: "1.3em", color: "#000000" }}>
            {project.projectName}
          </span>
          <br />
          <span className="text-muted">
            {formattedStartDate}~{formattedEndDate}
          </span>
          <br />
          {project.projectDetail && (
            <span style={{ fontSize: "1.1em", color: "#4c4c4c" }}>
              {project.projectDetail}
            </span>
          )}
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
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                삭제
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
