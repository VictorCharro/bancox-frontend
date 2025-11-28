import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarraLateral from "./barraLateral";
import "./extrato.css";

function Extrato() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarExtrato();
  }, []);

  const buscarExtrato = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/conta/extrato/${usuarioId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setTransacoes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar extrato:", error);
      alert("Erro ao carregar extrato.");
      setLoading(false);
    }
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  const formatarValor = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <BarraLateral />
      <div className="container-extrato">
        <h2>Extrato Bancário</h2>

        <div className="lista-transacoes">
          {loading ? (
            <p>Carregando...</p>
          ) : transacoes.length === 0 ? (
            <p className="sem-transacoes">Nenhuma transação encontrada.</p>
          ) : (
            transacoes.map((item) => (
              <div 
                key={item.id} 
                className={`card-transacao ${item.tipo === "ENTRADA" ? "entrada" : "saida"}`}
              >
                <div className="info-transacao">
                    <span className="data">{formatarData(item.data)}</span>
                    <span className="descricao">
                        {item.tipo === "ENTRADA" ? "Recebido de" : "Enviado para"}: 
                        <strong> {item.nomeOutraParte}</strong>
                    </span>
                </div>
                
                <div className="valor-transacao">
                    {item.tipo === "SAIDA" ? "- " : "+ "}
                    {formatarValor(item.valor)}
                </div>
              </div>
            ))
          )}
        </div>

        <button className="btn-voltar" onClick={() => navigate("/dashboard")}>
          Voltar
        </button>
      </div>
    </>
  );
}

export default Extrato;