import { Link } from "react-router-dom";
import Back from '../../assets/back.png';

function ButtonBackHome() {

    return (
        <div className='divButton'>
            <Link to="/home"><button id='navGoBack'> <img src={Back} alt='Icon voltar'></img> Voltar</button></Link>
        </div>
    )
}

export default ButtonBackHome;