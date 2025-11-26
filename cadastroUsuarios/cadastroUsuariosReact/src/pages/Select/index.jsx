import axios from "axios";
import Trash from '../../assets/trash.png';
import Back from '../../assets/back.png';
import Update from '../../assets/update.png'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';
import { Link } from "react-router-dom";

function Select() {

    const [users, setUsers] = useState([]);

    const listUsers = async () => {

        try {
            const response = await axios.get("http://localhost:3001/listUsers");

            if (response.data) {
                setUsers(response.data);

            } else {
                //setError("Não existe usuários no banco.");
                
            }

        } catch (error) {
            if (!error?.response) {
                //setError('Erro ao acessar o servidor');
                toast.error('Erro ao acessar o servidor.')
                console.log(error.body);
            }
        }

    }

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete("http://localhost:3001/deleteUser", { data: { id } });

            console.log(response.data);

            //setMessage('Usuário deletado com sucesso.');
            toast.success('Usuário deletado com sucesso.')
        } catch (error) {
            if (!error?.response) {
                //setMessage("Error ao acessar o sevidor");
                toast.error('Error ao acessar o sevidor.')
            } else if (!id) {
                //setMessage("Id vazio");
                toast.error('Id vazio.')
            } else {
                //setError("Erro ao deletar usuário");
                toast.error('Erro ao deletar usuário.')
            }
        }

    }

    useEffect(() => {
        listUsers();
    }, [users]);

    return (
        
        <div>

            <div className='divButton'>
                <Link to="/"><button className="navGoBack"><img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className="container">

                {users.map((user) => (

                    <div className='card' key={user.id}>
                        <div>
                            <p>Id: <span>{user.id}</span></p>
                            <p>Nome: <span>{user.nome}</span></p>
                            <p>Email: <span>{user.email}</span></p>
                            <p>Password: <span>{user.password}</span></p>
                        </div>

                        <div className="divImg">
                            <Link to='/update' state={user.id}><button><img src={Update} alt="upd"/></button></Link>

                            <button onClick={() => {
                                handleDelete(user.id);
                            }}>

                                <img src={Trash} alt="Imagem lixeira" />

                            </button>
                            
                        </div>
                    </div>

                ))}
            </div>
        </div>

    )


}

export default Select