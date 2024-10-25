const { create, getProducts, getProductById, updateProduct, deleteProductById ,getProductsByFoodId} = require("./food.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = {
    createProduct:(req,res) => {
        const body = req.body;


        let docType = "";       
        uploadDocument(req.body.resumeDoc,"resumeDoc");
  
        if(body.image === ""){
            
        }else{
            docType = "productImage";
            body.image = uploadDocument(req.body.image,docType);
        }

        
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
     getProductByFood:(req,res) => {
        const id = req.params.id;
        getProductsByFoodId(id, (err, results) => {
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
        getProducts((err, results) => {
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
     updateProduct: async (req, res) => {
        const body = req.body;
        const id = req.params.id;
    
        try {
            // Fetch existing product data to get the current image path
            const existingProduct = await new Promise((resolve, reject) => {
                getProductsByFoodId(id, (err, results) => {
                    if (err) return reject(err);
                    if (!results || results.length === 0) return reject(new Error("Product not found"));
                    resolve(results[0]); // Assuming results is an array of products
                });
            });
    
            // Check if an image is provided and if it's different from the existing one
            if (body.image && body.image !== existingProduct.image) {
                const docType = "productImage";
                body.image = uploadDocument(req.body.image, docType);
            } else {
                // If the image path is the same as the existing one, keep the current image
                body.image = existingProduct.image;
            }
    
            // Update the product with the modified body
            updateProduct(body, id, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err,
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: results,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: 0,
                message: error.message,
            });
        }
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