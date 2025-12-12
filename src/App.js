import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import CriarConta from "./paginas/criarConta";
import Login from "./paginas/login";
import "./App.css";
import Navbar from "./paginas/navbar";
import Dashboard from "./paginas/dashboard";
import Transferencia from "./paginas/transferencia";
import Extrato from "./paginas/extrato";
import PagarBoleto from "./paginas/pagarBoleto";
import Depositar from "./paginas/depositar";
import Configuracoes from "./paginas/configuracoes";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <h1>Página em construção</h1>
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
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/transferencia"
          element={
            localStorage.getItem("token") ? (
              <Transferencia />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/boleto" element={<PagarBoleto />} />
        <Route path="/depositar" element={<Depositar />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Router>
  );
}

export default App;
