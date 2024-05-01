import {useEffect, useState} from 'react'
import Select from "react-select";

// styles
import './Create.css'
import {useCollection} from "../../hooks/useCollection";
import {timestamp} from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import {Navigate, useNavigate} from "react-router-dom";

const categories = [
    { value: 'rescue', label: 'Rescue Mission' },
    { value: 'sabotage', label: 'Sabotage Mission' },
    { value: 'assassinate', label: 'Assassination Mission' },
    { value: 'diplomatic', label: 'Diplomatic Mission' },
]
export default function Create() {
    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [users, setUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const {addDocument, response} = useFirestore('projects')
    const{documents} = useCollection('users')
    const{user} = useAuthContext()
    const navigate = useNavigate();



    useEffect(() => {
        if(documents){
            const options = documents.map(user=> {
                return {value: user, label: user.displayName}
            })
            setUsers(options)
        }
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if(!category ){
            setFormError('Please select a category')
            return
        }
        if(assignedUsers.length < 1){
            setFormError('Please assign the project to at least one user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u)=> {
            return {
                displayName: u.value.displayName,
                photoUrl: u.value.photoUrl,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category:category.value,
            dueDate: timestamp.fromDate(new Date (dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
        }
        await addDocument(project)
        if(!response.error){
            navigate('/')
        }
    }



    return (
        <div className="create-form">
            <h2 className="page-title">Give an Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Order name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Order Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Order category:</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti // can choose multiple users
                    />
                </label>

                <button className="btn">Add Project</button>
                {formError&& <p className="error">{formError}</p> }
            </form>
        </div>
    )
}