import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import "./transferencia.css"; // Importando o CSS novo

function Transferencia() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpfDestino: "",
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
        `http://localhost:8080/conta/transferir/${usuarioId}`,
        {
          cpfDestino: formData.cpfDestino,
          valor: Number(formData.valor),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transferência realizada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro na transferência:", error);
      const mensagem = error.response?.data || "Erro ao realizar transferência.";
      alert(mensagem);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-transferencia">
        <h2>Realizar Transferência</h2>
        
        <form onSubmit={handleSubmit} className="form-transferencia">
          <div className="grupo-input">
            <label>CPF do Destinatário:</label>
            <input
              type="text"
              name="cpfDestino"
              value={formData.cpfDestino}
              onChange={handleChange}
              maxLength={11}
              placeholder="Digite apenas números"
              required
            />
          </div>

          <div className="grupo-input">
            <label>Valor (R$):</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="R$ 0,00"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <button type="submit" className="btn-transferir">
            Confirmar Transferência
          </button>
        </form>

        <button 
          className="btn-voltar"
          onClick={() => navigate("/dashboard")}
        >
          Cancelar / Voltar
        </button>
      </div>
    </>
  );
}

export default Transferencia;