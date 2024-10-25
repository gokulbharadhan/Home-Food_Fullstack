const { create, getProducts, getProductById, updateProduct, deleteProductById,getAllProduct,updageOrderById,upgradeUserStatus } = require("./ord.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = {
    createProduct:(req,res) => {
        const body = req.body;
       
        create(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProductById:(req,res) => {
        const id = req.params.id;
        getProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     updageOrderById:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updageOrderById(id,body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     upgradeUserStatus:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        upgradeUserStatus(id,body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProducts:(req,res) => {    
        const id = req.params.id;    
        getProducts(id,(err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getAllProduct:(req,res) => {     
        getAllProduct((err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     updateProduct:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updateProduct(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     deleteProductById:(req,res) => {
        const id = req.params.id;
        deleteProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     }
};

const uploadDocument = (doc,docType) => {

    let folderName = "";
    let DocPath = "";
    let DocData = doc;
    let base64Data = "";

    const saveFile = (folderPath,folderName,DocData) => {
        DocPath = folderName + '/' + Date.now()+'.jpg';  
        Path  = folderPath + '/' + Date.now()+'.jpg';  
        // to convert base64 format into random filename
        base64Data = DocData.replace(/^data:([A-Za-z-+/]+);base64,/, ''); 
    
        if (!fs.existsSync(folderName)) {                
            fs.mkdirSync(folderName);
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});                         
        }else{
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});
        }       
        
        return Path;
    };

    switch(docType){          
            
        case "productImage":
            folderName = './Images/productImage';
            folderPath = '/Images/productImage'; 
            DocPath = saveFile(folderPath,folderName,DocData);    
            break;         

        default:            
            break;
    }    
    
    return DocPath;
     
}