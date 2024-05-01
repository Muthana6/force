import {useEffect, useState} from "react";
import {projectAuth, projectFirestore, projectStorage} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

export const useSignup = ()=> {
  const [isCanceled, setIsCanceled] = useState(false) // for cleanup function
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthContext()

  const signup = async (email, password, displayName, thumbnail)=> {
    setError(null)
    setIsPending(true)

    try {
      // create a user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      console.log(res.user)

      if(!res) { // if respond was not sent
        throw new Error('could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}` // set path
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoUrl: imgUrl
      })

      //  add display name
      await res.user.updateProfile({displayName: displayName, photoURL: imgUrl})

      // dispatch login action
      dispatch({type: 'LOGIN', payload: res.user})

      // update state
      if(!isCanceled){
        setIsPending(false)
        setError(null)
      }

    } catch (err){
      console.log(err.message)
      if(!isCanceled){
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  // cleanup function is always used inside useEffect
  useEffect(() => {
    return ()=> setIsCanceled(true)
  }, []);
  return {error, isPending, signup}
}