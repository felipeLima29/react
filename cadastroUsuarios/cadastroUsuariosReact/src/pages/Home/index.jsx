import React from "react"
import './style.css'
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="container">
            <h1>Seja bem vindo ao Gerenciamento de Usuários</h1>

            <Link to="/insert"><button id="navInsert"> Inserir Usuários </button></Link>
            <Link to="/select"><button id="navSelect">Visualizar Usuários</button></Link>
            <Link to="/update"><button id="navUpdate"> Atualizar Dados </button></Link>
        </div>
    )
}

export default Home;