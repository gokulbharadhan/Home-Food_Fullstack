import React, { useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';
import axios from "../../../../api/axios";
import { Button } from "@mui/material";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { useAuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const URL1 = "./food/";
const URL2 = "./foodid";

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const URL="./order";
const RecipeDetails = () => {
  const {state} = useLocation();
  // const {item} = state;
  const empid=ApplicationStore().getStorage("userID");
  const [quantity, setQuantity] = useState(1);
  const { AddToCart, getCart, removeToCart,url } = useAuthContext();
  const [recipe, setRecipe] = useState(null);
  const [category,setCategory]=useState("");
  const location = useLocation();
  const foodid = location?.state?.id;

  useEffect(() => {
    if (foodid) {
      loadData();
    }
  }, [foodid]);

  const loadData = async () => {
    try {
      const response = await axios.get(`/${URL1}${foodid}${URL2}`);
      if (response.data.status === 401) {
        setRecipe(null);
      } else {
        setRecipe(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const serviceMethod = async(mainURL,method,data,handleSuccess,handleException)=>{
    
    try{
      const response = await axios.post(mainURL,data);
          return handleSuccess(response.data);
          alert("hello")
    }
    catch(err){
      if(!err?.response){
          console.log("No server response");                
      }else{                
          return handleException(err?.response.data);
      }
    }           
  };
  const updateQuatity = (type) => {
    // console.log(type);
    if(type == "desc"){
      if(quantity == 0){
        alert("quantity cannot be less than 1");
      }else{
        setQuantity(quantity-1);
      }       
    }

    if(type == "inc"){
      setQuantity(quantity+1);
    }
}
  const cartData = (recipe3) => {
   
    const productData = {
       id:recipe3.id,
       name:recipe3.food_item,
       img:recipe3.image,
       price:recipe3.price,
       quantity:quantity,
       total:recipe3.price*quantity
    };

    AddToCart(productData);
     // Retrieve existing cart data from local storage
     const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
     console.log("added");
     // Update existing cart data with the new item
     const updatedCart = [...existingCart, productData];
 
     // Store the updated cart data back into local storage
     localStorage.setItem('cart', JSON.stringify(updatedCart));
     
    console.log(productData.quantity);
    console.log(productData.total);
    console.log(productData.id);
    
    
    const method = "POST";  
    try {        
       console.log(productData);
        const data = {userid:empid,cartList:productData};
        console.log(data);
        alert("product added to cart successfully") ;
        navigate("/Cart");
        const mainURL = URL+'/add';
        serviceMethod(mainURL,method,data, handleSuccess, handleException);
    }
    catch(e){
        console.error(e);
    }


   
  //  console.log(item);
}
const navigate=useNavigate();
const handleSuccess = (data) => {    
  alert("product added to cart successfully") ;
  navigate("/Cart");
}

const handleException = (data) => {
  console.log(data);
}


const removeData = (recipe3) => {
    const productData = {
      id:recipe3.id,
      name:recipe3.food_item,
      img:recipe3.image,
      price:recipe3.price,
      quantity:quantity,
      total:recipe3.price*quantity
    };

    removeToCart(productData);

    console.log("remove to cart");
    alert("successfully removed from cart");
}


  

  return (
    <>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Recipe Details</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recepie_details_area" style={{marginTop:'200px'}}>
        {recipe ? (
          recipe.map((recipe3) => (
            <div className="container" key={recipe3.id} >
              <div className="row align-items-center" style={{marginTop:'-250px'}}>
                <div className="col-xl-6 col-md-6">
                  <div className="recepies_thumb">
                    <img src={`http://localhost:3006${recipe3.image}`} alt="" style={{width:'250px',height:'250px',objectFit:'cover'}} />
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="recepies_info">
                    <h3>{recipe3.food_item}</h3>
                    <p>{recipe3.description}.</p>
                    <p>RS:{recipe3.price}/-</p>
                    <div className="resepies_details">
          <ul>
            <li>
              <p>
                <strong>Price</strong> : ₹ {recipe3.price}
              </p>
            </li>
            {/* <li>
              <p>
                <strong>Rating</strong> :{' '}
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </p>
            </li> */}
            <li>
              <p>
                <strong>Preferred age</strong> : {recipe3.prefer_age}
              </p>
            </li>
            <li>
              <p>
                <strong>Category</strong> : {recipe3.name}
              </p>
            </li>
            <li>
              <p>
                <strong>Food Type</strong> : {recipe3.food_type}
              </p>
            </li>
            <li>
              <p>
                <strong>Chef name</strong> : {recipe3.cheffname}
              </p>
            </li>
          </ul>
        </div>
        <form method="post">
          <div className="buy">
            <input type="hidden" name="food_id" value={recipe3.food_id} />
            <input type="hidden" name="food_name" value={recipe3.food_item} />
            <input type="hidden" name="food_image" value={recipe3.image} />
            <input type="hidden" name="food_price" value={recipe3.price} />
            {/* <button className="genric-btn warning circle" type="submit">
              <i className="bi bi-cart-check-fill"></i> Add to cart
            </button> */}
          </div>
        </form>
        <AmountContainer>
              <Remove  onClick={(e) => {updateQuatity("desc")}} />
              <Amount>{quantity}</Amount>
              <Add onClick={(e) => {updateQuatity("inc")}} />
            </AmountContainer>
              <button type="submit" name="proceed_payment" class="genric-btn primary circle"  onClick={()=>cartData(recipe3)}>ADD CART</button>
            <button type="submit" name="proceed_payment" class="genric-btn primary circle"  onClick={()=>removeData(recipe3)}>REMOVE</button>
                  </div>
                </div>
                
              </div>
           
              </div>
              

              
          
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecipeDetails;
