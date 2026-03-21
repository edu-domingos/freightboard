import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost/api/users/register", {
       name: nome,
       email: email,
       password: senha
      });

      console.log(response.data);

      //alert("Usuário cadastrado com sucesso!");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastro</h2>

        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}