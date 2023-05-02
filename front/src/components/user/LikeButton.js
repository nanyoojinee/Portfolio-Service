import React, { useState } from "react";
import * as Api from "../../api";
import styled from "styled-components";
import HeartImg from "../../img/heart.png";

const Heart = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

function LikeButton({ user }) {
  const [like, setLike] = useState(user?.socialLikes);

  const handleLikeButton = async () => {
    try {
      // put 요청으로 사용자 정보 업데이트
      const res = await Api.put(`users/${user.id}`, {
        socialLikes: like + 1, // socialLikes 값 1 증가시키기
      });

      // 업데이트된 사용자 정보로 like 값 업데이트
      const updatedUser = res.data;
      setLike(updatedUser.socialLikes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heart src={HeartImg} onClick={handleLikeButton} />
      {like}
    </>
  );
}

export default LikeButton;
