import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './article';

const AddArticle = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    // const [email, setEmail] = useState('');
    // const [contactname,setContact] =useState('');
    // const [logo, setLogo]=useState('');
    


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
        if (!title || !description || !image) {
            alert('Please fill out all required fields.');
            return;
          }
        const method = "POST";
        if(isAddButton){           
            const data = {title,description,image};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,title,description,image};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        // setId(rowData.id );
        // setName(rowData.name );

       
    };

    const handleSuccess = (data) => {         
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
        setTitle("");
        setDescription("");
        setImage("");

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
                                        value={title}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "title"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        
                                        onChange={(e) => { setTitle(e.target.value)}}
                                        
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
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                            <TextField
                                        fullWidth
                                        
                                        onBlur={() => {
                                        }}
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setImage(e.target.files[0]);
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setImage(reader.result);
                                                    }
                                                }
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
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
                   color="secondary"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                         
                    }} >
                   Cancel 
               </Button> 
               <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit"
                   color="secondary">  {isAddButton ? "Add" : "Update"}
               </Button> 
            </DialogActions> 
            </form>            
    </Dialog>
    );
}

export default AddArticle;