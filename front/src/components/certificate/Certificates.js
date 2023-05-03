import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable, setIsEditing }) {
  
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: '100%', margin: '0 auto' }}>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button style={{backgroundColor: "#8a8a8a", color: "#ffffff", border: "none"}}onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
