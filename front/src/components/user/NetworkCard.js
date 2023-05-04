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
                      alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
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
                      }}
                    >
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
