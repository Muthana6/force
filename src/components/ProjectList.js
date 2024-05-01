import './ProjectList.css'
import {NavLink} from "react-router-dom";
import Avatar from "./Avatar";

export default function ProjectList({projects}) {
    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects here yet</p> }
            {projects.map(project=> (

                <NavLink to={`/projects/${project.id}`} key={project.id}>
                    <div className="comment-author">
                        <Avatar src={project.createdBy.photoURL}/>
                        <p>{project.createdBy.displayName}</p>
                    </div>
                    <br/>

                    <h4> {project.name} </h4>
                    <p>Due by {project.dueDate.toDate().toDateString()} </p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoUrl}>
                                    <Avatar src={user.photoUrl}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}