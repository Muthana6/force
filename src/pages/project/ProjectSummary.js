import './Project.css'
import Avatar from "../../components/Avatar";
import {useFirestore} from "../../hooks/useFirestore";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";


export default function ProjectSummary({project}) {
    const {deleteDocument} = useFirestore("projects")
    const {user} = useAuthContext()
    const navigate = useNavigate();



    const handleClick = (e)=> {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        <div>
            <div className="project-summary">


                <h2 className="page-title">{project.name}</h2>
                <p>by {project.createdBy.displayName}</p>
                <br/>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Mission assigned to: </h4>

                {project.assignedUsersList.map((user, index) => (
                    <span key={user.id}>
                                    {user.displayName}
                        {index !== project.assignedUsersList.length - 1 && ', '}
                    </span>
                ))}
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoUrl}/>
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id &&
                <button className="btn" onClick={handleClick}>Mark as Complete</button>}

        </div>
    )
}