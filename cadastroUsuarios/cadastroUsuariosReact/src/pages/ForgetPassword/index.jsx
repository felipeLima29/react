import axios from 'axios';
import './style.css';
import Back from '../../assets/back.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {

    const [emailUser, setEmail] = useState('');



    return (

        <div>
            <div className='divButton'>
                <Link to="/home"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>
            <div className='container'>

                <form>
                    <h1>Cadastro de Usuários</h1>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <button type='button'>Cadastrar</button>
                </form>

            </div>
        </div>
    )
}

export default ForgetPassword;