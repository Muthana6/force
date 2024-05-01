import {useEffect, useRef, useState} from "react";
import {projectFirestore} from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments]= useState(null)
  const [error, setError] = useState(null)

  const query = useRef(_query).current  // _query is an array and different in every call, that is why using useRef
  const orderBy = useRef(_orderBy).current // _orderBy is an array and different in every call, that is why using useRef

  useEffect(() => {
    let ref = projectFirestore.collection(collection)
    if(query){
      ref = ref.where(...query)
    }
    if(orderBy){
      ref = ref.orderBy(...orderBy)
    }

    const unsub = ref.onSnapshot((snapshot)=> {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      })
      // update state
      setDocuments(results)
      setError(null)
    }, (error)=> {
      console.log(error)
      setError('couldnt fetch the data')
    })
    //cleanup
    return ()=> unsub()
  }, [collection, query, orderBy]);

  return {documents, error}
}