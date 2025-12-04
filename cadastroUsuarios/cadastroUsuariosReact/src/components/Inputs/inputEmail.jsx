import { useState } from "react";

function InputEmail({ onChangeEmail }) {

    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        onChangeEmail(e.target.value);
    }

    return (
        <input type="text"
            placeholder="Digite seu email"
            onChange={handleChange}
        />
    )
}

export default InputEmail;