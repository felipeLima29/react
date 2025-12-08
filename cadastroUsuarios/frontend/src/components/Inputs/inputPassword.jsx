import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function InputPassword( {onChangePassword} ) {

    const [isShow, setIsShow] = useState(false)
    const [password, setPassword] = useState('');
    const handlePassword = () => setIsShow(!isShow);

    const handleChange = (e) => {
        setPassword(e.target.value);
        onChangePassword(e.target.value);
    }
    
    return (

        <div className="divPassword">

            <input type={isShow ? "text" : "password"}
                placeholder="Digite sua senha"
                className="inputPassword"
                onChange={handleChange}

            />
            <button className="imgPassword" onClick={handlePassword} type="button">
                {!isShow && <EyeOff size={18} />}
                {isShow && <Eye size={18} />}
            </button>
        
        </div>
    )
}

export default InputPassword;