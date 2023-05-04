import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Add from './Add'
import Edit from './Edit'
import Login from './Login'
import Signup from './Register'



function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/create' element={<Add />} />
                <Route path='/update/:id' element={<Edit />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter