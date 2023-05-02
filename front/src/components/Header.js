import React, { useContext,useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserStateContext, DispatchContext } from "../App";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  
  const isLogin = !!userState.user;
  const [showGreeting, setShowGreeting] = useState(true);
  const greeting = isLogin && showGreeting ? " " : '안녕하세요, 포트폴리오 공유 서비스입니다.';
  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (

    <Nav activeKey={location.pathname} className="justify-content-center">
      {/* <Nav.Item className="me-auto mb-5" style={{ height: "10px" }}>
        <Nav.Link disabled>{greeting}</Nav.Link>
      </Nav.Item> */}
    {isLogin &&(
      <NavDropdown title="Menu" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1" onClick={() => {
          setShowGreeting(true);
          navigate("/");}}>나의 페이지</NavDropdown.Item>


        <NavDropdown.Item eventKey="4.2"onClick={() => {
              setShowGreeting(true);
              navigate("/network");
              }}>네트워크</NavDropdown.Item>
      
        <NavDropdown.Item eventKey="4.4" onClick={logout}>로그아웃</NavDropdown.Item>
      </NavDropdown>
      )}
    </Nav>

    
  );
}

export default Header;
