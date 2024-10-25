

import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import axios from "../../../../api/axios";

const URL = './userRegister';



const ViewUser = () => {    

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'name',
          headerName: 'Name',
          width: 250,
          editable: true,
        },
        {
            field: 'email',
            headerName: 'email',
            width: 250,
            editable: true,
          },
        {
          field: 'contact',
          headerName: 'contact',
          width: 250,
          editable: true,
        },
        {
          field: 'date',
          headerName: 'date',
          width: 200,
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


    return  (
        <div style={{marginTop:'10px', padding:'25px' }}>
            
            <div className="GridContent">
                <Box sx={{ position: 'relative', top: '10px', left: '-80px', padding:'0px', height: 400, width: '100%' }} >                    
                    <DataGrid
                        rows={dataList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}                          
                        experimentalFeatures={{ newEditingApi: true }}
                    /> 
                    
                </Box>
            </div>

        </div>
    );
}

export default ViewUser;