import axios from 'axios';
import './style.css';
import Back from '../../assets/back.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonBackHome from '../../components/Buttons/buttonBackHome';
import ButtonBack from '../../components/Buttons/buttonBack';

function ForgetPassword() {

    const [emailUser, setEmail] = useState('');
    const navigate = useNavigate();

    // Regex para validar email.
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const getCod = async () => {
        const emailTrim = emailUser.trim();

        // Verificações padrões.
        if (emailTrim == "" || emailTrim == null) {
            toast.info("Digite um email.")
        } else if (!validateEmail(emailTrim)) {
            toast.info("Digite um email válido.");
        } else {
            const email = emailTrim;
            toast.info('Tentando enviar código para seu email...', { autoClose: 3000 });
            try {
                // Tenta fazer requisição.
                const response = await axios.post('http://localhost:3001/forgetPassword', { email });

                if (response.data.msg == "Este email não está cadastrado no sistema.") {
                    toast.info("Este email não está cadastrado no sistema.")
                } else if (response.data.msg == "Código de recuperação enviado com sucesso.") {
                    toast.success("Código enviado com sucesso.");
                    
                    // Armazena código vindo da requisição, e o id do usuário que irá alterar a senha.
                    const code = response.data.code; 
                    const id = response.data.idUser;
                    localStorage.setItem('COD', code);
                    localStorage.setItem('IDUSER', id);
                    navigate('/confirmCod'); // Redireciona para tela de confirmar código.
                }
            } catch (error) {
                toast.error("Erro ao acessar servidor.")
                console.log("erro");
            }
        }

    }

    return (

        <div>
            <ButtonBack/>
            <div className='container'>

                <form>
                    <h1>Recuperar Senha</h1>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <button type='button' onClick={getCod}>Recuperar</button>
                </form>

            </div>
        </div>
    )
}

export default ForgetPassword;