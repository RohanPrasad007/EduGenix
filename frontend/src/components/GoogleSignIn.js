import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleSignIn = () => {
  const onSuccess = (credentialResponse) => {
    // Send the credential to your backend
    console.log(credentialResponse.credential);
    fetch("http://localhost:5000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.user);
          login(data.user);
        } else {
          console.error("Login failed:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const onError = () => {
    console.error("Login Failed");
  };

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />
      <button onClick={logout}>Sign Out</button>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
