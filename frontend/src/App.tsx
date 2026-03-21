import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import Configuracoes from "./components/Configuracoes";
import Perfil from "./components/Perfil";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        { <Route path="/cadastro" element={<Cadastro/>} /> }
        { <Route path="/home" element={<Home/>} /> }
        { <Route path="/configuracoes" element={<Configuracoes/>} /> }
        { <Route path="/perfil" element={<Perfil/>} /> }
      </Routes>
    </BrowserRouter>
  );
}

export default App;