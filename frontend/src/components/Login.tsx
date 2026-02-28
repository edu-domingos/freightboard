import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    alert(`Email: ${email}`);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>FreightDashboard</h2>

        <form onSubmit={handleLogin}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>

         
        </form>
         <button type="button"onClick={() => navigate("/cadastro")}
          >
            Cadastrar
          </button> 
      </div>
    </div>
  );
}