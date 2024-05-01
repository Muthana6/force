import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

import {useAuthContext} from "./hooks/useAuthContext";

function App() {
    const {user, authIsReady} = useAuthContext()

  return (
      <div className="App">
          {authIsReady && (
            <BrowserRouter>
                {user && <Sidebar/>}
                <div className="container">
                    <Navbar/>

                    <Routes>

                      <Route path="/" element={user?
                          <Dashboard /> : <Navigate to="/login" replace/>} />

                      <Route path="/create" element={user?
                          <Create /> : <Navigate to="/login" replace/> } />

                      <Route path="/projects/:id" element={user?
                          <Project /> : <Navigate to="/login" replace/>} />

                      <Route path="/login" element={!user ?
                          <Login /> : <Navigate to="/" replace/>} />

                      <Route path="/signup" element={!user?
                          <Signup /> : <Navigate to="/" replace/>} />

                    </Routes>
              </div>

              {user && <OnlineUsers/>}
            </BrowserRouter>
          )}
      </div>
  );
}

export default App;
