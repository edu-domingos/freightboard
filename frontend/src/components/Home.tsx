import { useState } from "react";
import "./Home.css";
import logo from '../assets/logo.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="homeContainer">
      
      {/* HEADER */}
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

              <button>👤 Perfil</button>
              <button>⚙ Configurações</button>
              <button>🚪 Sair</button>
            </div>
          )}
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="mainGrid">

        {/* DASHBOARD */}
        <div className="gridBox dashboard">

          <h2>Dashboard</h2>

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

        </div>

        {/* INSERIR DADOS */}
        <div className="gridBox">
          <h2>Adicionar Frete</h2>

          <input placeholder="Origem" />
          <input placeholder="Destino" />
          <input placeholder="Valor" />

          <button className="primaryButton">
            Salvar
          </button>
        </div>

        {/* ÁREA FUTURA */}
        <div className="gridBox">
          <h2>Área futura</h2>
        </div>

        {/* ÁREA FUTURA */}
        <div className="gridBox">
          <h2>Área futura</h2>
        </div>

      </div>
    </div>
  );
}