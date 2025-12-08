import { Link } from "react-router-dom";
import Back from '../../assets/back.png';

function ButtonBackForgetPassword() {

    return (
        <div className='divButton'>
            <Link to="/forgetPassword"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
        </div>
    )
}

export default ButtonBackForgetPassword;