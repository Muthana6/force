import {useEffect, useState} from "react";
import {useAuthContext} from "./useAuthContext";
import {projectAuth, projectFirestore} from "../firebase/config";

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false) // for cleanup function
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch, user} = useAuthContext()

  const logout = async ()=> {
    setError(null)
    setIsPending(true)

    try {
      // update online status
      const {uid} = user
      await projectFirestore.collection('users').doc(uid).update({online: false})

      await projectAuth.signOut() // sign user out

      dispatch({type: 'LOGOUT'})  // dispatch logout action

      // update state
      if(!isCanceled){
        setIsPending(false)
        setError(null)
      }

    }catch (err){
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
  return {logout, error, isPending}
}