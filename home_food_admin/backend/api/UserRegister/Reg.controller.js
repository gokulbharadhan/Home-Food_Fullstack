const { create,getRegByIDs,updateImage,getRegs,deleteByIds,getCheffById } = require('./Reg.services');


const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    // createReg:(req,res) => {
    //     const body = req.body;

    //     create(body,(err,results) => {
    //         if(err){
    //             return res.status(500).json({
    //                 success:0,
    //                 status:500,
    //                 error:err
    //             });
    //         }else{
                

    //             var mailReq = {
    //                 to:results.email,
    //                 subject:"Login credentials",
    //                 text:"Your Login password for "+results.email+" is "+results.password
    //             };
        
    //             mail(mailReq,res); 
    //         }
    //     });
    // },
    createReg:(req,res) => {
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

    getRegById:(req, res) => {
        const id = req.params.id;
        getRegByIDs(id,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    message:results,
                    status:200
                });
            }
        });
    },
    
    getCheffById:(req, res) => {
        const id = req.params.id;
        getCheffById(id,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    message:results,
                    status:200
                });
            }
        });
    },
    updateImageById: (req, res) => {
        const body = req.body;
     
    
        let docType = "";
    
        if (body.resumeDoc) {
            uploadDocument(body.resumeDoc, "resumeDoc");
        }
    
        if (body.image) {
            docType = "profileImage";
            body.image = uploadDocument(body.image, docType);
        }
    
        const id = req.params.id; // Assuming you're extracting the user ID from the URL
    
        updateImage(id, body, (err, results) => {
            if (err) {
                console.error('Update Error:', err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    error: err
                });
            } else {
                if (results.affectedRows > 0) {
                    return res.status(200).json({
                        success: 1,
                        message: "Updated successfully",
                        details: results
                    });
                } else {
                    return res.status(404).json({
                        success: 0,
                        message: "No records updated. User ID may be incorrect."
                    });
                }
            }
        });
    },
    
    getRegData:(req,res) => {
        getRegs((err,results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }else{
                    return res.status(200).json({
                        success:1,
                        data:results,
                        authData:req.authData,
                        status:200
                    });
                }
        });
    },
    deleteById:(req,res) => {
        const id = req.params.id;
        deleteByIds(id, (err, results) => {
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


const mail = (mailReq,res) => {

    var transporter = nodemailer.createTransport({
            service: 'gmail',       
            PORT:465,
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORD
            },
            logger:true,
            debug:true
    });

    var infos = "information";
    var err = "error";

    transporter.sendMail(mailReq, function(error, info){
        if (error) {
            console.log(error);
            //mailReq.err = error;            
        } else {

        console.log('Email sent: ' + info.response);        
            return res.json({
                success:1,
                subject:mailReq.subject,
                data:"message sent and Organization with admin data added successfully"
            });             

        }
    }); 
    
    
};
const uploadDocument = (doc, docType) => {
    if (!doc) {
        console.error('Document data is undefined or null');
        return;
    }

    let folderName = "";
    let DocPath = "";
    let base64Data = "";

    const saveFile = (folderPath, folderName, DocData) => {
        DocPath = folderName + '/' + Date.now() + '.jpg';
        Path = folderPath + '/' + Date.now() + '.jpg';
        base64Data = DocData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }

        fs.writeFileSync(DocPath, base64Data, { encoding: 'base64' });
        return Path;
    };

    switch (docType) {
        case "profileImage":
            folderName = './Images/profileImage';
            folderPath = '/Images/profileImage';
            DocPath = saveFile(folderPath, folderName, doc);
            break;
        case "resumeDoc":
            folderName = './Documents/resume';
            folderPath = '/Documents/resume';
            DocPath = saveFile(folderPath, folderName, doc);
            break;
        default:
            break;
    }

    return DocPath;
};
