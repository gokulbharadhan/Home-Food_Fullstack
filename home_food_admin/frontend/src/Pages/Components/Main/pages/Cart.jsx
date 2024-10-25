import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../../../../responsive";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Newsletter from "../components/Newsletter";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { useAuthContext } from "../../../../context/AuthContext";
import AuthForm from "../../Login/AuthForm";
import axios from "../../../../api/axios";
import "./style.css";
import { Button } from "@mui/material";

const URL = './checkout';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Cart = () => {
  const empid = ApplicationStore().getStorage("empid");
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const applicationStore = ApplicationStore();
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [service, setService] = useState(0);
  const [open, setOPen] = useState(false);
  const [refesh, setRefreshData] = useState(false);
  const { url, removeToCart } = useAuthContext();

  useEffect(() => {   
    console.log("hello");
    loadData();  
  }, []);

  const loadData = async () => {
    try {
      const cart = await applicationStore.getStorage('cart');
      if (cart && Array.isArray(cart)) {
        setCartData(cart);
        calculateSubTotal(cart);
      } else {
        console.error('Invalid cart data:', cart);
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  const calculateSubTotal = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach(item => {
        total += item.total;
      });
    }
    setTotal(total);

    let serviceCharge = total * 0.07;
    serviceCharge = (serviceCharge % 1 >= 0.5) ? Math.ceil(serviceCharge) : Math.floor(serviceCharge);
    setService(serviceCharge);

    let percentage = total * 0.05;
    percentage = (percentage % 1 >= 0.5) ? Math.ceil(percentage) : Math.floor(percentage);
    setGst(percentage);

    let finalTotal = total + percentage + serviceCharge;
    finalTotal = (finalTotal % 1 >= 0.5) ? Math.ceil(finalTotal) : Math.floor(finalTotal);
    
    setSubTotal(finalTotal);
  };

  const updateProduct = (index, type) => {
    const updatedCart = [...cartData];
    if (type === "add") {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart[index].quantity = Math.max(0, updatedCart[index].quantity - 1);
    }
    updatedCart[index].total = updatedCart[index].quantity * updatedCart[index].price;
    setCartData(updatedCart);
    applicationStore.setStorage('cart', updatedCart);
    calculateSubTotal(updatedCart);
  };

  const handleRemove = (item) => {
    removeToCart(item);
    const updatedCart = cartData.filter(cartItem => cartItem.id !== item.id);
    setCartData(updatedCart);
    calculateSubTotal(updatedCart);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const cart = applicationStore.getStorage('cart');
  //   const method = "POST";  
  //   try {        
  //     const data = { userid: empid, cartList: cart };
  //     const mainURL = URL + '/add';
  //     serviceMethod(mainURL, method, data, handleSuccess, handleException);
  //   } catch (e) {
  //     console.error(e);
  //   } 
  // };

  const handleSuccess = (data) => {       
    console.log("data");
  };

  const handleException = (data) => {
    console.log(data);
  };

  const navigateTo = () => {
    if (!empid) {
      setOPen(true);
    } else {
      setOPen(false);
      navigate(`/payment?amt=${subTotal}`);
    }
  };

  return (
    <Container>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Cart</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wrapper>
        <Bottom>
          <Info>
            {cartData.length > 0 ? cartData.map((item, index) => (
              <div key={item.id} className="card mb-3 cart-product">
                <div className="row g-0">
                  <div className="col-md-2">
                    {item.img && (
                      <img src={url + item.img} className="img-fluid product-image" alt={item.name} />
                    )}
                  </div>
                  <div className="col-md-10 pl-4">
                    <div className="row card-body product-details">
                      <div className="col-md-8">
                        <h5 className="card-title">Product: {item.name}</h5>
                        <div className="d-flex quantity-control">
                          <button className="btn btn-sm btn-primary primary-border circle me-2" onClick={() => updateProduct(index, "sub")}>-</button>
                          <p className="m-0">{item.quantity}</p>
                          <button className="btn btn-sm btn-primary primary-border circle ms-2" onClick={() => updateProduct(index, "add")}>+</button>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <p className="card-text product-price">Price: ₹{item.price}</p>
                        <p className="card-text">Total: ₹{item.total}</p>
                        <Button onClick={() => handleRemove(item)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <p>Your cart is empty</p>
            )}
          </Info>
          <div className="card ml-3">
            <div className="card-body">
              {cartData.length > 0 && (
                <div>
                  <h5 className="card-title">ORDER SUMMARY</h5>
                  <div className="d-flex justify-content-between">
                    <p>Price :</p>
                    <p>₹{total}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>5% GST :</p>
                    <p>₹{gst}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>7% Service Charge :</p>
                    <p>₹{service}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Subtotal:</p>
                    <p>₹{subTotal}</p>
                  </div>
                  <button className="btn btn-primary w-100 mt-3" onClick={navigateTo}>
                    CHECKOUT NOW
                  </button>
                </div>
              )}
            </div>
          </div>
        </Bottom>
      </Wrapper>
      <AuthForm
        setOpen={setOPen}
        open={open}
        setRefreshData={setRefreshData}
      />
      <Footer />
    </Container>
  );
};

export default Cart;
