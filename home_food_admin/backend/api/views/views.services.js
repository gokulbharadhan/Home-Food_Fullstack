const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const { response } = require("express");
module.exports  = {
    insertViews: (data, id, callBack) => {
        const view = 1;
        
        // Step 1: Check if a record already exists
        pool.query(
            `SELECT * FROM views WHERE user_id = ? AND video_id = ?`,
            [data.user_id, id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                }
    
                // Step 2: Insert the view if no record exists
                if (results.length === 0) {
                    pool.query(
                        `INSERT INTO views (user_id, video_id, view) VALUES (?, ?, ?)`,
                        [data.user_id, id, view],
                        (err, insertResults) => {
                            if (err) {
                                return callBack(err);
                            }
    
                            return callBack(null, insertResults);
                        }
                    );
                } else {
                    // Record already exists, so no need to insert again
                    return callBack(null, { message: 'View already exists' });
                }
            }
        );
    },
    
    getVideoViews:(id,callBack)=>{
        console.log("from get"+id)
        pool.query(
            `select * from views where video_id = ?`,
            [id],
            (err,results) => {
                if(err){
                    console.log(err);
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    console.log(err);
                    return callBack(err)
                }else{
                    console.log(results);
                   return callBack(null,results)
                }
                
            }
        )
     },
    
   
    
     
};
