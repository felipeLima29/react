import React from "react"
import './style.css'
import { Link } from "react-router-dom";

function Home() {

    return (
        <div>
            <div className="divButton">
                <Link to="/"> <button className="navGoBack"> Sair </button> </Link>
            </div>
            <div className="container">

                <h1>Seja bem vindo ao Gerenciamento de Usuários</h1>

                <Link to="/select"><button id="navSelect">Visualizar Usuários</button></Link>
            </div>
        </div>
    )
}

export default Home;