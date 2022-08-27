import React from "react";

import "./styles/PerfilAvatarComponent.scss";

export function PerfilAvatarComponent({
  reviewrProfilePictureUrl,
}: {
  reviewrProfilePictureUrl: string;
}) {
  return (
    <div className="perfilAvatarComponent">
      <img
        className="perfilAvatarComponent__Image"
        referrerPolicy="no-referrer"
        src={reviewrProfilePictureUrl}
      />
    </div>
  );
}
