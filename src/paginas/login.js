import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Navbar from "./navbar";

function Login() {
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/conta/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuarioId", response.data.usuario.id);
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response.data.message || "CPF ou senha incorretos.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <div className="info-login">
          <form onSubmit={handleSubmit}>
            <div>
              <label>CPF:</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                maxLength={11}
                pattern="\d{11}"
                placeholder="ex: 12345678901"
                title="O CPF deve conter exatamente 11 dígitos numéricos."
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                name="senha"
                maxLength={4}
                pattern="\d{4}"
                inputMode="numeric"
                title="A senha deve ter 4 dígitos númericos"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Digite 4 números"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
