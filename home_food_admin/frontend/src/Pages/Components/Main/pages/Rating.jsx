import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import axios from "../../../../api/axios";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthContext } from "../../../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./order.css";


const URL = "./Rating";

const Rating = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const empid = ApplicationStore().getStorage("empid");
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const navigate=useNavigate();
    
    const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
        try {
        const response = await axios.post(mainURL, data);
        return handleSuccess(response.data);
        } catch (err) {
        if (!err?.response) {
            console.log("No server response");
        } else {
            return handleException(err?.response.data);
        }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        const data = { name,id,subject,description,rating};
        const mainURL = URL + '/add';
        alert("Rated  successfully");
        navigate("/Orders");
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
        
    };

    const handleSuccess = (data) => {
        console.log(data);
        alert("Rated  successfully");
        window.location.href = '/Orders';
        
    }
    
      const handleException = (data) => {
        console.log(data);
      };


  return (
    <>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Rating</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="sample-text-area">
        <div class="container box_1170">
            <div class="card">
                <div class="card-body">
                    <form onSubmit={handleSubmit} class="row">
                        <div class="col-xl-4 mb-3">
                            <label class="form-label">Customer name<span class="text-danger">*</span></label>
                            <input autocomplete='off' type="text" class="form-control" maxlength="100" required value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div class="col-xl-4 mb-3">
                            <label class="form-label">Subject<span class="text-danger">*</span></label>
                            <input autocomplete='off' type="text" class="form-control" required value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                        </div>
                        <div class="col-xl-4 mb-3">
                            <label class="form-label">Rating(1 to 5)<span class="text-danger">*</span></label>
                            <input autocomplete='off' type="text" class="form-control" pattern="[1-5]" required value={rating} onChange={(e) => { setRating(e.target.value) }} />
                        </div>
                        <div class="col-xl-12 mb-3">
                            <label class="form-label">Description<span class="text-danger">*</span></label>
                            <input autocomplete='off' type="textarea" class="form-control" required value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <div>
                            <button type="submit" class="genric-btn info radius">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
      


      <Footer/>
    </>
  );
};



export default Rating;
