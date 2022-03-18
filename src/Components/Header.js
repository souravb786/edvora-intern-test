import React, { useEffect } from "react";
import useAuth from "../hook/useAuth";
import "../Styles/Header.css";
function Header() {
  const { auth, setAuth } = useAuth();

  // fetching the user details and updating the global user state
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://assessment.api.vweb.app/user");
      setAuth(await res.json());
    };
    getData();
  }, []);
  return (
    <div className="Header">
      <h1 className="logo">Edvora</h1>
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          width: "20%",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
            marginRight: 20,
            fontFamily: "Inter",
          }}
        >
          {auth.name}
        </span>
        <img
          src={auth.url}
          alt="user_image"
          style={{ width: 44, borderRadius: 100 }}
        />
      </div>
    </div>
  );
}

export default Header;
