import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
import ApplicationStore from "../../../../utils/localStorageUtil";

const URL = './food';

const AddFood = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    const [id, setId] = useState('');
    const [food_item, setFood_item] = useState('');
    const [description, setDescription] = useState('');
    const [prefer_age, setPrefer_age] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [food_type, setType] = useState('');
    const [category_name, setCategory_name] = useState('');
    const [categorylist, setCategorylist] = useState([]);
    const store = ApplicationStore();
    const chef_id = store.getStorage('userId');
    useEffect(() => {
        // Update state with rowData when isAddButton is false (edit mode)
        if (!isAddButton) {
            setId(rowData.id);
            setFood_item(rowData.food_item);
            setDescription(rowData.description);
            setPrefer_age(rowData.prefer_age);
            setPrice(rowData.price);
            setImage(rowData.image);
            setType(rowData.food_type);
            setCategory_name(rowData.category_id); // Assuming `category_id` is present in rowData
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
        if ( !description ) {
            alert('Please fill out all required fields.');
            return;
          }   
        const method = "POST";
        if(isAddButton){           
            const data = {prefer_age,food_item,category_id:category_name,price,description,image,food_type,chef_id};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,prefer_age,food_item,category_id:category_name,price,description,image,food_type};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    
    useEffect(() => {
        loadData();
    },[]);
  
    const loadData = async() => {
        try{
            let URL='./category/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setCategorylist('');      
            }else{
                setCategorylist(response.data.data);
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
                    setFood_item('');
                    setDescription('');
                    setPrefer_age('');
                    setPrice('');
                    setImage('');
                    setType('');
                    setCategory_name('');        
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
                {isAddButton ? "Add Food" : "Edit Food"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={food_item}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Food item"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setFood_item(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={price}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Price"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setPrice(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={prefer_age}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Prefer Age"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setPrefer_age(e.target.value)}}
                                        
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
              <Select
              size="small"
              color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category_name}
                label="Category name"
                onChange={(e) => setCategory_name(e.target.value)}
                style={{ textAlign: 'left' }}
              >
                {categorylist.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                            <TextField
                                        fullWidth
                                        size="small"
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
                        <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={description}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Description"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e) => { setDescription(e.target.value)}}
                                        
                                    />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
              <Select
  fullWidth
  size="small"
  color="secondary"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={food_type}
  label="Product status"
  onChange={(e) => setType(e.target.value)}
  style={{ textAlign: 'left' }}
>
  <MenuItem value="veg">Veg</MenuItem>
  <MenuItem value="non-veg">Non-Veg</MenuItem>
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
                    setFood_item('');
                    setDescription('');
                    setPrefer_age('');
                    setPrice('');
                    setImage('');
                    setType('');
                    setCategory_name('');
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

export default AddFood;