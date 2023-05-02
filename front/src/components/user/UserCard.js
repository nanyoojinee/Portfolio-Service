import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import axios from "axios";


function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("http://placekitten.com/200/200");
  useEffect(() => {
    if (user?.profileImage?.path) {
/*    Api.get(user?.profileImage.path).then((res) => {
      setImageUrl(URL.createObjectURL(res.data));
    }) */
    axios
      .get(`http://localhost:5001/${user?.profileImage?.path}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
        responseType: "blob", // blob 데이터로 받기 위해 responseType 설정
      })
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data); // Blob 데이터를 가리키는 URL 생성
        setImageUrl(imageUrl);
      })
      .catch((error) => console.error(error));
    }
}, [user?.profileImage?.path]);
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "16rem" }}>
      <Card.Body >
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mx-auto d-block mb-3"
            src= {imageUrl}
            alt= "랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text style={{ fontSize: "14px" }}>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info justify-content-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
