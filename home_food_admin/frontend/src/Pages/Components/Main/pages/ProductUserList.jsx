// ProductList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const ProductWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: green; // Add your desired hover styles
  }
`;

const Container = styled.div``;

const BookingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookingCard = styled.div`
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
`;
const URL1="./Product/";
const URL2="./get";
const ProductUserList = ({ category, onSelect }) => {


  const location = useLocation();
  const categoryid = location?.state?.id;


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataList, setDataList] = useState([]);

  const navigate=useNavigate();
  // Fetch or provide a list of products based on the selected category
  
  const handleCategoryClick = (product) => {
    setSelectedCategory(product);
    console.log(product.id);
    navigate("/ProductDetails", { state: { id: product.id ,image:product.image,pname:product.pname,price:product.price} })
    // Do any other logic if needed
  };


  useEffect(() => {
    loadData();        
},[]);

const loadData = async () => {

    try{
      const response = await axios.get(URL1);

      
      
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

  return (
    <Container>
      <Navbar />
      <Announcement />
    <ProductWrapper>
      <h2>{category ? `${category} Products` : 'Select a Product'}</h2>
      <BookingContainer>
        {dataList.map((product) => (
          <BookingCard key={product.id} onClick={() => handleCategoryClick(product)} >
            <img src={"http://localhost:3006" + product.image} alt={product.pname} style={{ width: '300px', height: '200px' }}/>
            <p>{product.pname}</p>
            <p>${product.price}</p>
          </BookingCard>
        ))}
      </BookingContainer>
    </ProductWrapper>
    <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductUserList;
