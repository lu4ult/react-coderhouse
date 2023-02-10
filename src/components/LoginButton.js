import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { iconoLogin } from "./Iconos";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="loginButtonContainer">
      <button onClick={() => loginWithRedirect()}>
        { iconoLogin}
        Log In</button>
    </div>
  )
};

export default LoginButton;