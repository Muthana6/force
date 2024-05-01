import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "./useAuthContext";
import {projectAuth, projectFirestore} from "../firebase/config";


// POSSIBLE SOLUTIONS TO CLEANUP IS TO IMPORT 'USE EFFECT' FOR PRODUCTION? NEED TO BE TESTED
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const isMounted = useRef(true);  // Using ref to track the mounted state

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error('Could not complete login');
      }

      // update online status
      await projectFirestore.collection('users')
          .doc(res.user.uid).update({online: true})

      dispatch({type: 'LOGIN', payload: res.user});

      if (isMounted.current) {  // Check if the component is still mounted
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { login, error, isPending };
};
