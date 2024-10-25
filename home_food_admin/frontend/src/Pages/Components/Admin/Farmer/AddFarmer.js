import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './farmer';

const AddFarmer = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact,setContact] =useState('');
    const [password, setPassword]=useState('');
    
    useEffect(() => {
        
        if (!isAddButton) {
            setId(rowData.id);
            setName(rowData.name);
            setEmail(rowData.email);
            setContact(rowData.contact);
            setPassword(rowData.password);
          
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
        if (!name || !email || !contact || !password) {
            alert('Please fill out all required fields.');
            return;
          } 
        const method = "POST";
        if(isAddButton){           
            const data = {name,email,contact,password};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,name,email,contact,password};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        // setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        setId(rowData.id );
        // setName(rowData.name ); 

       
    };

    const handleSuccess = (data) => {      
        setId('');
        setName('');
        setEmail('');
        setContact('');
        setPassword('');
        setOpen(false);  
        if(isAddButton){
            alert("succussfully added")
        } else{
            alert("successfully updated")
        }
       
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
                                        value={email}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "email"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setEmail(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={contact}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "contact"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setContact(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={password}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "password"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setPassword(e.target.value)}}
                                        
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
                    setEmail('');
                    setContact('');
                    setPassword('');
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

export default AddFarmer;