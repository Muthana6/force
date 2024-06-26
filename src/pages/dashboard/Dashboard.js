import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import './Dashboard.css'
import ProjectFilter from "./ProjectFilter";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";

export default function Dashboard() {
    const { documents, error } = useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')

    const{user} = useAuthContext()

    const projects = documents? documents.filter((document)=> {
        switch (currentFilter){
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u)=>{
                    if(user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe

            case 'rescue':
            case 'sabotage':
            case 'assassinate':
            case 'diplomatic':
                return document.category === currentFilter;
            default:
                return true
        }
    }) : null

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}

            {projects &&
                <ProjectFilter changeFilter={changeFilter}
                               currentFilter={currentFilter} />}

            {projects &&
                <ProjectList projects={projects} />}
        </div>
    )
}