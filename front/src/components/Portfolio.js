import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, ToggleButton } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import Educations from "./education/Educations";
import Certificates from "./certificate/Certificates";

function Portfolio({user,setUser}) {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  // const [value, setValue] = useState(1);
  // const [pageBackgroundColor, setPageBackgroundColor] = useState("white");
  // console.log(user)
  // const handleClick = async (color) => {
  //   setPageBackgroundColor(color);

  //   const res = await Api.put(`users/${user.id}`, {
  //     pageBackgroundColor: color,
  //   });
  //   const updatedUser = res.data;
    
  //   setUser(updatedUser);
  // };
  // const handleClick = async (color) => {
  //   setPageBackgroundColor(color);
  
  //   try {
  //     const res = await Api.put(`users/${user.id}`, {
  //       pageBackgroundColor: color,
  //     });
  //     const updatedUser = res.data;
  //     setUser(updatedUser);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
   
  

  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
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

    // if (params.userId) {
    //   // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
    //   const ownerId = params.userId;
    //   // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
    //   fetchPorfolioOwner(ownerId);
    // } else {
    //   // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
    //   const ownerId = userState.user.id;
    //   // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
    //   fetchPorfolioOwner(ownerId);
    // }

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
    <Container fluid style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",  marginTop: "50px" }}>

    <Col style={{ flex: "0 0 25%" }}>
      <User {...portfolioInfoProps} />
      {/* <div style={{ display: "flex", flexDirection: "row" ,  marginTop: 20, marginLeft: 5 }}>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={1} onClick={() => handleClick("#FAD2E1")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#FAD2E1" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={2} onClick={() => handleClick("#E6E6FA")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#E6E6FA" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={3} onClick={() => handleClick("#89CFF0")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#89CFF0" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={4} onClick={() => handleClick("#FFE5B4")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFE5B4" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={5} onClick={() => handleClick("#FFFACD")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFACD" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={6} onClick={() => handleClick("#c7f7c4")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#c7f7c4" }}></div>
        </ToggleButton>
        <ToggleButton style={{ border: "none" }} variant="outline-primary" value={7} onClick={() => handleClick("white")}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "white" }}></div>
        </ToggleButton>
      </div>
      <style>{`body { margin: 0; background-color: ${pageBackgroundColor}; }`}</style> */}
    </Col>

    <Col style={{ flex: "1 75%" }}>
    
        <Col>
          <Educations {...portfolioInfoProps} />
          <br />
          <Awards {...portfolioInfoProps} />
          <br />
          <Projects {...portfolioInfoProps} />
          <br />
          <Certificates {...portfolioInfoProps} />
          <br />
        </Col>
      </Col>
    </Container>
  );
}

export default Portfolio;
