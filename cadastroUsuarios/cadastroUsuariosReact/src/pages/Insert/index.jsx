import axios from 'axios';
import './style.css'
import Trash from '../../assets/trash.png'
import Back from '../../assets/back.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Insert() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setName] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [emailVerify, setEmailVerify] = useState(false);


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

  useEffect(() => {
    listUsers();
  }, []);

  const handleInsert = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/verifyEmail", { email });

      setEmailVerify(false);
      setError('');

      if (nome == "" || email == "" || password == "") {
        setError('Preencha todos os campos para inserir o usuário.')
      } else if (response.data == "") {
        setEmailVerify(false); // Usuário não existe.
        try {

          const response = await axios.post("http://localhost:3001/insertUser",
            { nome, email, password },
            { headers: { 'Content-Type': 'application/json' } }
          );

          setError("Usuário inserido com sucesso.")
          console.log("Inseriu.")

          listUsers();
        } catch (error) {
          if (!error?.response) {
            setError('Erro ao acessar o servidor');
          } else {
            setError("Erro ao inserir usuário.");
          }
        }

      } else {
        setEmailVerify(true); // Usuário já existe.

        setError("Email ja cadastrado.");
        console.log("Email ja cadastrado.")
      }

    } catch (error) {
      console.log(error.body);
      setError('Erro ao acessar servidor');
    }

  }

  const handleDelete = async (id) => {

    try {
      const response = await axios.delete("http://localhost:3001/deleteUser", { data: { id } });

      console.log(response.data);
      listUsers();
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

  return (

    <div>
      <div className='divButton'>
        <Link to="/"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
      </div>
      <div className='container'>

        <form>
          <h1>Cadastro de Usuários</h1>
          <input type="text" placeholder='Nome' required onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
          <button type='button' onClick={handleInsert}>Cadastrar</button>
        </form>

        <p>{error}</p>

        {users.map((user) => (

          <div className='card' key={user.id}>
            <div>
              <p>Id: <span>{user.id}</span></p>
              <p>Nome: <span>{user.nome}</span></p>
              <p>Email: <span>{user.email}</span></p>
              <p>Password: <span>{user.password}</span></p>
            </div>

            <button onClick={() => {
              handleDelete(user.id);
            }}>

              <img src={Trash} alt="Imagem lixeira" />

            </button>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Insert;
