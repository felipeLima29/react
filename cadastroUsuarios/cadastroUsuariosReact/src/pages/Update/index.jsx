import axios from "axios"
import Back from '../../assets/back.png'
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'

function UpdateUser() {

    const location = useLocation();
    const userId = location.state;

    const [idValue, setIdValue] = useState(userId);
    const [user, setUser] = useState([]);

    const toggleShow = () => {
        const input = document.querySelector(".inputPasswordUpdate");
        const img = document.querySelector(".imgPasswordUpdate");

        if (input.type == "password") {
            input.type = "text";
            img.src = eyeOpen;
        } else if (input.type == "text") {
            input.type = "password";
            img.src = eyeClosed;
        }

    }

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

        try {
            if (!id) {
                console.log("id nulo");
                toast.error('Digite um id.');
            } else {

                try {
                    const response = await axios.post('http://localhost:3001/listUser', { id });

                    if (response.data == "") {
                        toast.error('Não existe um usuário com esse Id.');
                    } else {
                        console.log(response.data);
                        setUser([response.data]);
                    }

                } catch (error) {

                    if (!error?.response) {
                        //setError('Erro ao acessar o servidor');
                        toast.error('Erro ao acessar o servidor.')
                    }

                }

            }

        } catch (error) {
            error.body;
        }
    }
    const updateUser = async (id, nome, email, password) => {

        const nomeTrim = nome.trim();
        const emailTrim = email.trim();
        const passwordTrim = password.trim();
        let getToken = localStorage.getItem('token');

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
            <div className="divButton">
                <Link to="/home"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
            </div>

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
                            readOnly />
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
                            required />

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