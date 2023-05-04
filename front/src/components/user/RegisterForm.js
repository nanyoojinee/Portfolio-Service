import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { validateEmail } from "./ValidateEmail";
import * as Api from "../../api";
import { setPageColor } from "./SetPageColor";

function RegisterForm() {
  setPageColor();
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  const validatePassword = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/);
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = validatePassword(password);
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      alert("이미 사용중인 이메일입니다.", err);
    }
  };

  return (
  <Container className="d-flex flex-column justify-content-center align-items-center " style={{ padding : "10rem",maxHeight: "100vh"}}>
    <Container  style={{ maxWidth: '550px', width: '100%', padding: '1rem', border: '1.5px solid rgba(128, 128, 128, 0.5)', borderRadius: "10px", backgroundColor:"#F5F5F5"}}>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  문자, 숫자, 기호를 조합하여 8자 이상으로 설정해주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  회원가입
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
    <Container 
    style={{ marginTop: '10px', maxWidth: '550px', width: '100%', padding: '1rem', 
    border: '1.5px solid rgba(128, 128, 128, 0.5)', borderRadius: "10px", backgroundColor:"#F5F5F5"}}>
  <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Form.Text>계정이 있으신가요? </Form.Text>
                <Button  variant="#F5F5F5" onClick={() => navigate("/login")}>
                  로그인
                </Button>
              </Col>
            </Form.Group>
  </Container>
  </Container>
  );
}

export default RegisterForm;
