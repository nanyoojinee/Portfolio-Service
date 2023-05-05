import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { setPageColor } from "./SetPageColor";
import * as Api from "../../api";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserStateContext, DispatchContext } from "../../App";
import "../Network.css";
import SelectBox from "./SelectBox";
import NetworkCard from "./NetworkCard";
import Pagination from "react-js-pagination";

function Network() {
  setPageColor();
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPage, setTotalPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [displayType, setDisplayType] = useState('typeOne');

  const location = useLocation();
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

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }

    Api.get(`userlist?page=${page}&perPage=${perPage}`).then((res) => {
      setUsers(res.data.posts);
      setTotalPage(res.data.totalPage);
    });
  }, [userState.user, navigate, page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400) {
        setDisplayType('typeOne');
      } else if (window.innerWidth > 890 && window.innerWidth < 1400) {
        setDisplayType('typeTwo');
      } else {
        setDisplayType('typeThree')
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const gridTemplateColumns = {
  typeOne: "1fr 1fr 1fr",
  typeTwo: "1fr 1fr",
  typeThree: "1fr"
}[displayType];

  const handlePerPageChange = (value) => {
    setPerPage(value);
  };

  return (
    <div>
      <div>
        <Nav
          activeKey={location.pathname}
          className="justify-content-end">
          {isLogin && (
            <NavDropdown
              title={
                <span
                  className="navbar-toggler-icon"
                  style={{
                    marginRight: "15px",
                    marginBottom: "3px",
                    color: "#8770d1",
                  }}>
                  Menu
                </span>
              }>
              <NavDropdown.Item
                eventKey="4.1"
                onClick={() => {
                  navigate("/");
                }}>
                나의 페이지
              </NavDropdown.Item>

              <NavDropdown.Item
                eventKey="4.2"
                onClick={() => {
                  navigate("/network");
                }}>
                네트워크
              </NavDropdown.Item>

              <NavDropdown.Item
                eventKey="4.4"
                onClick={logout}>
                로그아웃
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
          <div className="network-cardcontainer">
            <Card.Body
              className="network-cardbody"
              style={{
                display: "grid",
                gridTemplateColumns,
                placeItems: "center",
              }}>
              {users.map((user) => (
                <NetworkCard
                  key={user.id}
                  user={user}
                  isNetwork
                />
              ))}
            </Card.Body>
          </div>
        <div>
          <SelectBox
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
          />
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={perPage}
          totalItemsCount={totalPage * perPage}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Network;
