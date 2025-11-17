import axios from 'axios';
import './style.css'
import Trash from '../../assets/trash.png'
import { useState } from 'react';

function Home() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(null);
  const [error, setError] = useState('');

  const users = [
    {
      id: "1",
      name: "Felipe",
      idade: 17,
      email: "fl7280460@gmail.com"
    },
    {
      id: "2",
      name: "Hugo",
      idade: 18,
      email: "hugo@gmail.com"
    },
    {
      id: "3",
      name: "Erick",
      idade: 17,
      email: "erick@gmail.com"
    },
  ]

  const handleInsert = async (e)=>{
    e.preventDefault();

    console.log(email, password);

    try{
      const response = await axios.post("http://localhost:3000/insertUser",
        JSON.stringify({name, email, password}),
        {
          headers: { 'Content-Type': 'application/json'}
        }
      );

      console.log(response.data);
    }catch(error){
      if(!error?.response){
          setError('Erro ao acessar o servidor');
      }
    }
  }

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" placeholder='Nome' required onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/>
        <button type='button'onClick={(e)=> handleInsert(e)}>Cadastrar</button>
      </form>
      <p>{error}</p>

      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <button>
            <img src={Trash} alt="Imagem lixeira"/>
          </button>
        </div>

      ))}


    </div>

  )
}

export default Home
