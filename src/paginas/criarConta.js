import React, { useState } from "react";
import axios from "axios";
import "./criarConta.css";

function CriarConta() {
  const [formData, setFormData] = useState({
    nomeDoTitular: "",
    cpf: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/contas", formData);
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar conta");
      console.error("Erro:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="criar-conta-container">
      <h2>Criar Nova Conta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Titular:</label>
          <input
            type="text"
            name="nomeDoTitular"
            value={formData.nomeDoTitular}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

export default CriarConta;
