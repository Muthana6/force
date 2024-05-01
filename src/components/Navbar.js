import './Navbar.css'

import Jedi from '../assets/jedi.jpg'

import {NavLink} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

export default function Navbar() {
    const {logout, isPending} = useLogout()
    const{user} = useAuthContext()
    return (
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <NavLink to='/' style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Jedi} alt="dojo logo"/>
                        <span>The Galaxy</span>
                    </NavLink>
                </li>
                {!user && <>
                  <li><NavLink to='/login'>Login</NavLink></li>
                  <li><NavLink to='/signup'>Signup</NavLink></li></>}

                {user &&
                    <li>
                        {!isPending &&
                            <button className="btn" onClick={logout}> Logout </button>}
                        {isPending &&
                            <button className="btn" disabled> Logging out.. </button>}
                    </li>}
            </ul>
        </div>
    )
}