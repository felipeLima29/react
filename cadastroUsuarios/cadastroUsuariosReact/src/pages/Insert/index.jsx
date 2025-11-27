import axios from 'axios';
import './style.css';
import Back from '../../assets/back.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Insert() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setName] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);


  const handleInsert = async (e) => {
    e.preventDefault();

    setEmailVerify(false); // Falso por padrão

    const nomeTrim = nome.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    if (nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
      toast.error("Preencha todos os campos para inserir o usuário.");
    } else if (password.length < 8) {
      toast.error('A senha deve conter pelo menos 8 caracteres.');
    } else {
      

      try {

        const response = await axios.post("http://localhost:3001/verifyEmail", { email });

        if (response.data == "") {
          setEmailVerify(false); // Usuário não existe.

          try {

            const response = await axios.post("http://localhost:3001/insertUser",
              { nomeTrim, emailTrim, passwordTrim },
              { headers: { 'Content-Type': 'application/json' } });


            //setSucess("Usuário inserido com sucesso.")
            toast.success("Sucesso!")
            console.log("Inseriu.")

            console.log(response.data);

          } catch (error) {

            if (!error?.response) {
              //setError('Erro ao acessar o servidor');
              toast.error("Erro ao acessar o servidor.");
              console.log("Erro ao acessar o servidor.")
            } else {
              //setError("Erro ao inserir usuário.");
              toast.error("Erro ao inserir usuário.");
              console.log("Erro ao inserir usuário.")
            }

          }

        } else {


          setEmailVerify(true); // Usuário já existe.

          //setError("Email ja cadastrado.");
          toast.error("Email ja cadastrado.");
          console.log("Email ja cadastrado.")

        }
        
      }catch (error) {

        console.log(error.body);
        //setError('Erro ao acessar servidor');
        toast.error("Erro ao acessar o servidor");

      }

    }

  }


    return (

      <div>
        <div className='divButton'>
          <Link to="/home"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
        </div>
        <div className='container'>

          <form>
            <h1>Cadastro de Usuários</h1>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
            <button type='button' onClick={handleInsert}>Cadastrar</button>
          </form>

        </div>
      </div>
    );
  }
export default Insert;
