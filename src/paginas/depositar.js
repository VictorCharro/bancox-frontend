import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarraLateral from "./barraLateral";
import "./depositar.css";

function Depositar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    valor: "",
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
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:8080/conta/depositar/${usuarioId}`,
        {
          valor: Number(formData.valor),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Depósito realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      alert("Erro no depósito ", error);
    }
  };

  return (
    <>
      <BarraLateral />
      <div className="container-depositar">
        <h2>Realizar Depósito</h2>

        <form onSubmit={handleSubmit} className="form-depositar">
          <div className="grupo-input">
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="botao-depositar">
            Depositar
          </button>
        </form>
      </div>
    </>
  );
}

export default Depositar;
