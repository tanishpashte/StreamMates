import React from "react";
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Dashboard = () => {
  const {state} = useContext(AuthContext);

  if(!state.user){
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {state.user.username}!</p>
      <p>Your email is: {state.user.email}</p>
    </div>
  );
};

function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          {/* Protected route */}
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;