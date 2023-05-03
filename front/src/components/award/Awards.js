import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable, setIsEditing }) {
  
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: '90%', margin: '0 auto' }}>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.id}
            award={award}
            setAwards={setAwards}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
        ))}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
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

export default Awards;
