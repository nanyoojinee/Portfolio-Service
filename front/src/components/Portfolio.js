import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { setPageColor } from "./user/SetPageColor";
import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import Educations from "./education/Educations";
import Certificates from "./certificate/Certificates";
import "./portfolio.css";
import Header from "./Header";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // 해당 유저의 pagebackgroundcolor로 배경색 설정
    setPageColor(ownerData.pageBackgroundColor);
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    const ownerId = params.userId || userState.user.id;
    fetchPorfolioOwner(ownerId);
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  const portfolioInfoProps = {
    portfolioOwnerId: portfolioOwner.id,
    isEditable: portfolioOwner.id === userState.user?.id,
  };

  return (
    <>
      <div
        className="header"
        style={{
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        <div
          className="header__menu"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <span
            aria-label="red circle icon"
            className="header__menu-icon header__menu-icon--red"
          ></span>
          <span
            aria-label="yellow circle icon"
            className="header__menu-icon header__menu-icon--yellow"
          ></span>
          <span
            aria-label="green circle icon"
            className="header__menu-icon header__menu-icon--green"
          ></span>
          <div className="header__menu-bar" />
          <span style={{ float: "right" }}>
            <Header />
          </span>
        </div>
      </div>
      <Container
        className="page-content"
        fluid
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        <Col className="sidebar" style={{ flex: "0 0 20%" }}>
          <User {...portfolioInfoProps} />
        </Col>
        <Col
          className="main-content"
          style={{
            flex: "1 80%",
            minWidth: "300px",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          <Educations {...portfolioInfoProps} />
          <br />
          <Awards {...portfolioInfoProps} />
          <br />
          <Projects {...portfolioInfoProps} />
          <br />
          <Certificates {...portfolioInfoProps} />
          <br />
        </Col>
      </Container>
    </>
  );
}

export default Portfolio;
