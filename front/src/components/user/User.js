import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

  useEffect(async () => {
    try {
      const res = await Api.get("users", portfolioOwnerId);
      setUser(res.data);
    } catch (error) {
      // handle error here
      console.error(error);
    }
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default User;
