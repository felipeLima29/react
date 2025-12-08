import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonBackForgetPassword from "../../components/Buttons/buttonBackForgetPassword";

function ConfirmCod() {

    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const verifyCod = async () => {
        // Tenta receber código guardado no localStorage.
        const getCod = localStorage.getItem('COD');

        // Se o código for diferente do código inserido pelo usuário, retornará um toast exibindo mensagem de erro.
        if (code !== getCod) {
            toast.error('Código inválido, tente novamente.');
        } else {
            toast.success('Código válido.');
            navigate('/ResetPassword'); // Redireciona para a tela de mudar senha.
        }
    }


    return (
        <div>
            <ButtonBackForgetPassword/>

            <div className='container'>
                <form>
                    <h1>Digite o código</h1>
                    <input type="number" placeholder='Código' maxLength={6} onChange={(e) => setCode(e.target.value)} />

                    <button type='button' onClick={() => { verifyCod() } }>Verificar</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmCod;