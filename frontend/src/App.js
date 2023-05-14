import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Header from './Header'
import Dashboard from './components/Dashboard'
import ChangePassword from './components/ChangePassword'




const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Routes>
          <Route path='/' element={<Header/>}>
            <Route path='registration' element={<SignUp/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='changePassword' element={<ChangePassword/>}/>
          </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
