import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from './components/Nav/Nav';
import FooterNav from './components/FooterNav/FooterNav';
import Home from './components/Home/Home';
import MenuList from './components/Sale/MenuList/MenuList';
import ListOrder from './components/Sale/OrderList/ListOrder';
import ListOrders from './components/Sale/OrderList/ListOrders';
import CreateBill from './components/Sale/Bill/Bill';
import Table from './components/Sale/Table/Table';
import { AdminDashBoard } from './components/DashBoard/AdminDashBoard/AdminDashBoard';
import UserPermissionsPanel from './components/DashBoard/UserPermissionsPanel/UserPermissionsPanel';
import Login from '../src/components/Auth/LoginPage';
import CreateAccount from './components/DashBoard/CreateAnotherAcc/CreateAnotherAcc';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Top Nav */}
        <Routes>
          {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<AdminDashBoard/>}>
        <Route path='/dashboard/user-permissions' element={<UserPermissionsPanel/>}/>
        <Route path="/dashboard/create-account" element={<CreateAccount />} />    
        </Route>
       
        
        <Route path='*'
          element={
            <>
          <Nav />

        {/* Main Content */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/menu" element={<MenuList />} />
            <Route path="/orderList" element={<ListOrder />} />
            <Route path="/orderLists" element={<ListOrders />} />
            <Route path="/createBill" element={<CreateBill />} />
            <Route path="/tableLists" element={<Table />} />
            
            </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>

        {/* Bottom Footer Navigation */}
        <FooterNav />
        </>
        }/> 
      </Routes>
      </div>
    </Router>
  );
}

export default App;
