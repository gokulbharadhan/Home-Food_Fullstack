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

const ContactCheff = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [subject,setSubject]=useState('');
  const [message,setMessage]=useState('');
  const empid = ApplicationStore().getStorage("empid");
  useEffect(() => {   
    loadData();
  },[]);
  const loadData = async () => {  
      try{
            const response = await axios.get('auth/getUserById',{
              headers: {'Content-Type':'application/json', "empid":empid },          
           }); 
              if(response.data.status == 401){    
              }else{
                setName(response.data.data[0].name);
                setEmail(response.data.data[0].email);
              }
            
        }catch(err){    
          if(!err?.response){
              console.log("No server response");
          }else{
                console.log(err?.response.data);
          }
      }    
 };
 const serviceMethod = async(mainURL,data,handleSuccess,handleException)=>{
  try{
    const response = await axios.post(mainURL,data);
        return handleSuccess(response.data);
  }
  catch(err){
    if(!err?.response){
        console.log("No server response");                
    }else{                
        return handleException(err?.response.data);
    }
}           
};
 const HandleSubmit=(e)=>{
  e.preventDefault();
  try {      
      const data = { email,name,message,subject,userid:empid };
      const mainURL = 'Contact/contact';
      serviceMethod(mainURL, data, handleSuccess, handleException);
  } catch (e) {
      alert("error");
  }
 }
 const handleSuccess = (data) => {       
  setMessage('');
  setSubject('');
  alert("Feedback have been sent successfully");
}

const handleException = (data) => {
  console.log(data);
  
}

    return (
        <>
            <Navbar />
            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text text-center">
                                <h3>Contact Us</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="contact-section section_padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Get in Touch</h2>
          </div>
          <div className="col-lg-8">
            <form className="form-contact contact_form" method="post" onSubmit={HandleSubmit}>
              <div className="row">
              <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="subject"
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e)=>setSubject(e.target.value)}
                      placeholder="Enter Subject"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control w-100"
                      name="message"
                      id="message"
                      cols="30"
                      rows="9"
                      placeholder="Enter Message"
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
               
                
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  name="add_submit"
                  className="button button-contactForm btn_4 boxed-btn"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-home"></i>
              </span>
              <div className="media-body">
                <h3>Mumbai, India.</h3>
                <p>Rosemead, AD 12345</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-tablet"></i>
              </span>
              <div className="media-body">
                <h3>12 (345) 6789 012</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-email"></i>
              </span>
              <div className="media-body">
                <h3>support@qwerty.com</h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

            <Footer />
        </>
    );
};

export default ContactCheff;
