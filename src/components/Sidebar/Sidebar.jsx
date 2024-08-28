
import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
function Sidebar({ open, logout }) {
    return (
        <div className={`sidebar ${open ? 'active' : ''}`}>
            <div className="logo-details">
                <div>
                  
                </div>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/basic" className="active">
                        <i className="fa-solid fa-table-cells-large"></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                </li>
         
                <li>
                    <Link to="/basic">
                        <i className="fa-solid fa-layer-group"></i>
                        <span className="links_name">basic classification</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Reservations">
                    <i class="fa-solid fa-magnifying-glass"></i>
                        <span className="links_name">Reservations</span>
                    </Link>
                </li>
              


                <li>
                    <Link to="/">
                        <i class="fa-solid fa-house"></i>
                        <span className="links_name">Home</span>
                    </Link>
                </li>
                <li className="" onClick={logout}>
                    <Link to="/login">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span className="links_name">Log out</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar