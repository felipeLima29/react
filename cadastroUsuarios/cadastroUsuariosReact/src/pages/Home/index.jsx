import './style.css'
import Trash from '../../assets/trash.png'

function Home() {

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
    }
  ]

  return (
  
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="name" type="text"/>
        <input type="idade" type='password' placeholder='ol'/>
        <input type="email" type="email"/>
        <button type='button'>Cadastrar</button>
      </form>

      <div>
        <div>
          <p>Nome: {users[0].name}</p>
          <p>Idade: </p>
          <p>Email: </p>
        </div>

        <div>
          <img src={Trash} alt="Imagem lixeira" />
        </div>
      </div>
    </div>
      
  )
}

export default Home
