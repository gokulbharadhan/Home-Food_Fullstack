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






const CategoryHome = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'name',
          headerName: 'Name',
          width: 250,
          editable: true,
        },
        {
            field: 'description',
            headerName: 'description',
            width: 250,
            editable: true,
          },
          {
            field: 'color',
            headerName: 'color',
            width: 250,
            editable: true,
          },
        {
          field: 'date',
          headerName: 'Date',
          width: 250,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'status',
          width: 200,
          editable: true,
        },
        
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:250,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        // <EditData selectedRow={params.row}/>,
                        <DeleteData selectedRow={params.row} />,                        
                        // <Block selectedRow={params.row} />
                ];            
            }            
        },    
    ];
   
    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editData, setEditData] = useState([]);
    const [dataList, setDataList] = useState([]);        
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    

    const serviceMethod = async (mainURL,data,handleSuccess,handleException) => {
        try{        

            const response = await axios.delete(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };


    useEffect(() => {
        loadData();        
    },[refreshData]);

    const loadData = async () => {

        try{
             const response = await axios.get( URL ); 
               if(response.data.status == 401){
                   setDataList('');      
               }else{
                   setDataList(response.data.data);
               }
             
         }catch(err){
       
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 
    };
    
    // const EditData = (props) => {
    //     return (
    //         <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
    //             e.stopPropagation();
    //             console.log(props.selectedRow.id);
    //             setEditData(props.selectedRow);
    //             setIsAddButton(false);
    //             setOpen(true);                
    //         }}/>
    //     );
    // }
    
    const DeleteData = (props) => {
        return (
            <DeleteIcon 

                onClick={() => {
                    console.log(props.selectedRow.id);
                    const data = {id:props.selectedRow.id};
                    const mainURL = URL +'/'+data.id+ '/delete';
                    serviceMethod(mainURL,data, handleSuccess, handleException);
                }}
            />
        );
    };

   

    const handleSuccess = (data) => {       
        setOpen(false);        
        setRefreshData((oldValue) => {
            return !oldValue;
        });
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
                                <h3>Category</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="customer_feedback_area pb-5">
                <div className="container">
                    <div className="row justify-content-center mb-50">
                        <div className="col-xl-9">
                            <div className="section_title text-center">
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div class="heading">
                                <h3 class="text-heading">Add category</h3>
                            </div>
                        </div>
                        <div style={{marginTop:'10px', padding:'25px' }}>
            <div className = "topContent">
                <Box sx={{ flexGrow: 1, padding:'10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} >
                           
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ marginTop:'5px', marginLeft: '10px', position: 'relative',  left: '10px',background:'red'}} onClick={(e) => {
                                setIsAddButton(true);
                                setOpen(true);
                                setEditData([]);
                            }} variant="contained"
                           >Add Category</Button>
                        </Grid>                        
                    </Grid>
                </Box>
            </div>
            <div className="GridContent">
                <Box sx={{ position: 'relative', top: '10px', left: '-10px', padding:'0px', height: 400, width: '100%' }} >                    
                    <DataGrid
                        rows={dataList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}                          
                        experimentalFeatures={{ newEditingApi: true }}
                    /> 
                    <Cart
                        isAddButton ={isAddButton}                        
                        setOpen ={setOpen} 
                        open={open}   
                        rowData={editData}        
                        setRefreshData={setRefreshData}        
                    />
                </Box>
            </div>

        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
};

export default CategoryHome;
