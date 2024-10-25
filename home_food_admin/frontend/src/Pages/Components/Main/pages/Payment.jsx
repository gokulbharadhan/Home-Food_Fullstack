import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import axios from "../../../../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import ApplicationStore from "../../../../utils/localStorageUtil";

const Payment = () => {
  const URL = "./Payment/updatePayment";
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [gpayid, setGpayId] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const empid = ApplicationStore().getStorage("empid");
  const { removeToCart } = useAuthContext();
  const [loading,setLoading]=useState(false);
  const [payments, setPayments] = useState('');
  const location = useLocation();
  const [addressId,setAddressesId]=useState('');
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amt');


  const handleAddressSelect = (address,addressId) => {
    setAddressesId(addressId);
    setSelectedAddress(address);
  };

  useEffect(() => {
    setAddresses([]);
    loadData();
  }, [refreshData]);

  const loadData = async () => {
    try {
      const URL = `./address/${empid}/get`;
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        // Handle unauthorized
      } else {
        setAddresses(response.data.data || []);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
    try {
      const response = await axios.get('auth/getUserById', {
          headers: { 'Content-Type': 'application/json', "empid": empid },          
      }); 
      if (response.data.status === 401) {
          alert("eror")
      } else {
          setName(response.data.data[0].name);
          setPhone(response.data.data[0].contact);
          setEmail(response.data.data[0].email);
          
          
      }
  } catch (err) {    
      if (!err?.response) {
          alert("No server response");
      } else {
          alert(err?.response.data);
      }
  }    
  };

  const validate = () => {
    let tempErrors = {};
    if (selectedPaymentMethod === 'card') {
      if (!cardName) tempErrors.cardName = "Name on card is required.";
      if (!cardNumber) {
        tempErrors.cardNumber = "Card number is required.";
      } else if (!/^\d{16}$/.test(cardNumber)) {
        tempErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!cvv) {
        tempErrors.cvv = "CVV is required.";
      } else if (!/^\d{3,4}$/.test(cvv)) {
        tempErrors.cvv = "CVV must be 3 or 4 digits.";
      }
      if (!month) tempErrors.month = "Month is required.";
      if (!year) tempErrors.year = "Year is required.";
    } 
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.Razorpay) {
      console.error('Razorpay script not loaded.');
      return;
    }

    try {
      // Step 1: Create an order on the backend
      const response = await axios.post('/razorpay/create-order', { amount: amount }); // Example amount in INR (5.00)
      const { data } = response;

      const options = {
        key: 'rzp_test_H86fHzp0t46FND', // Replace with your Razorpay key_id
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: 'Home Feast',
        description: 'User Transaction',
        order_id: data.id, // Order ID from the response
        handler: async function (response) {
          // Step 3: Verify payment on the backend
          try {
            await axios.post('/razorpay/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            paymentSuccess();
          } catch (error) {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: `${name}`,
          email: `${email}`,
          contact: `${phone}`,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const paymentSuccess= async()=>{
    const method = "POST";
    const cartData = ApplicationStore().getStorage('cart');
    const mainURL = URL;
    setLoading(true);
    try {
      for (const item of cartData) {
        const data = {
          userid: empid,
          amount,
          cart: [{ id: item.id, quantity: item.quantity, total: item.total }],
          selectedPaymentMethod,
          address: addressId,
          payments // Include the selected address
        };

        await axios.post(mainURL, data);
      }

      handleSuccess();

    } catch (err) {
      console.log("Error submitting payment:", err);
      handleException(err?.response?.data);
    }
  }
  const handleSuccess = () => {
    setPayments('');
    alert("Payment submitted successfully");
    setLoading(false)
    ApplicationStore().removeStorage('cart');
    navigate("/RecipeUser");
    window.location.reload();
    removeToCart();
  };

  const handleException = (data) => {
    setLoading(false);
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Payment Method</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recepie_area" style={{ paddingTop: "60px" }}>
        <div className="container">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
               

                  {/* Address Selection */}
                  <div style={{ marginTop: '20px' }}>
                    <h4>Select Address</h4>
                    <div className="address-cards">
                      {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <Card
                            key={index}
                            onClick={() => handleAddressSelect(address,address.id)}
                            style={{
                              border: selectedAddress?.id === address.id ? '2px solid blue' : '1px solid #ccc',
                              marginBottom: '10px',
                              cursor: 'pointer',
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6">{address.title}</Typography>
                              <Typography variant="body2">{address.detail}</Typography>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p>No addresses available. Please add a new address.</p>
                      )}
                    </div>
                  </div>

                  {selectedAddress && (
                    <div style={{ marginTop: '10px', color: 'blue' }}>
                      <strong>Selected Address: </strong>{selectedAddress.title}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Amount</h4>
                  <h3>₹{amount}</h3>
                  <Button
      variant="contained"
      color="primary"
      type="submit"
      style={{ marginTop: '20px' }}
      disabled={!selectedAddress} // Disable when loading
      onClick={handleSubmit}
    >
      {loading ? <CircularProgress size={24} sx={{color:'white'}}/> : 'Confirm Payment'}
    </Button>
                  {(!selectedAddress) && (
                    <div style={{ marginTop: '10px', color: 'red' }}>
                      {!selectedAddress && <p>Please select an address.</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
