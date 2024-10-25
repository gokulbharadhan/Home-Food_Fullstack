import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './category';

const AddCat = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
 
    useEffect(() => {
        
        if (!isAddButton) {
            setId(rowData.id);
            setName(rowData.name);
            setDescription(rowData.description);
          
        }
    }, [isAddButton, rowData]);



    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description ) {
            alert('Please fill out all required fields.');
            return;
          }   
        const method = "POST";
        if(isAddButton){           
            const data = {name,description};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,name,description};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        setId(rowData.id );
        // setName(rowData.name );

       
    };

    const handleSuccess = (data) => {    
        setId('');
        setName('');
        setDescription('');     
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const handleException = (data) => {
        console.log(data);
    }

    return (
        <Dialog
            
            maxWidth = ""
            sx = {{'& .MuiDialog-paper':{width: '30%', maxHeight: '100%' }}
            }
            open={open}
        >

          <form onSubmit={handleSubmit} >
            <DialogTitle>
                {isAddButton ? "Add Category" : "Edit Category"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={name}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Name"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        
                                        onChange={(e) => { setName(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={description}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "description"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        
                                        onChange={(e) => { setDescription(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                    </Grid>
                </Grid>                  
                                  
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "large"
                   variant = "outlined"
                   sx={{ color: '#226B80', borderColor: '#226B80'}}
                   autoFocus 
                   onClick={(e)=>{
                    setId('');
                    setName('');
                    setDescription('');
                  
                          setOpen(false);
                         
                    }} >
                   Cancel 
               </Button> 
               <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit"
                   sx={{ color: '#ffffff', borderColor: '#226B80',backgroundColor:'#226B80'}}>  {isAddButton ? "Add" : "Update"}
               </Button> 
            </DialogActions> 
            </form>            
    </Dialog>
    );
}

export default AddCat;