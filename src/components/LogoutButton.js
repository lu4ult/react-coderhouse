import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { iconoLogout } from "./Iconos";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="logoutButtonContainer">
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        {iconoLogout}
        Log Out
      </button>
    </div>

  );
};

export default LogoutButton;