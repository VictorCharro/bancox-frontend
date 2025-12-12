import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarraLateral from "./barraLateral";
import "./configuracoes.css";

function Configuracoes() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
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
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/login");
        return;
      }

      await axios.put(
        `http://localhost:8080/conta/configuracoes/${usuarioId}`,
        {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Configurações atualizadas com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao atualizar configurações ", error);
    }
  };

  return (
    <>
      <BarraLateral />
      <div className="container-configuracoes">
        <h2>Configurações da Conta</h2>

        <form onSubmit={handleSubmit} className="form-configuracoes">
          <div className="config-input">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="config-input">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="config-input">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="botao-submit">
            Salvar Alterações
          </button>
        </form>
      </div>
    </>
  );
}

export default Configuracoes;
