import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Configuracoes.css";

export default function Configuracoes() {
  const navigate = useNavigate();
  const [aba, setAba] = useState("perfil");

  return (
    <div className="configContainer">

      {/* HEADER */}
      <header className="configHeader">
        <button onClick={() => navigate("/home")}>
          ⬅ Voltar
        </button>
        <h1>Configurações</h1>
      </header>

      <div className="configLayout">

        {/* SIDEBAR */}
        <aside className="configSidebar">
          <button onClick={() => setAba("perfil")}>
            👤 Perfil
          </button>

          <button onClick={() => setAba("seguranca")}>
            🔒 Segurança
          </button>

          <button onClick={() => setAba("preferencias")}>
            ⚙ Preferências
          </button>
        </aside>

        {/* CONTEÚDO */}
        <main className="configContent">

          {/* PERFIL */}
          {aba === "perfil" && (
            <div className="configBox">
              <h2>Perfil</h2>

              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Telefone" />

              <button>Salvar Alterações</button>
            </div>
          )}

          {/* SEGURANÇA */}
          {aba === "seguranca" && (
            <div className="configBox">
              <h2>Segurança</h2>

              <input type="password" placeholder="Senha atual" />
              <input type="password" placeholder="Nova senha" />
              <input type="password" placeholder="Confirmar nova senha" />

              <button>Atualizar Senha</button>
            </div>
          )}

          {/* PREFERÊNCIAS */}
          {aba === "preferencias" && (
            <div className="configBox">
              <h2>Preferências</h2>

              <label>
                <input type="checkbox" />
                Receber notificações
              </label>

              <label>
                <input type="checkbox" />
                Tema escuro
              </label>

              <button>Salvar Preferências</button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}