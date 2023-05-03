import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;
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
    {isLogin &&(
      <NavDropdown title={<span className="navbar-toggler-icon text-white" style={{ fontSize: "30px" }}>☰</span>}>
        <NavDropdown.Item eventKey="4.1" onClick={() => {
          navigate("/");}}>나의 페이지</NavDropdown.Item>

          <NavDropdown.Item
            eventKey="4.2"
            onClick={() => {
              navigate("/network");
            }}
          >
            네트워크
          </NavDropdown.Item>

          <NavDropdown.Item eventKey="4.4" onClick={logout}>
            로그아웃
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Nav>
  );
}

export default Header;