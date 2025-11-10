import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleCriarConta = () => {
    navigate("/criar-conta");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleInicio = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="Logo">
        <img
          src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=6a0dad"
          alt="Logo"
          className="Logo"
          width="50"
          height="50"
          onClick={handleInicio}
        />
      </div>
      <div className="Botoes-1">
        <button onClick={handleCriarConta}>Quero ser X</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Navbar;
