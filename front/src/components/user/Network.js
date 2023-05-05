import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { setPageColor } from "./SetPageColor";
import * as Api from "../../api";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserStateContext, DispatchContext } from "../../App";
import "../Network.css";
import NetworkCard from "./NetworkCard";

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

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setPerPage(event.target.value);
    setPage(1);
  };


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

  return (
    <div>
      <div>
        <Nav
          activeKey={location.pathname}
          className="justify-content-end">
          <h1 style={{ display: "grid", fontSize: "2rem" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/768/768464.png?w=740&t=st=1683117616~exp=1683118216~hmac=1efef7fc266c902b5fedae87213037a482f8adfed985e8114442c3854884bb8e"
                alt="우주아이콘"
                width="30"
                height="30"
              ></img>
              
          </h1>
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

        <div className="d-flex justify-content-end my-3">
        <label htmlFor="perPage" className="me-2">
          페이지 당 유저 수:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className = "pagination-box">
          <button
            type="button"
            className="mx-2"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          {page} / {totalPage}
          <button
            type="button"
            className="mx-2"
            onClick={handleNextPage}
            disabled={page === totalPage}
          >
            Next
          </button>
        </div>
      </div>

      </div>
    </div>
  );
}

export default Network;
