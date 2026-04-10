import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("Bruno");
  const [email, setEmail] = useState("bruno@email.com");
  const [telefone, setTelefone] = useState("");

  function handleSalvar() {
    console.log({ nome, email, telefone });
    alert("Dados atualizados com sucesso!");
  }

  return (
    <div className="perfilContainer">

      {/* HEADER */}
      <header className="perfilHeader">
        <button onClick={() => navigate("/home")}>
          ⬅ Voltar
        </button>

        <h1>Meu Perfil</h1>
      </header>

      <div className="perfilContent">

        {/* FOTO */}
        <div className="perfilFotoBox">
          <img
            src="https://via.placeholder.com/120"
            alt="Foto do usuário"
          />
          <button>Alterar Foto</button>
        </div>

        {/* DADOS */}
        <div className="perfilBox">
          <h2>Dados Pessoais</h2>

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <button onClick={handleSalvar}>
            Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
}