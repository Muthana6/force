import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

// Reducer function to manage authentication state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Update state with user information when logged in
      return { ...state, user: action.payload };

    case 'LOGOUT':
      // Clear user information when logged out
      return { ...state, user: null };

    case 'AUTH_IS_READY':
      // Indicate that authentication is ready and set the user
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
}

// Authentication context provider component
export const AuthContextProvider = ({ children }) => {
  // Use reducer to manage authentication state
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Current user information
    authIsReady: false  // Flag to indicate if authentication is ready
  });

  useEffect(() => { // Effect to handle authentication state changes

    // Subscribe to authentication state changes
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user }); // Dispatch action to update state when authentication is ready

      unsubscribe(); // Unsubscribe from further state changes to avoid memory leaks
    });
  }, []);

  // Log the current authentication state for debugging
  console.log('AuthContext state: ', state);

  // Provide the authentication state and dispatch function to children components
  return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
  );
}
