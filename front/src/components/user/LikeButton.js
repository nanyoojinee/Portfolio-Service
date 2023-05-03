import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import HeartImg from "../../img/heart.png";
import EmptyHeartImg from "../../img/empty-heart.png";

const Heart = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

function LikeButton({ user }) {
  const [like, setLike] = useState(user?.socialLikes);
  const [isLiked, setIsLiked] = useState(
    () => JSON.parse(localStorage.getItem(`user-${user.id}-liked`)) || false
  );

  useEffect(() => {
    localStorage.setItem(`user-${user.id}-liked`, JSON.stringify(isLiked));
  }, [isLiked, user.id]);

  const handleLikeButton = async () => {
    let res;
    try {
      if (isLiked) {
        // 좋아요 취소하기
        res = await Api.put(`users/${user.id}`, {
          socialLikes: like - 1, // socialLikes 값 1 감소시키기
        });
        setIsLiked(false);
      } else {
        // 좋아요 추가하기
        res = await Api.put(`users/${user.id}`, {
          socialLikes: like + 1, // socialLikes 값 1 증가시키기
        });
        setIsLiked(true);
      }
      // 업데이트된 사용자 정보로 like 값 업데이트
      const updatedUser = res.data;
      setLike(updatedUser.socialLikes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heart
        src={isLiked ? HeartImg : EmptyHeartImg}
        alt="heart"
        onClick={handleLikeButton}
      />{" "}
      {like}
    </>
  );
}

export default LikeButton;
