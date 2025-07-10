import React from "react";
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          <Route path='/dashboard' element={<p>Dashboard Page - coming soon !</p>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;