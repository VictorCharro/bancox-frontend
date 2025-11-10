import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CriarConta from "./paginas/criarConta";
import Login from "./paginas/login";
import "./App.css";
import Navbar from "./paginas/navbar";

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
      </Routes>
    </Router>
  );
}

export default App;
