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
  margin: 20px;
`;

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const BookingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const BookingCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardPrice = styled.p`
  font-size: 16px;
  color: #555;
`;
const URL1="./Product/";
const URL2="./get";
const ProductList = ({ category, onSelect }) => {
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
},[categoryid]);

const loadData = async () => {

    try{
      const response = await axios.get(`/${URL1}${categoryid}${URL2}`);

      
      
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
        <Heading>{category ? `${category} Products` : 'Select a Product'}</Heading>
        <BookingContainer>
          {dataList.map((product) => (
            <BookingCard key={product.id} onClick={() => handleCategoryClick(product)}>
              <CardImage src={"http://localhost:3006" + product.image} alt={product.pname} />
              <CardContent>
                <CardTitle>{product.pname}</CardTitle>
                <CardPrice>${product.price}</CardPrice>
              </CardContent>
            </BookingCard>
          ))}
        </BookingContainer>
      </ProductWrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;

