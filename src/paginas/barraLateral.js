import { useState } from "react"; // 1. Importar useState
import { useNavigate } from "react-router-dom";
import "./barraLateral.css";

function BarraLateral() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleNavegacao = (caminho) => {
    navigate(caminho);
    setMenuAberto(false);
  };

  return (
    <>
      <button 
        className={`botao-menu-mobile ${menuAberto ? "aberto" : ""}`}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        <img src="https://img.icons8.com/?size=100&id=3096&format=png&color=5c294b" alt="Menu" width="30" height="30"/>
      </button>

      <div 
        className={`overlay ${menuAberto ? "ativo" : ""}`} 
        onClick={() => setMenuAberto(false)}
      />

      <div className={`barra-navegacao-lateral ${menuAberto ? "aberta" : ""}`}>
        
        <button className="botao-fechar" onClick={() => setMenuAberto(false)}>
            &times;
        </button>

        <div className="Logo">
          <img
            src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=5c294b"
            alt="Logo"
            className="Logo"
            width="50"
            height="50"
            onClick={() => handleNavegacao("/dashboard")}
          />
        </div>
        
        <ul>
          <li onClick={() => handleNavegacao("/dashboard")}>
            <img
              src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=5c294b"
              alt="icone dashboard"
              width="25"
              height="25"
            />
            Dashboard
          </li>

          <li onClick={() => handleNavegacao("/transferencia")}>
            <img
              src="https://img.icons8.com/?size=100&id=wg9WtIJS8aab&format=png&color=5c294b"
              alt="icone transferir"
              width="25"
              height="25"
            />
            Transferir
          </li>

          <li onClick={() => handleNavegacao("/boleto")}>
            <img
              src="https://img.icons8.com/?size=100&id=ug2XGChtvMcG&format=png&color=5c294b"
              alt="icone boleto"
              width="25"
              height="25"
            />
            Pagar Boleto
          </li>

          <li onClick={() => handleNavegacao("/extrato")}>
            <img
              src="https://img.icons8.com/?size=100&id=zIkQ49tnUc0z&format=png&color=5c294b"
              alt="icone extrato"
              width="25"
              height="25"
            />
            Extrato
          </li>

          <li onClick={() => handleNavegacao("/configuracoes")}>
            <img
              src="https://img.icons8.com/?size=100&id=ybfklM8wYSX1&format=png&color=5c294b"
              alt="icone config"
              width="25"
              height="25"
            />
            Configurações
          </li>
        </ul>
      </div>
    </>
  );
}

export default BarraLateral;