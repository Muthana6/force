
import './Dashboard.css'

// const filterList = ['all', 'mine','rescue', 'sabotage', 'assassinate','diplomatic']

const filterList = [
    { value: 'all', label: 'All Missions' },
    { value: 'mine', label: 'My Missions' },
    { value: 'rescue', label: 'Rescue Mission' },
    { value: 'sabotage', label: 'Sabotage Mission' },
    { value: 'assassinate', label: 'Assassination Mission' },
    { value: 'diplomatic', label: 'Diplomatic Mission' }
]

export default function ProjectFilter({currentFilter, changeFilter}) {

    const handleClick = (newFilter)=> {
        changeFilter(newFilter)
    }


    return (
        <div className="project-filter">
            <nav>
                <p>Filter by: </p>
                {filterList.map((f) => (
                    <button key={f.value}
                            onClick={() => handleClick(f.value)}
                            className={currentFilter === f.value ? 'active' : ''}
                    >{f.label}
                    </button>
                ))}
            </nav>
        </div>
    )
}