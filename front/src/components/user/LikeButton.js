import React, { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
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
  const userState = useContext(UserStateContext); // 현재 로그인 해있는 사람을 return해주는 userState 정의
  const [isLiked, setIsLiked] = useState(null);
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await Api.get(`users/${user.id}/${userState.user._id}`); //user는 게시글 작성자, userState.user는 로그인해있는 유저
        setLike(res.data[1]);
        setIsLiked(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikeStatus();
  });
  const handleLikeButton = async () => {
    let res;
    try {
      if (isLiked) {
        // 좋아요 취소하기
        res = await Api.put(`users/${user.id}`, {
          user: userState.user._id,
          isLiked: false,
        });
        setIsLiked(false);
      } else {
        // 좋아요 추가하기
        res = await Api.put(`users/${user.id}`, {
          user: userState.user._id,
          isLiked: true,
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
      {isLiked === null ? (
        <div
          style={{
            width: 100,
            height: 24,
          }}
        />
      ) : (
        <>
          <Heart
            src={isLiked ? HeartImg : EmptyHeartImg}
            alt="heart"
            onClick={handleLikeButton}
          />{" "}
          {like}
        </>
      )}
    </>
  );
}

export default LikeButton;
