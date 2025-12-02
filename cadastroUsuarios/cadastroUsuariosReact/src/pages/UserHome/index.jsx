import React from "react"
import './style.css'
import { Link } from "react-router-dom";

function UserHome() {

    return (
        <div>
            <div className="divButton">
                <Link to="/"> <button className="navGoBack"> Sair </button> </Link>
            </div>
            <div className="container">

                <h1>Seja bem vindo!</h1>

                <Link to="/select"><button id="navSelect">Visualizar Usuários</button></Link>
            </div>
        </div>
    )
}

export default UserHome;