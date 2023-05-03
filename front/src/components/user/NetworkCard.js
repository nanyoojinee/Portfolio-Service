import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import LikeButton from "./LikeButton";
import "../networkCard.css";

function NetworkCard({ user, setIsEditing, isEditable }) {
  const isUser = !!user;
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("http://placekitten.com/200/200");
  useEffect(() => {
    if (user?.profileImage?.path) {
      axios
        .get(`http://localhost:5001/${user?.profileImage?.path}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
          responseType: "blob", // blob 데이터로 받기 위해 responseType 설정
        })
        .then((res) => {
          const imageUrl = URL.createObjectURL(res.data); // Blob 데이터를 가리키는 URL 생성
          setImageUrl(imageUrl);
        })
        .catch((error) => console.error(error));
    }
  }, [user?.profileImage?.path]);

  return (
    // <Card className="mb-2 ms-3 mr-5" style={{ width: "16rem" }}>
    //   <Card.Body>
    //     <Row className="justify-content-md-center">
    //       <Card.Img
    //         style={{ width: "10rem", height: "8rem" }}
    //         className="mx-auto d-block mb-3"
    //         src={imageUrl}
    //         alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
    //       />
    //     </Row>
    //     <Card.Title>{user?.name}</Card.Title>
    //     <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
    //     <Card.Text style={{ fontSize: "14px" }}>{user?.description}</Card.Text>
    //     <Card.Text>{isUser && <LikeButton user={user} />}</Card.Text>
    //     <Card.Link
    //       className="mt-3"
    //       href="#"
    //       onClick={() => {
    //         navigate(`/users/${user.id}`);
    //       }}
    //     >
    //       포트폴리오
    //     </Card.Link>
    //   </Card.Body>
    // </Card>
    <>
        <div className="form">
          <section>
            <div className="swiper mySwiper container">
              <div className="swiper-wrapper content">
                <div id="card">
                  <div className="card-content">
                    <div className="image">
                      <img
                        src={imageUrl}
                        alt="User Image"
                      />
                    </div>

                    <div className="name-profession">
                      <span className="name">{user?.name}</span>
                      <span className="email">{user?.email}</span>
                      <span className="description">{user?.description}</span>
                    </div>

                    <div className="link">
                      <p>{isUser && <LikeButton user={user} />}</p>
                      <button
                        className="button"
                        href="#"
                        onClick={() => {
                          navigate(`/users/${user.id}`);
                        }}>
                        Portfolio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  );
}

export default NetworkCard;
