import { useState } from "react";
import Back from '../../assets/back.png'
import { Link } from "react-router-dom";


function ConfirmCod() {

    const [cod, setCod] = useState('');

    const verifyCod = async (cod) =>{
        const getCod = localStorage.getItem('COD');

        console.log(getCod);
    }


    return (
        <div>
            <div className='divButton'>
                <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className='container'>
                <form>
                    <h1>Digite o código</h1>
                    <input type="text" placeholder='Código' maxLength={6} onChange={(e) => setCod(e.target.value)} />

                    <button type='button' onClick={() => {
                        verifyCod(cod)
                    }}>Verificar</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmCod;