import axios from 'axios';
import './style.css';
import Back from '../../assets/back.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {

    const [emailUser, setEmail] = useState('');
    const navigate = useNavigate();


    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const getCod = async () => {
        const emailTrim = emailUser.trim();

        if (emailTrim == "" || emailTrim == null) {
            toast.info("Digite um email.")
        } else if (!validateEmail(emailTrim)) {
            toast.info("Digite um email válido.");
        } else {
            const email = emailTrim;
            toast.info('Enviando código para seu email...', {autoClose: 3000});
            try {
                const response = await axios.post('http://localhost:3001/forgetPassword', { email });

                if(response.data.msg == "Código de recuperação enviado com sucesso."){
                    toast.success("Código enviado com sucesso.");
                }
                const code = response.data.code;
                localStorage.setItem('COD', code);
                //navigate('/confirmCod');
            } catch (error) {
                console.log("erro");
            }
        }

    }

    return (

        <div>
            <div className='divButton'>
                <Link to="/home"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>
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