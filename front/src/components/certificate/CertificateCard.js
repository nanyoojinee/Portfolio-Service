import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function CertificateCard({ certificate, isEditable, setIsEditing,setCertificates }) {
  
  const handleDelete = async () => {
    await Api.delete("certificates", certificate.id).then(() => {
    setCertificates((prevCertificates) => prevCertificates.filter((a) => a.id !== certificate.id));
    });
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
      <Col xs={12} md={10} className="justify-content-center">
          <span>{certificate.certificateName}</span>
          <br />
          <span className="text-muted">{certificate.certificateDetail}</span>
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

export default CertificateCard;
