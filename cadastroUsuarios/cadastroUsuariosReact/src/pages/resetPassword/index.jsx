import axios from "axios"
import Back from '../../assets/back.png'
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';
import InputPassword from "../../components/inputPassword";

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const changePassword = async () => {
        const passwordTrim = password.trim();
        const passwordConfirmTrim = passwordConfirm.trim();

        // Verificações padrões.
        if(passwordTrim !== passwordConfirmTrim){
            toast.error('As senhas não coincidem.');
        }else if(passwordTrim.length<8 || passwordConfirmTrim.length<8){
            toast.error('A senha deve conter pelo menos 8 dígitos.');
        }else{
            const passwordUser = passwordTrim;
            const passwordUserConfirm = passwordConfirmTrim;
            const idUser = localStorage.getItem('IDUSER'); // Recebe id guardado no localStorage.

            try{
                // Faz a requisição para alterar a senha.
                const response = await axios.post('http://localhost:3001/resetPassword', {passwordUser, passwordUserConfirm, idUser});
                console.log(response.data.msg);
                toast.success("Senha atualizada com sucesso.")
            }catch(error){
                toast.error('Erro ao acessar o servidor.')
            }
        }
    }

    

    const toggleShow = () => {
        const input = document.querySelector(".inputPassword");
        const img = document.querySelector(".imgPassword");

        // Torna a senha visível.
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

        // Torna a senha visível.
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
                    <InputPassword onChangePassword={(valor) => setPassword(valor)}/>
                    <InputPassword onChangePassword={(valor) => setPasswordConfirm(valor)}/>

                    <button type="button" onClick={changePassword}>Atualizar</button>

                </form>
            </div>

        </div>
    )
}

export default ResetPassword;