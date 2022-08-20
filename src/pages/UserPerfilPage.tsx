import React from "react";
import { NavigateFunction, useNavigate } from "react-router";

// CSS
import "./styles/UserPerfilPage.scss";

export function UserPerfilPage() {
  const navigate = useNavigate();

  return (
    <div className="userperfilpage">
      <div className="userperfilpage__container">
        <aside>
          <ul>
            <li>Teste</li>
            <li>Teste</li>
            <li>Teste</li>
            <br />
            <br />
            <li
              style={{
                color: "red",
              }}
              onClick={() => logout(navigate)}
            >
              Log out
            </li>
          </ul>
        </aside>
        <main>main</main>
      </div>
    </div>
  );
}

function logout(navigate: NavigateFunction) {
  localStorage.removeItem("reviewr_uid");
  localStorage.clear();

  navigate("/login");
}
