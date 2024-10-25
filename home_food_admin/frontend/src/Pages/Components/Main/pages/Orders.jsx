import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { styled } from '@mui/material/styles';
import { Button, Stepper, Step, StepLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link } from 'react-router-dom';
import { keyframes } from "@mui/material";
import axios from "../../../../api/axios";
import { Cancel } from "@mui/icons-material";
import ApplicationStore from "../../../../utils/localStorageUtil";
import Footer from "../components/Footer";
import { useAuthContext } from "../../../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./order.css";
const URL = "./order";
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
const Orders = () => {
  const empid = ApplicationStore().getStorage("empid");
  const [dataList, setDataList] = useState([]);
  const [cancel, setCancel] = useState(false);
  const { url } = useAuthContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(`${URL}/${empid}`);
      if (response.data.status === 401) {
        setDataList([]);
      } else {
        setDataList(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      try {
        const data = { action: 'Canceled' };
        const mainURL = `${URL}/${selectedOrderId}/upgradeuser`;
        await axios.post(mainURL, data);
        loadData();
        alert("Order has been canceled successfully!");
        setCancel(true);
      } catch (err) {
        console.log(err?.response ? err.response.data : "No server response");
      }
    }
  };

  const getOrderStep = (status) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Confirmed":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const steps = ["Ordered", "Confirmed", "Delivered"];
  const extractDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format date as per locale
  };

  const calculateRemainingTime = (orderDate) => {
    const orderTime = new Date(orderDate);
    const currentTime = new Date();
    const timeDifference = 120 - (currentTime - orderTime) / 1000; // difference in seconds
    return timeDifference > 0 ? timeDifference : 0;
  };

  const checkIfCancellable = (orderDate) => {
    return calculateRemainingTime(orderDate) > 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const OrderCard = ({ item }) => {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(item.orderDate));

    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime(item.orderDate));
      }, 1000);
      
      return () => clearInterval(interval); // cleanup
    }, [item.orderDate]);

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
              <img src={url + item.image} alt="Product Image" className="img-fluid" />
            </div>
            <div className="col-md-5">
              <p className="product-name">{item.food_item}</p>
              <p>Order No: {item.orderno}</p>
            </div>
            <div className="col-md-2">
              <p className="product-price">₹ {item.price}</p>
            </div>
           
            <div className="col-md-3" style={{display:'flex',flexDirection:'column'}}>
              <p className="delivery-status">Ordered on {extractDate(item.orderDate)}</p>
                {/* Order Status Tracker */}
                {item.orderStatus!=="Canceled" && <Stepper
      activeStep={getOrderStep(item.orderStatus)}
      alternativeLabel
      sx={{ width: '100%',ml:'-15px' }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel
            sx={{
              '& .MuiStepIcon-root': {
                fontSize: '1.2rem', // Reduce the size of the Step icon here
                animation: (theme) => (index === getOrderStep(item.orderStatus)
                  ? `${pulse} 1s infinite`
                  : 'none' // Animate only the active non-tick icon
                ),
                transition: 'color 0.3s ease-in-out', // Smooth color transition
              },
              '& .Mui-active .MuiStepIcon-root': {
                color: 'blue', // Change color when active
              },
              '& .Mui-completed .MuiStepIcon-root': {
                color: 'green', // Change color when step is completed (tick icon)
                animation: 'none', // Stop the animation for completed steps
              },
              '& .MuiStepLabel-label': {
    fontSize: '0.8rem', // Adjust label text size
  },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>}
              {item.orderStatus === "Pending" ? (
                <p className="delivery-tag">Your order is <b style={{color:'black'}}>pending....</b></p>
              ) : (
                <p className="delivery-tag">Your order has been <b style={{color:'black'}}>{item.orderStatus}</b></p>
              )}
               {item.orderStatus!=="Canceled" && remainingTime > 0 ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Cancel />}
              onClick={() => handleCancelClick(item.id)} // Use the new handleCancelClick
              style={{ marginLeft: '10px' }}
            >
              Cancel Order
            </Button>
            <p>Cancel within: {formatTime(remainingTime)} minutes</p>
          </>
        ) : (
          !cancel && item.orderStatus!=="Canceled" && <p>Order cancellation period expired</p>
        )}
            {!cancel && item.orderStatus!=="Canceled" &&
              <Link to={`/Rating?id=${item.id}`} className="rate-button">
                Rate and Review This Product
              </Link>
            }  
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Orders</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="sample-text-area">
  <div className="container box_1170">
    {dataList
      .slice() // Create a shallow copy to avoid mutating the original array
      .sort((a, b) => b.id - a.id) // Sort by 'id' in descending order
      .map((item, index) => (
        <OrderCard key={index} item={item} />
      ))}
  </div>
</section>
      <Footer />
      
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Orders;
