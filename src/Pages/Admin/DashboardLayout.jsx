import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Css.css'
import Sidebar from '../../components/Sidebar/Sidebar';
function DashboardLayout({logout,loginData}) {


    const [open, setOpen] = useState(true)

    return (
        <>
            <div style={{ direction: 'ltr', display: 'flex' }}>
                <Sidebar open={open} logout={logout}/>
                <section className="home-section">
                    <nav>
                        <div className="sidebar-button">
                            <i className="fa-solid fa-bars sidebarBtn" onClick={() => setOpen(prev => !prev)}></i>
                            <span className="dashboard">Dashboard</span>
                        </div>
                     
                        <div className="profile-details">
                           
                            <span className="admin_name">HELLO</span>
                            <i className="bx bx-chevron-down" />
                        </div>
                    </nav>

                    <Outlet />

                    <div>

                    </div>
                </section>
            </div>

        </>

    )
}

export default DashboardLayout
