// ProductDetails.js
import React from 'react';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ApplicationStore from '../../../../utils/localStorageUtil';
import { Button } from '@mui/material';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const DetailsWrapper = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div``;

const BookingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookingCard = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: left;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ProductImage = styled.img`
  width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const BuyButton = styled(Button)`
  background-color: #28a745;
  color: #fff;
`;


const URL1="./Product/";
const URL2="./add";
const URL3="./purchase";
const ProductDetails = ({ product }) => {
    const location = useLocation();
  const id = location?.state?.id;
  const image = location?.state?.image;
//   const name = location?.state?.name;
  const price = location?.state?.price;
//   const id = location?.state?.id;


const empid= ApplicationStore().getStorage("empid");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataList, setDataList] = useState([]);

  const navigate=useNavigate();
  // Fetch or provide a list of products based on the selected category
  
  const handleCategoryClick = (product) => {
    setSelectedCategory(product);
    console.log(product.id);
    // navigate("/ProductDetails")
    // Do any other logic if needed
  };
  // Check if the product is defined
  

  useEffect(() => {
    console.log("id:", id);
    console.log("product:", product);
  
    
  
    // console.log(`/${URL1}${id}${URL2}`);
    loadData();
  }, [id]);

const loadData = async () => {

    try{
      const response = await axios.get(`/${URL1}${id}${URL2}`);

      console.log(URL1);
      
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
const handleSubmit=(e)=>{
  e.preventDefault();
  const method = "POST";
  const data = {userid:empid,productid:id,price:price};
  const mainURL = URL3+'/add';
  serviceMethod(mainURL,method,data, handleSuccess, handleException);
  

}

const handleSuccess = (data) => {         
  alert("Your Request sent Successfully");
  navigate("/CustHome");
}

const handleException = (data) => {
  console.log(data);
}

return (
  <Container>
    <Navbar />
    <Announcement />
    <div className="flat-booking">
      <h2>Product Information</h2>
      {dataList.length === 0 ? (
        <p>No post available</p>
      ) : (
        <BookingContainer>
          {dataList.map((product) => (
            <BookingCard key={product.id} onClick={() => handleCategoryClick(product)}>
              <ProductImage src={"http://localhost:3006" + product.image} alt={product.pname} />
              <ProductInfo>
                <ProductName>{product.pname}</ProductName>
                <ProductPrice>RS.{product.price}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
                <BuyButton variant="contained" onClick={handleSubmit}>
                  Buy now
                </BuyButton>
              </ProductInfo>
            </BookingCard>
          ))}
        </BookingContainer>
      )}
    </div>
    <Newsletter />
    <Footer />
  </Container>
);
};

export default ProductDetails;