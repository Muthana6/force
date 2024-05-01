import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = { // Initial state for the hook
  document: null,   // Current document data
  isPending: false, // Flag to indicate if operation is pending
  error: null,      // Error message if any
  success: null     // Success flag
}

const firestoreReducer = (state, action) => { // Reducer function to manage state transitions
  switch (action.type) {
    case 'IS_PENDING': // Set pending state, clear previous data and error
      return {
        error: null,
        isPending: true,
        document: null,
        success: false,
      };

    case 'ADDED_DOCUMENT': // Set document data and success flag, clear pending and error
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };

    case 'DELETED_DOCUMENT':
      return {isPending: false, document: null, success: true, error: null}

    case 'UPDATED_DOCUMENT':
      return {isPending: false, document: action.payload, success: true, error: null}

    case 'ERROR': // Set error message, clear pending and success
      return {
        isPending: false,
        success: false,
        error: action.payload
      };

    default:
      return state;
  }
}

// Custom hook for interacting with Firestore
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);     // Use reducer to manage state transitions
  const [isCanceled, setIsCanceled] = useState(false);    // State to track if the component is unmounted

  const ref = projectFirestore.collection(collection);    // Firestore collection reference

  const dispatchIfNotCanceled = (action) => {
    // Dispatch action if the component is not canceled
    if (!isCanceled) {
      dispatch(action);
    }
  }

  const addDocument = async (doc) => { // Function to add a document to Firestore

    dispatch({ type: 'IS_PENDING' });  // Dispatch action indicating pending operation

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt}); // Add document to Firestore
      dispatchIfNotCanceled({ type: 'ADDED_DOCUMENT', payload: addedDocument }); // Dispatch action with added document if not canceled

    } catch (err) {
      dispatchIfNotCanceled({ type: 'ERROR', payload: err.message }); // Dispatch error action if not canceled
    }
  }

  // Function to delete a document from Firestore
  const deleteDocument = async (id) => {
    // Implement deletion logic here
    dispatch({type:'IS_PENDING'})
    try {
      await ref.doc(id).delete()
      dispatchIfNotCanceled({type: 'DELETED_DOCUMENT'})
    }catch (err) {
      dispatchIfNotCanceled({ type: 'ERROR', payload: 'Could not delete' }); // Dispatch error action if not canceled
    }
  }

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({type:'IS_PENDING'})
    try {
      // console.log('heere')
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCanceled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
      return updatedDocument
    }catch (err){
      console.log(err)
      dispatchIfNotCanceled({type:'ERROR', payload: err.message})
      return null
    }
  }

  // Effect to handle cleanup when component unmounts
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  // Return addDocument, deleteDocument functions, and response state
  return { addDocument, deleteDocument, response, updateDocument };
}
