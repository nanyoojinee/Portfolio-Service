import React, { useState } from "react";
import { Button, Form, Card, Col, Row, ToggleButton } from "react-bootstrap";
import * as Api from "../../api";
import { setPageColor } from "./SetPageColor";

function UserEditForm({ user, setIsEditing, setUser }) {
  // 받아온 user의 pagebackgroundcolor로 배경색 설정
  setPageColor(user.pageBackgroundColor);
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [profileImage, setProfileImage] = useState(user.profileImage);

  const [pageBackgroundColor, setPageBackgroundColor] = useState(
    user.pageBackgroundColor
  );

  const handleClick = async (color) => {
    setPageBackgroundColor(color);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      profileImage,
      pageBackgroundColor,
    });
    const updatedUser = res.data;
    setUser(updatedUser);

    // 배경색상값 업데이트
    setPageColor(updatedUser.pageBackgroundColor);
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditProfileImage">
            <Form.Control
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                marginLeft: 5,
              }}
            >
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={1}
                onClick={() => handleClick("#FAD2E1")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#FAD2E1",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={2}
                onClick={() => handleClick("#E6E6FA")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#E6E6FA",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={3}
                onClick={() => handleClick("#89CFF0")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#89CFF0",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={4}
                onClick={() => handleClick("#FFE5B4")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#FFE5B4",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={5}
                onClick={() => handleClick("#FFFACD")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#FFFACD",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={6}
                onClick={() => handleClick("#c7f7c4")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#c7f7c4",
                  }}
                ></div>
              </ToggleButton>
              <ToggleButton
                style={{ border: "none" }}
                variant="outline-primary"
                value={7}
                onClick={() => handleClick("white")}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                ></div>
              </ToggleButton>
            </div>
          </Form.Group>
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
