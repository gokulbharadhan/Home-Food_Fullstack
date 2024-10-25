import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Delete, CheckCircle, Cancel } from "@mui/icons-material";
import axios from "../../../../api/axios";
import Navbar from "../components/Navbar";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "../components/Footer";
import { InputAdornment } from '@mui/material';
import { Search } from "@material-ui/icons";
import ApplicationStore from "../../../../utils/localStorageUtil";
const URL = './order';

const ViewOrderCheff = () => {
    const [dataList, setDataList] = useState([]);
    const empid = ApplicationStore().getStorage('empid');
    const [loadingOrder, setLoadingOrder] = useState({ id: null, action: null });
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState({ orderId: null, action: null, email: null });
    
    const filteredRecipes = dataList.filter((recipe) =>
        recipe.orderno && recipe.orderno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        try {
            const mainUrl = `${URL}/${empid}/get`;
            const response = await axios.get(mainUrl);
            if (response.data.status === 401) {
                setDataList([]);
            } else {
                setDataList(response.data.data);
            }
        } catch (err) {
            console.log(err?.response ? err.response.data : "No server response");
        }
    };
    
    const handleAction = async () => {
        handleCloseDialog()
        setLoadingOrder({ id: selectedAction.orderId, action: selectedAction.action });
        try {
            const data = { action: selectedAction.action, email: selectedAction.email };
            const mainURL = `${URL}/${selectedAction.orderId}/upgrade`;
            await axios.post(mainURL, data);
            loadData(); 
            setOpenDialog(false);
            if (selectedAction.action === "Confirmed") {
                alert("Order has been confirmed");
            } else if (selectedAction.action === "Canceled") {
                alert("Order has been canceled");
            } else {
                alert("Order has been delivered");
            }
            handleSuccess();
        } catch (err) {
            setLoadingOrder({ id: null, action: null });
            console.log(err?.response ? err.response.data : "No server response");
        }
    };

    const handleOpenDialog = (orderId, action, email) => {
        setSelectedAction({ orderId, action, email });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSuccess = () => {
        setLoadingOrder({ id: null, action: null });
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
            <div className='container' style={{ textAlign: 'center', marginTop: "50px" }}>
                <TextField
                    variant="outlined"
                    label="Search orders using order no"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: '400px', height: '40px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="customer_feedback_area pb-5" style={{ marginTop: '-150px' }}>
                <div className="container">
                    <Grid container spacing={3}>
                        {filteredRecipes
                            .filter(order => order.orderStatus !== "Delivered" && order.orderStatus !=="Canceled")
                            .map((order) => (
                                <Grid item xs={12} key={`${order.id}-${order.food_id}-${order.orderDate}`}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                    <img 
                                                        src={`http://localhost:3006${order.food_image}`} 
                                                        alt={order.food_item} 
                                                        style={{ width: '100px', height: 'auto', borderRadius: '8px' }} 
                                                    />
                                                    <Typography variant="h6">{order.food_item}</Typography>
                                                    <Typography>Quantity: {order.quantity}</Typography>
                                                    <Typography>Price: {order.price}</Typography>
                                                </Grid>
                                                <Grid item xs={12} md={8}>
                                                    <Typography variant="h6">{order.food_item}</Typography>
                                                    <Typography>Ordered no: {order.orderno}</Typography>
                                                    <Typography>Ordered by: {order.username}</Typography>
                                                    <Typography>Payment: {order.payment_status}</Typography>
                                                    <Typography>
                                                        Payment type: 
                                                        {order.payment_type === 'cod' ? 'Cash on delivery' :
                                                         order.payment_type === 'gpay' ? 'Google Pay' : 
                                                         'Debit or Credit Card'}
                                                    </Typography>
                                                    <Typography>Total Amount: {order.amount}</Typography>
                                                    <Typography>Phone: {order.contact}</Typography>
                                                    <Typography>Address: {order.title}, {order.city}, {order.state}, {order.pin}</Typography>
                                                    {order.orderStatus !== "Canceled" && (
                                                        <Box mt={2}>
                                                            {order.orderStatus !== "Confirmed" && (
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    startIcon={<CheckCircle />}
                                                                    onClick={() => handleOpenDialog(order.id, 'Confirmed', order.email)}
                                                                >
                                                                    {loadingOrder.id === order.id && loadingOrder.action === 'Confirmed'
                                                                        ? <CircularProgress size={24} sx={{ color: 'white' }} />
                                                                        : 'Confirm Order'}
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                startIcon={<Cancel />}
                                                                onClick={() => handleOpenDialog(order.id, 'Canceled', order.email)}
                                                                style={{ marginLeft: '10px' }}
                                                            >
                                                                {loadingOrder.id === order.id && loadingOrder.action === 'Canceled'
                                                                    ? <CircularProgress size={24} sx={{ color: 'white' }} />
                                                                    : 'Cancel Order'}
                                                            </Button>
                                                            {order.orderStatus !== "Pending" && (
                                                                <Button
                                                                    variant="contained"
                                                                    startIcon={<Delete />}
                                                                    onClick={() => handleOpenDialog(order.id, 'Delivered', order.email)}
                                                                    style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }}
                                                                >
                                                                    {loadingOrder.id === order.id && loadingOrder.action === 'Delivered'
                                                                        ? <CircularProgress size={24} sx={{ color: 'white' }} />
                                                                        : 'Delivered'}
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </div>
            
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {selectedAction.action} this order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleAction} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
};

export default ViewOrderCheff;
