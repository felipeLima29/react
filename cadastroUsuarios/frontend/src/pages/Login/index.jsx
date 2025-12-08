import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import InputPassword from "../../components/Inputs/inputPassword";
import InputEmail from "../../components/Inputs/inputEmail";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {

        const emailTrim = email.trim();
        const passwordTrim = password.trim();
        // Verificações padrões.
        if (emailTrim == "" || passwordTrim == "") {
            toast.error("Preencha todos os campos para realizar o login.");
        } else if (password.length < 8) {
            toast.error('A senha deve conter pelo menos 8 caracteres.');
        } else if (!validateEmail(email)) {
            toast.error("Digite um email válido.")
        } else {

            try {
                // Faz a requisição para fazer login.
                const response = await axios.post('http://localhost:3001/loginUser', { email, password });
                console.log(response.data);

                // Se o usuário não for encontrado, ele vai verificar se é um administrador
                if (response.data.msg == "Usuário não encontrado.") {
                    console.log("Usuário não encontrado, verificando se é um administrador.")
                    try {
                        // Verificando se é um administrador.
                        const response = await axios.post('http://localhost:3001/loginAdmin', { email, password });
                        // Se também não achar um administrador, exibe um toast na tela.
                        if (response.data.msg == 'Usuário não encontrado.') {
                            console.log("administrador não encontrado.")
                            toast.error('Usuário não encontrado.');
                        } else {
                            // Se achar um administrador, tenta gerar um token.
                            try {
                                const token = await axios.post('http://localhost:3001/getToken', { email, password });
                                localStorage.setItem('token', token.data)
                                toast.success('Login realizado com sucesso.');
                                console.log(token);
                                navigate('/home'); // Redireciona para a home.
                            } catch (error) {
                                toast.error("Erro ao acessar o servidor.")
                            }
                        }

                    } catch (error) {
                        toast.error('Erro ao acessar o servidor.');
                    }

                } else {
                    try {
                        // Se achar um usuário comum, tenta gerar um token.
                        const token = await axios.post('http://localhost:3001/getToken', { email, password });
                        localStorage.setItem('token', token.data)
                        navigate('/userHome'); // Redireciona para a home dos usuários.

                        toast.success('Login realizado com sucesso.');
                        console.log(token);

                    } catch (error) {
                        toast.error("Erro ao gerar token.");
                    }
                }

            } catch (error) {
                toast.error('Erro ao acessar o servidor.');
            }
        }
    }

    return (

        <div>

            <div className="container">

                <form>
                    <h1>Faça Login para acessar o sistema.</h1>

                    <InputEmail onChangeEmail={(value) => setEmail(value)} />
                    <InputPassword onChangePassword={(valor) => setPassword(valor)} />

                    <button type="button" onClick={handleLogin}>Entrar</button>

                    <p id="forgetPassword">Esqueceu a senha? <Link id="linkForgetPassword" to="/forgetPassword">Clique aqui</Link> </p>
                </form>

            </div>

        </div>

    )
}

export default Login;