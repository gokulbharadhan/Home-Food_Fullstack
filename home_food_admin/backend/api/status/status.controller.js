const { insertStatusVideo,getVideoLikes,getVideoStatus,updateLikes } = require("./status.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');
const fs = require('fs');
module.exports = {
    insertStatusVideo:(req,res) => {
        const body = req.body;
        const id = req.params.id;
       
        insertStatusVideo(body,id, (err, results) => {
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
     getVideoStatus:(req,res) => {
        const data=req.query;
        const id = req.params.id;
        getVideoStatus(data,id, (err, results) => {
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
     getVideoLikes:(req,res) => {
        const id = req.params.id;
        getVideoLikes(id, (err, results) => {
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
     updateLikes:(req,res) => {
        const data=req.body;
        const id = req.params.id;
        updateLikes(data,id, (err, results) => {
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
     
}