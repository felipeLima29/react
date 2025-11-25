import axios from "axios";
import Trash from '../../assets/trash.png';
import Back from '../../assets/back.png';
import Update from '../../assets/update.png'
import { useEffect, useState } from "react";
import './style.css';
import { Link } from "react-router-dom";

function Select() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [count, setCount] = useState(0);


    const listUsers = async () => {

        try {
            const response = await axios.get("http://localhost:3001/listUsers");

            if (response.data) {
                setUsers(response.data);

            } else {
                setError("Não existe usuários no banco.");
            }

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            }
        }

    }

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete("http://localhost:3001/deleteUser", { data: { id } });

            console.log(response.data);

            setError('Usuário deletado com sucesso.')
        } catch (error) {
            if (!error?.response) {
                setError("Error ao acessar o sevidor");
            } else if (!id) {
                setError("Id vazio");
            } else {
                setError("Erro ao deletar usuário");
            }
        }

    }

    useEffect(() => {
        listUsers();
    }, []);

    return (
        <div>

            <div className='divButton'>
                <Link to="/"><button className="navGoBack"><img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

            <div className="container">

                <p>{error}</p>

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