import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import UserRegister from './pages/UserRegister';
import UserSignIn from './pages/UserSignIn';
import PrivateRoute from './Components/PrivateRoute';
import UserTransaction from './pages/UserTransaction';
import Footer from './Components/Footer';
import BankersignIn from './pages/BankersignIn';
import Home from './pages/Home';
import BankerDash from './pages/BankerDash';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-grow">
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path="/usersign-up" element={<UserRegister />} />
            <Route path="/usersign-in" element={<UserSignIn />} />
            <Route path='/bankersign-in' element={<BankersignIn />} />
            <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile/>} />
              <Route path='/transactions' element={<UserTransaction/>} />
              <Route path='/bankerdash' element={<BankerDash/>} />
            </Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
