import './Signup.css'
import {useState} from "react";
import {useSignup} from "../../hooks/useSignup";

export default function Signup() {
    const [email, setEmail] =  useState('')
    const [password, setPassword] =  useState('')
    const [displayName, setDisplayName] =  useState('')
    const [thumbnail, setThumbnail] =  useState(null)
    const [thumbnailError,setThumbnailError]= useState(null)

    const {signup, isPending, error} = useSignup()

    const handleFileChange = (eventObject) => {
        setThumbnailError(null)
        setThumbnail(null)
        let selected = eventObject.target.files[0]
        console.log(selected)

        if(!selected){
            setThumbnailError('Please select a file')
            return;
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Selected File must be an image')
            return;
        }
        if(selected.size>100000){
            setThumbnailError('image file size must be less than 100kb')
            return;
        }
        setThumbnailError(null)

        setThumbnail(selected)
    }

    const handleSubmit = (eventObject)=> {
        eventObject.preventDefault()
        signup(email, password, displayName, thumbnail)
    }


    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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

            <label>
                <span>Display Name:</span>
                <input type="text"
                       onChange={(event) => setDisplayName(event.target.value)}
                       value={displayName}
                />
            </label>

            <label>
                <span>Profile Thumbnail:</span>
                <input type="file"
                       onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'> {thumbnailError} </div>}
            </label>

            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled >Loading</button>}


            {error && <div className="error"> {error} </div>}

        </form>
    )
}