import axios from "axios"
import Back from '../../assets/back.png'
import { Link } from "react-router-dom";
import { useState } from "react";

function UpdateUser(){

    const [showBox, setShowBox] = useState('');

    const updateUser = async (e) =>{

        try{
            const response = await axios.put('http://localhost:3001/updateUser')
            console.log(response.data);
        }catch(error){
            error.body; 
        }
    }
    

    return(
        <div>
            <div className="divButton">
                <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className="container">
                <form>
                    <h1>Atualização de dados dos usuários</h1>
                    <input type="text" placeholder="Digite um id" required/>

                    <button>Procurar</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;