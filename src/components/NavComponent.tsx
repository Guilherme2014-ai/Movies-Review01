import React, { useState } from "react";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Components
import NotificationIcon from "./icons/NotificationIcon";
import { PerfilAvatarComponent } from "./PerfilAvatarComponent";

// CSS
import "./styles/NavComponent.scss";

export function NavComponent({ reviewAvatar }: { reviewAvatar: string }) {
  const navigate = useNavigate();

  const [userNameField, setUserNameField] = useState("");

  return (
    <nav className="nav">
      <div className="content">
        <Link to="/perfil">
          <PerfilAvatarComponent reviewrProfilePictureUrl={reviewAvatar} />
        </Link>
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
