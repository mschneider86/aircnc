import React from "react";
import "./App.css";

import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnc" />

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre{" "}
          <strong>talentos</strong> parasua empresa
        </p>

        <form>
          <label htmlFor="email">E-mail *</label>
          <input type="email" id="email" placeholder="Seu melhor e-mail" />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
