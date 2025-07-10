import React from "react";
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";


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
              <h1>Dashboard Page - coming soon !</h1>
            </PrivateRoute>
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;