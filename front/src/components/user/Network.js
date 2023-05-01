import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { setPageColor } from "./SetPageColor";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";


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

  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    setPage(1);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-end my-3">
        <label htmlFor="perPage" className="me-2">
          페이지 당 유저 수:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <Row xs="auto" className="justify-content-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          이전 페이지
        </button>
        {page} / {totalPage} 페이지
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={handleNextPage}
          disabled={page === totalPage}
        >
          다음 페이지
        </button>
      </div>
    </Container>
  );
}



export default Network;
