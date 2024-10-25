const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create:(data,id, callBack) => {  
        console.log(data)
        const date=new Date();    
                    pool.query(
                        `INSERT INTO comments(user_id,video_id,comment,date) VALUES (?,?,?,?)`,
                         [
                            data.user_id,
                            id,
                            data.comment,
                            date
                         ],
                         (err,results) =>{
                             if(err){
                                console.log(err);
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                        );
                  
     },
     getCommentById:(id,callBack) => {
        pool.query(
            `SELECT c.user_id, c.comment, u.name, u.id, u.image 
            FROM comments c 
            JOIN user u ON u.id = c.user_id 
            WHERE c.video_id = ?`,
            [id],
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
     //getting the products data
     getProducts:(callBack) => {
         pool.query(
            `select * from article`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     
     
    
     
};
