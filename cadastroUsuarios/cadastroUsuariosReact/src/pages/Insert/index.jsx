import axios from 'axios';
import './style.css';
import eyeClosed from '../../assets/iconEyeClosed.svg';
import eyeOpen from '../../assets/iconEyeOpen.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputPassword from '../../components/Inputs/inputPassword';
import ButtonBackHome from '../../components/Buttons/buttonBackHome';
import InputEmail from '../../components/Inputs/inputEmail';


function Insert() {

  const [emailUser, setEmail] = useState('');
  const [passwordUser, setPassword] = useState('');
  const [nomeUser, setName] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);

  const handleInsert = async (e) => {
    e.preventDefault();

    // Tenta receber código guardado no localStorage.
    const getToken = localStorage.getItem('token');
    console.log(getToken);

    setEmailVerify(false); // Falso por padrão

    const nomeTrim = nomeUser.trim();
    const emailTrim = emailUser.trim();
    const passwordTrim = passwordUser.trim();

    // Verificações padrões.
    if (nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
      toast.error("Preencha todos os campos para inserir o usuário.");
    } else if (passwordUser.length < 8) {
      toast.error('A senha deve conter pelo menos 8 caracteres.');
    } else {

      const nome = nomeTrim;
      const email = emailTrim;
      const password = passwordTrim;

      if (!getToken || getToken == null || getToken == "") {
        toast.error("Token inválido ou expirado.");
      } else {

        try {
          // Verificar se email já existe no banco de dados.
          const response = await axios.post("http://localhost:3001/verifyEmail",
            { email },
            { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken}` } });

          if (response.data.msg == "Email não cadastrado.") {
            setEmailVerify(false); // Usuário não existe.

            try {
              // Faz a requisição para inserir o usuário
              const response = await axios.post("http://localhost:3001/insertUser",
                { nome, email, password },
                {
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken}` }
                });

              toast.success("Sucesso!")
              console.log("Inseriu.")

              console.log(response.data);

            } catch (error) {

              if (!error?.response) {
                toast.error("Erro ao acessar o servidor.");
                console.log("Erro ao acessar o servidor.");

              } else {
                toast.error("Erro ao inserir usuário.");
                console.log("Erro ao inserir usuário.")
              }

            }

          } else {

            setEmailVerify(true); // Usuário já existe.

            toast.error("Email ja cadastrado.");
            console.log("Email ja cadastrado.")

          }

        } catch (error) {
          if(!error.response){
            toast.error("Erro ao acessar servidor.")
          }else if(error.response?.status== 401){ // Token inválido ou expirado.
            toast.error("Token inválido! Faça login novamente.")
          }else{
            toast.error("Erro inesperado")
          }
          
        }

      }


    }

  }


  return (

    <div>
      <ButtonBackHome/>
      <div className='container'>

        <form>
          <h1>Cadastro de Usuários</h1>
          <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} />
          <InputEmail onChangeEmail={(value) => setEmail(value)}/>
          <InputPassword onChangePassword={(value) => setPassword(value)}/>

          <button type='button' onClick={handleInsert}>Cadastrar</button>
        </form>

      </div>
    </div>
  );
}
export default Insert;
