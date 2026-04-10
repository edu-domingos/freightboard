import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/pages/Login";
import Cadastro from "./components/pages/Cadastro";
import Home from "./components/pages/Home";
import Configuracoes from "./components/pages/Configuracoes";
import Perfil from "./components/pages/Perfil";
import SuperAdmin from "./sup/SuperAdmin/SuperAdmin";

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
