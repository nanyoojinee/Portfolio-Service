import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { setPageColor } from "./SetPageColor";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import "../Network.css";
import Header from "../Header";
import SelectBox from "./SelectBox";
import NetworkCard from "./NetworkCard";

function Network() {
  setPageColor();
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [users, setUsers] = useState([]);

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

  // const handlePerPageChange = (event) => {
  //   const newPerPage = Number(event.target.value);
  //   setPerPage(newPerPage);
  //   setPage(1);
  // };

  const handlePerPageChange = (value) => {
    setPerPage(value);
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <span style={{ float: "right" }}></span>
        <Row
          xs="auto"
          className="networkcard-form">
          {users.map((user) => (
            <NetworkCard
              key={user.id}
              user={user}
              isNetwork
            />
          ))}
        </Row>
        <div>
          <SelectBox
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
          />
        </div>
        <div className="justify-content-center mt-4">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={page === 1}>
            이전 페이지
          </button>
          <div class="pagetext">
            {page} / {totalPage}
          </div>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={page === totalPage}>
            다음 페이지
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Network;
