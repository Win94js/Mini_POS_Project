import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet, NavLink } from 'react-router-dom';
import UserPermissionsPanel from "../UserPermissionsPanel/UserPermissionsPanel";


export const AdminDashBoard = () =>{
    return(
        <div>
            <h1>Admin DashBoard</h1>
            
            <nav>
            <NavLink to='/login'>Login Page</NavLink>
              <NavLink to='/dashboard/user-permissions'>User Management </NavLink> 
            <NavLink to='/dashboard/create-account'>Create Other Accounts</NavLink>    
            
            
                
            </nav> 
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

