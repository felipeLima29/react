import axios from 'axios';
import './style.css'
import Trash from '../../assets/trash.png'
import { useState, useEffect, use } from 'react';

function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setName] = useState('');
  //const [id, setId] = useState('')
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const listUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/listUsers");
      setUsers(response.data); // ATUALIZA O ESTADO CORRETAMENTE
    } catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o servidor');
      } else {
        setError("Não existe usuários no banco.");
      }
    }
  }

  // CHAMA APENAS UMA VEZ
  useEffect(() => {
    listUsers();
  }, []);

  const handleInsert = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/insertUser",
        { nome, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setError("Usuário inserido com sucesso!");
      console.log(response);

      // RECARREGA A LISTA
      listUsers(); 
      
    } catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o servidor');
      } else {
        setError("Erro ao inserir usuário.");
      }
    }
  }
  
  const handleDelete = async (id) => {
  
    console.log(id);

    try{
      const response = await axios.delete("http://localhost:3001/deleteUser",
      );

    }catch(error){
      if(!error?.response){
        setError("Error ao acessar o sevidor");
      } else if(!id){
        setError("Id vazio");
      }else{
        setError("Erro ao deletar usuário");
      }
    }

  }

  return (
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

            <img src={Trash} alt="Imagem lixeira"/>

          </button>
        </div>

      ))}
    </div>
  );
}

export default Home;
