import axios from "axios"
import Back from '../../assets/back.png'
import { Link } from "react-router-dom";
import { useState } from "react";
import './style.css'

function UpdateUser(){

    const [idValue, setIdValue] = useState('');
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleChange = async(event) =>{
        setIdValue(event.target.value);
    };
    const handleChangeName = async(event) =>{
        setName(event.target.value);
        console.log(password);
    }
    const handleChangeEmail = async(event) =>{
        setEmail(event.target.value);
        console.log(password);
    }
    const handleChangePassword = async(event) =>{
        setPassword(event.target.value);
        console.log(password);
    }

    const listUser = async (id) => {

        try{
            if(!id){
                console.log("id nulo");
            }else{
                const response = await axios.post('http://localhost:3001/listUser', {id});
                console.log(response.data);
                setUser([response.data]);
            }
            
        }catch(error){
            error.body
        }
    }
    const updateUser = async (nome, email, password) => {
        try{
            console.log(nome, " ", email, " ", password)
        }catch(error){
            error.body
        }
    }
    

    return(
        <div>
            <div className="divButton">
                <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className="div-data">
                <form>
                    <h1>Atualização de dados dos usuários</h1>
                    <input type="text" placeholder="Digite um id" required onChange={HandleChange}/>

                    <button type="button" onClick={() => { listUser(idValue) }}>Procurar</button>
                </form>
            </div>

            {user.map((userSelected) => (

                <div key={userSelected.id}>
                    <form className="form-update">

                        <p>Nome:</p>
                        <input type="text" name="nome" id="nome" value={userSelected.nome} onChange={handleChangeName}/>
                        <p>Email:</p>
                        <input type="text" name="email" id="email" value={userSelected.email} onChange={handleChangeEmail}/>
                        <p>Senha:</p>
                        <input type="text" name="password" id="password" value={userSelected.password} onChange={handleChangePassword}/>

                        <button type="button" onClick={() => { updateUser(name, email, password) }}>Atualizar</button>     

                    </form>
                </div>
            ))}

        </div>
    )
}

export default UpdateUser;