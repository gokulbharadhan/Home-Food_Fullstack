import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "../sidebar/Sidebar";
import axios from "../../../api/axios";

const Dashboard = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [userList, setUserList] = useState([]);
  const [chefList, setChefList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    loadData();        
  }, [refreshData]);

  const loadData = async () => {
    try {
      const categoryURL = './category/';
      const userURL = './userRegister/';
      const chefURL = './farmer/';
      const orderURL = './order/';
      
      // Fetch Users
      const userResponse = await axios.get(userURL); 
      setUserList(userResponse.data?.data || []);

      // Fetch Chefs
      const chefResponse = await axios.get(chefURL); 
      setChefList(chefResponse.data?.data || []);

      // Fetch Categories
      const categoryResponse = await axios.get(categoryURL); 
      setCategoryList(categoryResponse.data?.data || []);

      // Fetch Orders
      const orderResponse = await axios.get(orderURL); 
      setOrderList(orderResponse.data?.data || []);
      
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  return (
    <div className="dashboard-container" style={{height: '300px'}}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/charts">Charts</a>
          </li>
          <li>
            <a href="/progress">Progress</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="app-bar">
          <h1>Dashboard</h1>
        </div>

        <div className="main-content">
          {/* Cards for different sections */}
          <div className="card">
            <h2>CHEFS</h2>
            <p>No of Chefs: {chefList.length}</p>
          </div>

          <div className="card">
            <h2>CATEGORIES</h2>
            <p>No of Categories: {categoryList.length}</p>
          </div>

          <div className="card">
            <h2>ORDERS</h2>
            <p>No of Orders: {orderList.length}</p>
          </div>

          <div className="card">
            <h2>USERS</h2>
            <p>No of Users: {userList.length}</p>
          </div>

          {/* Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
