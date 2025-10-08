import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
// import { Route, Router } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Report from './pages/Report'
import ResourcePage from "./pages/ResourcePage";



function App() {

  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/report" element={<Report />} />
            <Route path="/resourcelist" element={<ResourcePage />} />
        </Routes>
   
    </Router>
  )
}

export default App
