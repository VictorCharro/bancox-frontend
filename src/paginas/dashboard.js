import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "./navbar";
import Transferencia from "./transferencia";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [conta, setConta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const irPara = (caminho) => {
    navigate(caminho);
  };

  useEffect(() => {
    buscarDadosConta();
  }, []);

  const buscarDadosConta = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      const response = await axios.get(
        `http://localhost:8080/conta/${usuarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConta(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar conta:", error);
      setLoading(false);
      if (error.response && error.response.status === 403) {
        navigate("/login");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  if (erro) return <p>{erro}</p>;

  if (!conta) return <p>Conta não encontrada</p>;

  return (
    <>
      <Navbar />
      <div className="barra-navegacao-lateral">
        <ul>
          <li
            onClick={() => irPara("/dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=5c294b"
              alt="icone dashboard"
              style={{ width: "25px", height: "25px" }}
            />
            Dashboard
          </li>

          <li
            onClick={() => irPara("/transferencia")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=wg9WtIJS8aab&format=png&color=5c294b"
              alt="icone dashboard"
              style={{ width: "25px", height: "25px" }}
            />
            Transferir
          </li>

          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=ug2XGChtvMcG&format=png&color=5c294b"
              alt="icone dashboard"
              style={{ width: "25px", height: "25px" }}
            />
            Pagar Boleto
          </li>

          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=zIkQ49tnUc0z&format=png&color=5c294b"
              alt="icone dashboard"
              style={{ width: "25px", height: "25px" }}
            />
            Extrato
          </li>

          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=ybfklM8wYSX1&format=png&color=5c294b"
              alt="icone dashboard"
              style={{ width: "25px", height: "25px" }}
            />
            Configurações
          </li>
        </ul>
      </div>
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Bem-vindo, {conta.nome}!</p>
        <p>
          Saldo: R${" "}
          {Number(conta.saldo || 0).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Conta: {conta.numeroDaConta}</p>
      </div>
    </>
  );
}

export default Dashboard;
