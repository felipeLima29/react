import './style.css';
import ButtonBack from "../../components/Buttons/buttonBack";

function UserHome() {

    return (
        <div>
            <ButtonBack/>
            <div className="container">

                <h1>Seja bem vindo!</h1>

                <p className="msg">Você é um usuário comum, portanto, não pode alterar nada neste sistema.</p>
                <p className="msg">Aguarde atualizações!!!</p>
            </div>
        </div>
    )
}

export default UserHome;