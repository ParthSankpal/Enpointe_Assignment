import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import UserRegister from './pages/UserRegister';
import UserSignIn from './pages/UserSignIn';
import PrivateRoute from './Components/PrivateRoute';
import UserTransaction from './pages/UserTransaction';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
       <Route path="/usersign-up" element={<UserRegister />} />
       <Route path="/usersign-in" element={<UserSignIn />} />
       <Route element={<PrivateRoute />}>

        <Route path='/transactions' element={<UserTransaction/>} />

       </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App