import { useState } from "react";
import Back from '../../assets/back.png'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ConfirmCod() {

    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const verifyCod = async () =>{
        const getCod = localStorage.getItem('COD');
        const getIdUser = localStorage.getItem

        if(code !== getCod){
            toast.error('Código inválido, tente novamente.');
        }else{
            toast.success('Código válido.');
            navigate('/ResetPassword');
        }
    }


    return (
        <div>
            <div className='divButton'>
                <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className='container'>
                <form>
                    <h1>Digite o código</h1>
                    <input type="number" placeholder='Código' maxLength={6} onChange={(e) => setCode(e.target.value)} />

                    <button type='button' onClick={() => {
                        verifyCod()
                    }}>Verificar</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmCod;