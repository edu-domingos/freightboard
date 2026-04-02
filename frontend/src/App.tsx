import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import Configuracoes from "./components/Configuracoes";
import Perfil from "./components/Perfil";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        {<Route path="/cadastro" element={<Cadastro />} />}
        {<Route path="/home" element={<Home />} />}
        {<Route path="/configuracoes" element={<Configuracoes />} />}
        {<Route path="/perfil" element={<Perfil />} />}
        {<Route path="/superadmin" element={<SuperAdmin />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
