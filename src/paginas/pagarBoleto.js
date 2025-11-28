import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarraLateral from "./barraLateral";
import "./pagarBoleto.css";

function PagarBoleto() {
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
        `http://localhost:8080/conta/pagar-boleto/${usuarioId}`,
        {
          valor: Number(formData.valor),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pagamento realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      alert("Erro no pagamento:", error);
    }
  };

  return (
    <>
      <BarraLateral />
      <div className="pagar-boleto-container">
        <h2>Pagar Boleto</h2>
        <form onSubmit={handleSubmit} className="form-pagar-boleto">
          <div className="input-codigo">
            <label>Código de Barras: </label>
            <input
              type="number"
              name="codigoDeBarras"
              maxLength={48}
              placeholder="Digite apenas números"
              required
            ></input>
          </div>
          <div className="valor-boleto">
            <label>Valor: </label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              maxLength={10}
              placeholder="Digite apenas números"
              required
            ></input>
          </div>
          <button type="submit" className="botao-pagamento">
            Efetuar Pagamento
          </button>
        </form>
        <button className="botao-voltar" onClick={() => navigate("/dashboard")}>
          Cancelar / Voltar
        </button>
      </div>
    </>
  );
}

export default PagarBoleto;
