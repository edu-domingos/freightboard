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

         {/* Cadastro de Motoristas */}
        <div className="gridBox">
          <h2>Cadastro de Motoristas</h2>
          <input type="text" placeholder="Nome Completo"/>
          <input type="text" placeholder="CPF"/>
          <input type="text" placeholder="Endereço"/>
          <input type="text" placeholder="Telefone"/>
          <input type="text" placeholder="Veiculo de trabalho"/>
          <button className="thirdbutton">Cadastrar</button>




        </div>

         {/* Adicionar Fretes */}
        <div className="gridBox">
          <h2>Adicionar Frete</h2>

          <input placeholder="Origem" />
          <input placeholder="Destino" />
          <input placeholder="Distancia" />
          <input placeholder="Pedagio" />
          <input placeholder="Abastecimento" />
          <input placeholder="Valor" />

          <button className="primaryButton">
            Salvar
          </button>
        </div>

        

         {/* Cadastro de Clientes */}
        <div className="gridBox">
          <h2>Cadastro de Clientes</h2>
          <input type="text" placeholder="Nome"/>
          <input type="text" placeholder="CNPJ/CPF"/>
          <input type="text" placeholder="Endereço"/>
          <input type="text" placeholder="UF"/>
          <input type="text" placeholder="Cidade"/>
          <input type="text" placeholder="Telefone"/>
          
         <button className="secondbutton">Cadastrar</button>
        </div>
        
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
           <button className="secondbutton">Verificar</button>
        </div>

      </div>
    </div>
  );
}