import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';


function MainLayout({loginData,handleLogout,basic}) {
  return (
<>
      <Navbar   loginData={loginData} logout={handleLogout} basic={basic}/>
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout