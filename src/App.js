import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CriarConta from "./paginas/criarConta";
import Login from "./paginas/login";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  const handleCriarConta = () => {
    navigate("/criar-conta");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="App">
        <h1>BancoX</h1>
      </div>
      <div className="Botao-criar-conta">
        <button onClick={handleCriarConta}>Criar Conta</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
