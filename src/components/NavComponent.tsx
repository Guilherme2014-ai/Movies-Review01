import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import NotificationIcon from "./icons/NotificationIcon";

import "./styles/NavComponent.scss";
import { useNavigate } from "react-router";

export function NavComponent({ reviewAvatar }: { reviewAvatar: string }) {
  const navigate = useNavigate();

  const [userNameField, setUserNameField] = useState("");

  return (
    <nav className="nav">
      <div className="content">
        <Avatar src={reviewAvatar} />
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              navigate(`/users/${userNameField}`);
            }
          }}
          type="text"
          placeholder="Search User"
          onChange={(e) => {
            setUserNameField(e.target.value);
          }}
          value={userNameField}
        />
        <NotificationIcon />
      </div>
      <br />
      <div className="separator"></div>
    </nav>
  );
}
