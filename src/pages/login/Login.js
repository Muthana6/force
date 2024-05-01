// styles
import './Login.css'
import {useState} from "react";
import {useLogin} from "../../hooks/useLogin";

export default function Login() {
    const [email, setEmail] =  useState('')
    const [password, setPassword] =  useState('')

    const {isPending, error, login} = useLogin()
    const handleSubmit = (eventObject)=> {
        eventObject.preventDefault()
        login(email, password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <label>
                <span>Email:</span>
                <input type="email"
                       onChange={(event) => setEmail(event.target.value)}
                       value={email}
                />
            </label>

            <label>
                <span>Password:</span>
                <input type="password"
                       onChange={(event) => setPassword(event.target.value)}
                       value={password}
                />
            </label>


            {!isPending && <button className="btn">Log in</button>}
            {isPending && <button className="btn" disabled>Logging...</button>}


            {error && <div className="error"> {error} </div>}
        </form>
    )
}