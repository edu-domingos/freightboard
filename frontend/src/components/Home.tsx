import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="homeContainer">
      <header className="homeHeader">

       
        <div className="menuArea">
          <button
            className="menuButton"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="menuDropdown">
              <p className="userName">Olá, Bruno</p>

              <button>Perfil</button>
              <button>Configurações</button>
              <button>Sair</button>
            </div>
          )}
        </div>

      </header>

      <div className="cardsContainer">
        <div className="card">
          <h3>Total de Fretes</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Em Andamento</h3>
          <p>45</p>
        </div>

        <div className="card">
          <h3>Entregues</h3>
          <p>60</p>
        </div>

        <div className="card">
          <h3>Cancelados</h3>
          <p>15</p>
        </div>
      </div>

      <div className="recentSection">
        <h2>Fretes Recentes</h2>
        <ul>
          <li>São Paulo → Rio de Janeiro</li>
          <li>Campinas → Belo Horizonte</li>
          <li>Curitiba → Porto Alegre</li>
        </ul>
      </div>
    </div>
  );
}