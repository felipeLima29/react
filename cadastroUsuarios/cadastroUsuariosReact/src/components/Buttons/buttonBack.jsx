import { Link } from "react-router-dom";

function ButtonBack() {

    return (
        <div className="divButton">
            <Link to="/"> <button className="navGoBack"> Sair </button> </Link>
        </div>
    )
}

export default ButtonBack;