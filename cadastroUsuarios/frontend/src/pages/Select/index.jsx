import axios from "axios";
import Trash from '../../assets/trash.png';
import Update from '../../assets/update.png'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';
import { Link } from "react-router-dom";
import ButtonBackHome from "../../components/Buttons/buttonBackHome";

function Select() {

    const [users, setUsers] = useState([]);

    const listUsers = async () => {
        const getToken = localStorage.getItem('token');
        console.log(getToken);

        try {
            // Faz a requisição para listar todos os usuários comum.
            const response = await axios.get("http://localhost:3001/listUsers",
                { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken}` } }
            );

            if (response.data) {
                // Alimenta o array users com os dados retornados
                setUsers(response.data);

            } else {
                toast.error("Sem usuários.")
            }

        } catch (error) {
            if (!error?.response) {
                toast.error('Erro ao acessar o servidor.')
                console.log(error.body);
            }
        }

    }

    const handleDelete = async (id) => {
        const getToken = localStorage.getItem('token');

        try {
            // Faz requisição para deletar usuário.
            const response = await axios.delete("http://localhost:3001/deleteUser", {
                data: { id },
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });

            console.log(response.data);
            toast.success('Usuário deletado com sucesso.');
        } catch (error) {
            if (!error.response) {
                toast.error("Erro ao acessar servidor.")
            } else if (error.response?.status == 401) {
                toast.error("Token inválido! Faça login novamente.")
            } else if (!id) {
                toast.error('Id vazio.');
            } else {
                toast.error("Erro inesperado")
            }
        }

        listUsers();

    };

    // Lista os usuário quando renderizar a tela.
    useEffect(() => {
        listUsers();
    }, []);

    return (

        <div>
            <ButtonBackHome />

            <div className="container">

                {users.map((user) => ( // O .map lê um array e pode exibir cada um.

                    <div className='card' key={user.id}>
                        <div>
                            <p>Id: <span>{user.id}</span></p>
                            <p>Nome: <span>{user.nome}</span></p>
                            <p>Email: <span>{user.email}</span></p>
                            <p>Password: <span>{user.password}</span></p>
                        </div>

                        <div className="divImg">
                            <Link to='/update' state={user.id}><button><img src={Update} alt="upd" /></button></Link>

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