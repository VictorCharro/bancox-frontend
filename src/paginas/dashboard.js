import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import BarraLateral from "./barraLateral";

function Dashboard() {
  const navigate = useNavigate();
  const [conta, setConta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

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
      <BarraLateral />
      <div className="dashboard-container">
        <p className="bem-vindo">Bem-vindo, {conta.nome}!</p>
        <p className="saldo">
          Saldo: R${" "}
          {Number(conta.saldo || 0).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="conta">Conta: {conta.numeroDaConta}</p>
      </div>
    </>
  );
}

export default Dashboard;
