import './Sidebar.css'
import DahsboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import {NavLink} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import Avatar from "./Avatar";


export default function Sidebar() {
    const {user} = useAuthContext()
    // console.log(user)
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    {/*    avatar and username later */}
                    <Avatar src={user.photoURL}/>
                    <span className="online-user"></span>
                    <p>Hey, {user.displayName}</p>
                </div>

                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DahsboardIcon} alt="dashboard icon"/>
                                <span>Missions</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="add project icon"/>
                                <span>New Order</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}