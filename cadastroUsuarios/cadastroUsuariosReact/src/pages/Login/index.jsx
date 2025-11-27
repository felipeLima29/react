import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        const emailTrim = email.trim();
        const passwordTrim = password.trim();

        if (emailTrim == "" || passwordTrim == "") {
            toast.error("Preencha todos os campos para inserir o usuário.");
        } else if (password.length < 8) {
            toast.error('A senha deve conter pelo menos 8 caracteres.');
        }else{

            try{

                console.log(email, "   ", password);

            }catch(error){
                error.body;
            }

        }

    }

    return (

        <div>

            <div className="container">
                <h1 className="aaa">Seja bem vindo!</h1>

                <form>
                    <h2>Faça Login para acessar o sistema.</h2>
                    <input type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={handleLogin}>Entrar</button>
                </form>

            </div>

        </div>

    )
}

export default Login;