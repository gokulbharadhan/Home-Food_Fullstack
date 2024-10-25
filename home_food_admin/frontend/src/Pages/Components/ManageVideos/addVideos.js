import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid, Menu } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
import ApplicationStore from "../../../utils/localStorageUtil";
const URL = './Videos';

const AddVideo = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [product_id,setProductId]=useState('');
    const [food, setFood] = useState([]);
    const store=ApplicationStore();
    const chef_id=store.getStorage('userId');
    useEffect(() => {
        
        if (!isAddButton) {
            setId(rowData.id);
            setTitle(rowData.title);
            setDescription(rowData.description);
            setLink(rowData.link);
          
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
                return handleException(err);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( !description ) {
            alert('Please fill out all required fields.');
            return;
          }   
        const method = "POST";
        if(isAddButton){           
            const data = {title,link,description,chef_id,product_id};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,title,link,description};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    
    useEffect(() => {
        loadData();
    },[]);
  
    const loadData = async() => {
        try{
            let URL='./food/'+chef_id+'/get';

            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setFood('');      
            }else{
                setFood(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 
       
    };

    const handleSuccess = (data) => { 
        setId('');
        setTitle('');
        setDescription('');
        setLink('');        
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const handleException = (data) => {
        alert(data);
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
                {isAddButton ? "Add Video" : "Edit Video"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={title}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Enter the Title"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setTitle(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={link}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Paste the link"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setLink(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={description}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "description"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="large"
                                        onChange={(e) => { setDescription(e.target.value)}}
                                        
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select the item</InputLabel>
              <Select
              size="small"
              color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product_id}
                label="Category name"
                onChange={(e) => setProductId(e.target.value)}
                style={{ textAlign: 'left' }}
              >
                <MenuItem value="">None</MenuItem>
                {food.map((foods) => (
                  <MenuItem value={foods.id}>{foods.food_item}</MenuItem>
                ))}
              </Select>
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
                    setId('');
            setTitle('');
            setDescription('');
            setLink('');
          
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

export default AddVideo;