import React from "react"
import './style.css'
import { Link } from "react-router-dom";
import ButtonBack from "../../components/Buttons/buttonBack";

function UserHome() {

    return (
        <div>
            <ButtonBack/>
            <div className="container">

                <h1>Seja bem vindo!</h1>

                <Link to="/select"><button id="navSelect">Visualizar Usuários</button></Link>
            </div>
        </div>
    )
}

export default UserHome;