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
import { Description } from "@material-ui/icons";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("flat.jpg")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const FormControlWrapper = styled(FormControl)`
  width: 100%;
  margin: 10px 0;
`;

const InputLabelWrapper = styled(InputLabel)`
  margin-bottom: 10px;
`;

const SelectWrapper = styled(Select)`
  width: 100%;
`;

const TextFieldWrapper = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
  width: 100%;
  background-color: teal;
  color: white;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const URL = "./Product";

const AddProduct = () => {
  const [flat_number, setNumber] = useState('');
  const [productlist, setProductlist] = useState([]);
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [pname, setPname] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [pricetype, setType] = useState('');
  const store= ApplicationStore();
  const empid=store.getStorage('userId');
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
    if (!pname || !description || !image || !price || !pricetype ) {
      alert('Please fill out all required fields.');
      return;
    }
    const method = "POST";
    const data = { pname,description,image,price,pricetype,userid:empid,categoryid:name};
    const mainURL = URL + '/add';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
    
  };

  useEffect(() => {
    loadData();
    
  }, []);

  const loadData = async () => {
    try {
      let URL = './category/';
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setProductlist([]);
      } else {
        setProductlist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
         
      }
    }
  };
  
  const handleSuccess = (data) => {
    alert("submitted");
    setProductlist("");
    setName("");
    setDesc("");
    setPname("");
    setImage("");
    setPrice("");
    setType("");
    
  };

  const handleException = (data) => {
    console.log(data);
  };

  

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          
            <>
              <Title>Add Product</Title>
              <Form>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                <FormControlWrapper>
                  <InputLabelWrapper id="demo-simple-select-label">Choose Category</InputLabelWrapper>
                  <SelectWrapper
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Age"
                    onChange={(e) => {
                        setName(e.target.value);
                        console.log(e.target.value);
                    }}
                  >
                    {productlist.map(category => (
                                            <MenuItem value={category.id}>{category.name}</MenuItem>

                                        ))}
              
                  </SelectWrapper>
                </FormControlWrapper>
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Product Name"
                  required
                  rows={4}
                  value={pname}
                  onChange={(e) => {
                    setPname(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Enter Description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Price"
                  
                  rows={4}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Price Type"
                  
                  rows={4}
                  value={pricetype}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
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
                                    </Grid>
                
                </Grid>
                <Agreement>
                  <b></b>
                </Agreement>
                <ButtonWrapper type="submit" onClick={handleSubmit}>
                  SUBMIT
                </ButtonWrapper>
              </Form>
            </>
          
        </Wrapper>
      </Container>
    </>
  );
};



export default AddProduct;
