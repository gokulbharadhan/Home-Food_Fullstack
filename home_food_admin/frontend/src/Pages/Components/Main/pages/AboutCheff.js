import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState,useEffect } from "react";
import { mobile } from "../../../../responsive";
import { Link, Outlet, NavLink } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useAuthContext } from "../../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import ApplicationStore from "../../../../utils/localStorageUtil";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import axios from "../../../../api/axios";
import Cart from "./Cart";
const URL = './category';






const AboutCheff = () => {
    



    return (
        <>
            <Navbar />
            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text text-center">
                                <h3>About Us</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="recepie_header_area">
      <div className="container" style={{marginTop:'-160px'}}>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="recepie_text text-center">
              <h3>Recipes that never <br /> misses any portion</h3>
              <p style={{marginTop:'-30px'}}>
              "<b>Home Feast</b>" is a web application crafted to promote healthier living by providing access to home-cooked meals, offering an alternative to traditional restaurant food. The platform is designed to manage and deliver nutritious food across different communities, catering to modern consumers who value convenience but are mindful of the health implications of regularly consuming restaurant meals.
              This application bridges the gap between customers seeking wholesome, home-prepared dishes and chefs who can offer such meals, thus fostering a community-centric approach to food delivery. Customers can easily browse through a variety of home-cooked meals, place orders, and schedule deliveries at their convenience. The system is designed to accommodate specific needs, such as offering age-appropriate menus and providing recipes for those interested in recreating the dishes themselves.              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

            <Footer />
        </>
    );
};

export default AboutCheff;
