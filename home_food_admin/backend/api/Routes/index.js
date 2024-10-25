const router = require("express").Router();
const authRouter=require("../Auth/auth.router");
const userregisterRouter = require("../UserRegister/Reg.router");
const categoryRouter=require("../Category/cat.router");
const artRouter=require("../Article/art.router");
const farRouter=require("../Farmer/far.router");
const prodRouter=require("../Product/prod.router");
const jobRouter=require("../Job/job.router");
const purRouter=require("../Pruchase/pur.router");
const payRouter=require("../Payment/pay.router");
const foodRouter=require("../Food/food.router");
const orderRouter=require("../Order/ord.router");
const paymentRouter=require("../Payment/pay.router");
const ratingRouter=require("../Rating/rate.router");
const videosRouter=require("../Videos/vd.router")
const emailRouter = require('../Email/email.router');
const addressRouter=require('../address/address.router');
const contactRouter=require('../Contact/contact.router');
const statusRouter=require('../status/status.rouer');
const commentRouter=require('../Comments/comment.router');
const viewsRouter=require('../views/views.router');
const razorpayRouter = require("../razorpay/raz.router");
const {verifyToken} = require("../Auth/auth.controller");


router.use("/api/auth",authRouter);
router.use("/api/status",statusRouter);
router.use("/api/address",addressRouter);
router.use("/api/userRegister",userregisterRouter);
router.use("/api/category",categoryRouter);
router.use("/api/article",artRouter);
router.use("/api/farmer",farRouter);
router.use("/api/Product",prodRouter);
router.use("/api/Job",jobRouter);
router.use("/api/purchase",purRouter);
router.use("/api/payment",payRouter);
router.use("/api/food",foodRouter);
router.use("/api/order",orderRouter);
router.use("/api/Payment",paymentRouter);
router.use("/api/Rating",ratingRouter);
router.use("/api/Videos",videosRouter);
router.use("/api/Contact",contactRouter);
router.use("/api/comment",commentRouter);
router.use("/api/view",viewsRouter);
router.use('/api/razorpay', razorpayRouter);
router.use('/api/email', emailRouter);


//cafe


module.exports = router; 