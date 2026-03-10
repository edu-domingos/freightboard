import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        { <Route path="/cadastro" element={<Cadastro/>} /> }
        { <Route path="/home" element={<Home/>} /> }
      </Routes>
    </BrowserRouter>
  );
}

export default App;