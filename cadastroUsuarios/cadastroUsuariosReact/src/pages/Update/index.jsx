import axios from "axios"
import Back from '../../assets/back.png'
import { Link } from "react-router-dom";
import { useState } from "react";
import './style.css'

function UpdateUser(){

    const [idValue, setIdValue] = useState('');
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    const HandleChange = async(event) =>{
        setIdValue(event.target.value);
    };

    const updateField = (id, field, value) => {
        setUser((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, [field]: value } : u
            )
        );
    };


    const listUser = async (id) => {

        try{
            if(!id){
                console.log("id nulo");
            }else{
                const response = await axios.post('http://localhost:3001/listUser', {id});
                
                if(response.data == ""){
                    setError('Não existe um usuário com esse Id.')
                }else{
                    setError('aaa')
                }

                console.log(response.data);
                setUser([response.data]);
            }
            
        }catch(error){
            error.body
        }
    }
    const updateUser = async (id, nome, email, password) => {

        try{
            const response = await axios.put('http://localhost:3001/updateUser', {id, nome, email, password})

            console.log(response.data);

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

                    <p>{error}</p>
                </form>
            </div>

            {user.map((userSelected) => (
                <div key={userSelected.id}>
                    <form className="form-update">

                        <p>Id:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.id}
                            readOnly/>
                        <p>Nome:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.nome}
                            onChange={(e) => updateField(userSelected.id, "nome", e.target.value)}/>

                        <p>Email:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.email}
                            onChange={(e) => updateField(userSelected.id, "email", e.target.value)}/>

                        <p>Senha:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.password}
                            onChange={(e) => updateField(userSelected.id, "password", e.target.value)}/>

                        <button
                            type="button"
                            onClick={() =>
                            updateUser(userSelected.id ,userSelected.nome, userSelected.email, userSelected.password)
                            }>Atualizar</button>
                    </form>
                </div>
            ))}


        </div>
    )
}

export default UpdateUser;