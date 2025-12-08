import axios from "axios"
import Back from '../../assets/back.png'
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import ButtonBackHome from "../../components/Buttons/buttonBackHome";

function UpdateUser() {

    const location = useLocation();
    const userId = location.state;

    const [idValue, setIdValue] = useState(userId);
    const [user, setUser] = useState([]);

    const toggleShow = () => {
        const input = document.querySelector(".inputPasswordUpdate");
        const img = document.querySelector(".imgPasswordUpdate");

        // Torna a senha visível.
        if (input.type == "password") {
            input.type = "text";
            img.src = eyeOpen;
        } else if (input.type == "text") {
            input.type = "password";
            img.src = eyeClosed;
        }

    }

    // Atualiza o id.
    const HandleChange = async (event) => {
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

        if (!id) {
            console.log("id nulo");
            toast.error('Digite um id.');
        } else {
            try {
                // Faz a requisição para listar o usuário.
                const response = await axios.post('http://localhost:3001/listUser', { id });

                // Se retornar vaziom o usuário não existe, consequentemente não pode ser modificado.
                if (response.data == "") {
                    toast.error('Não existe um usuário com esse Id.');
                } else {
                    console.log(response.data);
                    setUser([response.data]); // Alimenta o array user com os dados fornecidos.
                }

            } catch (error) {

                if (!error?.response) {
                    toast.error('Erro ao acessar o servidor.')
                }
            }
        }
    }
    const updateUser = async (id, nome, email, password) => {

        const nomeTrim = nome.trim();
        const emailTrim = email.trim();
        const passwordTrim = password.trim();
        let getToken = localStorage.getItem('token');

        // Verificações padrões.
        if (nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
            toast.error('Preencha todos os campos.');
        } else if (passwordTrim.length < 8) {
            toast.error('A senha deve conter pelo menos 8 dígitos.')
        }
        else {
            nome = nomeTrim;
            email = emailTrim;
            password = passwordTrim;
            try {
                // Faz requisição pra atualizar o usuário com os dados fornecidos.
                const response = await axios.put('http://localhost:3001/updateUser',
                    { id, nome, email, password },
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken}` }
                    });

                console.log(response.data);
                toast.success("Usuário atualizado com sucesso!");

            } catch (error) {
                if (!error.response) {
                    toast.error("Erro ao acessar servidor.")
                } else if (error.response?.status == 401) {
                    toast.error("Token inválido! Faça login novamente.")
                } else {
                    toast.error("Erro inesperado")
                }
            }

        }

    }


    return (

        <div>
            <ButtonBackHome/>

            <div className="div-data">
                <form>

                    <h1>Atualização de dados dos usuários</h1>
                    <input type="number" placeholder="Digite um id" onChange={HandleChange} defaultValue={idValue} required />

                    <button type="button" onClick={() => { listUser(idValue) }}>Procurar</button>

                </form>
            </div>

            {user.map((userSelected) => (
                <div key={userSelected.id}>
                    <form className="form-update">

                        <p>Id:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.id}
                            readOnly
                        />
                        <p>Nome:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.nome}
                            onChange={(e) => updateField(userSelected.id, "nome", e.target.value)}
                            required />

                        <p>Email:</p>
                        <input className="input-update"
                            type="text"
                            value={userSelected.email}
                            onChange={(e) => updateField(userSelected.id, "email", e.target.value)}
                            required
                        />

                        <p>Senha:</p>
                        <div className="divPasswordUpdate">

                            <input className="inputPasswordUpdate"
                                type="password"
                                value={userSelected.password}
                                onChange={(e) => updateField(userSelected.id, "password", e.target.value)}
                                required
                            />
                            <img className="imgPasswordUpdate" onClick={toggleShow} src={eyeClosed} alt="Olho fechado" />

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                updateUser(userSelected.id, userSelected.nome, userSelected.email, userSelected.password)
                            }>Atualizar</button>
                    </form>
                </div>
            ))}


        </div>

    )
}

export default UpdateUser;