import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // pode criar depois um Cadastro.css

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);

    alert("Usuário cadastrado com sucesso!");

    // Após cadastrar, volta para login
    navigate("/");
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
            Voltar para Login
          </button>
        </form>
      </div>
    </div>
  );
}