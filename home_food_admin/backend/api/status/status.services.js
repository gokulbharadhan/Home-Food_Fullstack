const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const { response } = require("express");
module.exports  = {
     insertStatusVideo :(data, id, callBack) => {      
        pool.query(
            `REPLACE INTO statusvideo (user_id, video_id, likes, dislikes) VALUES (?, ?, ?, ?)`,
            [ data.userid, id,data.likes, data.dislikes],
            (err, results) => {
                if (err) {
                    return callBack(err);
                }
    
                if (results.affectedRows > 0) {
                    pool.query(
                        `SELECT 
                        SUM(CASE WHEN likes = TRUE THEN 1 ELSE 0 END) AS totalLikes, 
                        SUM(CASE WHEN dislikes = TRUE THEN 1 ELSE 0 END) AS totalDislikes 
                     FROM statusvideo 
                     WHERE video_id = ?`,
                        [id],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
    
                            if (results.length > 0) {
                                const { totalLikes, totalDislikes } = results[0];
    
                                pool.query(
                                    `REPLACE INTO countlikes (video_id, totallikes, totaldislikes) VALUES (?, ?, ?)`,
                                    [id, totalLikes, totalDislikes],
                                    (err, finalResults) => {
                                        if (err) {
                                            return callBack(err);
                                        }
    
                                        return callBack(null, finalResults);
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    },
    
    getVideoStatus:(data,id,callBack) => {
        console.log(id);
        console.log(data.userid);
        pool.query(
            `select * from statusvideo where user_id = ? and video_id = ?`,
            [data.userid,id],
            (err,results) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
                
            }
        );
     },
     getVideoLikes:(id,callBack)=>{
        pool.query(
            `select * from countlikes where video_id = ?`,
            [id],
            (err,results) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                   return callBack(null,results)
                }
                
            }
        )
     },
     updateLikes:(data,id,callBack)=>{
        pool.query(
            `update statusvideo set likes=?,dislikes=? where video_id = ? and user_id=?`,
            [
             data.likes,
             data.dislikes,
             id,
             data.userid
            ],
            (err,results) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    if (results.affectedRows > 0) {
                        pool.query(
                            `SELECT 
                            SUM(CASE WHEN likes = TRUE THEN 1 ELSE 0 END) AS totalLikes, 
                            SUM(CASE WHEN dislikes = TRUE THEN 1 ELSE 0 END) AS totalDislikes 
                         FROM statusvideo 
                         WHERE video_id = ?`,
                            [id],
                            (err, results) => {
                                if (err) {
                                    return callBack(err);
                                }
        
                                if (results.length > 0) {
                                    const { totalLikes, totalDislikes } = results[0];
        
                                    pool.query(
                                        `REPLACE INTO countlikes (video_id, totallikes, totaldislikes) VALUES (?, ?, ?)`,
                                        [id, totalLikes, totalDislikes],
                                        (err, finalResults) => {
                                            if (err) {
                                                return callBack(err);
                                            }
        
                                            return callBack(null, finalResults);
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
                
            }
        )
     }
    
     
     
    
     
};
