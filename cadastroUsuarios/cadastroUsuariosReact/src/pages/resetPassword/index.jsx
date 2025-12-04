import axios from "axios"
import Back from '../../assets/back.png'
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const changePassword = async () => {
        const passwordTrim = password.trim();
        const passwordConfirmTrim = passwordConfirm.trim();

        if(passwordTrim !== passwordConfirmTrim){
            toast.error('As senhas não coincidem.');
        }else if(passwordTrim.length<8 || passwordConfirmTrim.length<8){
            toast.error('A senha deve conter pelo menos 8 dígitos.');
        }else{
            const passwordUser = passwordTrim;
            const passwordUserConfirm = passwordConfirmTrim;
            const idUser = localStorage.getItem('IDUSER');

            try{
                const response = await axios.post('http://localhost:3001/resetPassword', {passwordUser, passwordUserConfirm, idUser});
                console.log(response.data.msg);
                toast.success("Senha atualizada com sucesso.")
            }catch(error){
                error.body;
            }
        }
    }

    const HandleChange = async (event) => {
        setPassword(event.target.value);
        setPasswordConfirm(event.target.value);
    };

    const toggleShow = () => {
        const input = document.querySelector(".inputPassword");
        const img = document.querySelector(".imgPassword");

        if (input.type == "password") {
            input.type = "text";
            img.src = eyeOpen;
        } else if (input.type == "text") {
            input.type = "password";
            img.src = eyeClosed;
        }

    }

    const toggleShowConfirm = () => {
        const input = document.querySelector(".inputPasswordConfirm");
        const img = document.querySelector(".imgPasswordConfirm");

        if (input.type == "password") {
            input.type = "text";
            img.src = eyeOpen;
        } else if (input.type == "text") {
            input.type = "password";
            img.src = eyeClosed;
        }

    }


    return (
        <div>
            <div className="divButton">
                <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className="div-data">
                <form>

                    <h1>Atualização de Senha.</h1>
                    
                    <label htmlFor="Password">Insira sua nova senha:</label>
                    <div className="divPassword">
                        <input type="password"
                            placeholder="Senha"
                            className="inputPassword"
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <img className="imgPassword" onClick={toggleShow} src={eyeClosed} alt="Olho fechado" />

                    </div>
                    <div className="passwordConfirm">
                        <input type="password"
                            placeholder="Senha"
                            className="inputPasswordConfirm"
                            onChange={(e) => setPasswordConfirm(e.target.value)}

                        />
                        <img className="imgPasswordConfirm" onClick={toggleShowConfirm} src={eyeClosed} alt="Olho fechado" />
                    </div>

                    <button type="button" onClick={changePassword}>Atualizar</button>

                </form>
            </div>

        </div>
    )
}

export default ResetPassword;