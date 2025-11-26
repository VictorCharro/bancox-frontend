import React, { useState } from "react";
import axios from "axios";
import "./criarConta.css";
import Navbar from "./navbar";

function CriarConta() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    senha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/conta", formData);
      alert("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro detalhado:", error);
      const mensagemErro =
        error.response?.data?.message ||
        "Erro de conexão ou CORS. O backend está rodando?";

      alert(mensagemErro);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="criar-conta-container">
        <h2>Criar Nova Conta</h2>
        <div className="info-criar-conta">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome do Titular:</label>
              <input
                type="text"
                name="nomeDoTitular"
                value={formData.nomeDoTitular}
                placeholder="ex: João da Silva"
                title="Digite seu nome completo"
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
                title="A senha deve ter 4 dígitos númericos"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Digite 4 números"
                required
              />
            </div>
            <button type="submit">Criar Conta</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CriarConta;
