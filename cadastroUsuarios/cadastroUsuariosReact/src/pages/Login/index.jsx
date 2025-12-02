import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toggleShow = () => {
        const input = document.querySelector("#inputPassword");
        const img = document.querySelector("#imgPassword");

        if (input.type == "password") {
            input.type = "text";
            img.src = eyeOpen;
        } else if (input.type == "text") {
            input.type = "password";
            img.src = eyeClosed;
        }

    }

    const handleLogin = async () => {

        const emailTrim = email.trim();
        const passwordTrim = password.trim();

        if (emailTrim == "" || passwordTrim == "") {
            toast.error("Preencha todos os campos para inserir o usuário.");
        } else if (password.length < 8) {
            toast.error('A senha deve conter pelo menos 8 caracteres.');
        } else {

            try {

                const response = await axios.post('http://localhost:3001/loginUser', { email, password });
                console.log(response.data);

                if (response.data.msg == "Usuário não encontrado.") {

                    console.log("Usuário não encontrado, verificando se é um administrador.")

                    try {
                        const response = await axios.post('http://localhost:3001/loginAdmin', { email, password });
                        if (response.data.msg == 'Usuário não encontrado.') {
                            console.log("administrador não encontrado.")
                            toast.error('Usuário não encontrado.');
                        } else {
                            navigate('/home');
                            toast.success('Login realizado com sucesso.');
                        }

                    } catch (error) {
                        error.body;
                    }

                } else {

                    try {

                        const token = await axios.post('http://localhost:3001/getToken', { email, password });
                        localStorage.setItem('token', token.data)
                        navigate('/userHome');

                        toast.success('Login realizado com sucesso.');
                        console.log(token);

                    } catch (error) {
                        error.body;
                        toast.error("erro");
                    }

                }

            } catch (error) {
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

                    <input type="text"
                        placeholder="Digite seu email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="divPassword">

                        <input type="password"
                            placeholder="Digite sua senha"
                            className="inputPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        <img className="imgPassword" onClick={toggleShow} src={eyeClosed} alt="Olho fechado" />

                    </div>


                    <button type="button" onClick={handleLogin}>Entrar</button>
                </form>

            </div>

        </div>

    )
}

export default Login;