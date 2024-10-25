const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
module.exports  = {
     create:(data, callBack) => {      
        pool.query(
            `select * from videos where link = ?`,
            [data.link],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    var status="active";
                    pool.query(
                        `INSERT INTO videos(title,link,description,cheif_id,product_id,status,date) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.title,
                            data.link,
                            data.description,
                            data.chef_id,
                            data.product_id,
                            status,
                            date,     
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         ); 
                  
     },
     getVideoById: (id, callBack) => {
        pool.query(
            `SELECT c.totallikes, c.totaldislikes, 
                    COUNT(v.view) AS total_views, 
                    video.id AS video_id, video.title, video.description, 
                    video.product_id, video.link, video.id, video.date
             FROM videos video 
             LEFT JOIN countlikes c ON c.video_id = video.id 
             LEFT JOIN views v ON v.video_id = video.id 
             WHERE video.cheif_id = ?
             GROUP BY video.id`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                if (results.length === 0) {
                    return callBack("Data not found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    
    
     //getting the products data
     getVideos:(callBack) => {
         pool.query(
            `select * from videos`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){
                    err = "Data Not Found";
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
   updateVideo: (data, id, callBack) => {
    pool.query(
        `UPDATE videos SET title = ?, link = ?, description = ? WHERE id = ?`,
        [
            data.title,
            data.link,
            data.description,
            id
        ],
        (err, results) => {
            if (err) {
                return callBack(err);
            }
            // Check if the update affected any rows
            if (results.affectedRows === 0) {
                // No rows affected, the id might not exist
                return callBack(new Error('No video found with the given id.'));
            }
            return callBack(null, results);
        }
    );
},

     deletes:(id,callBack) => {
        pool.query(`delete from videos where id=?`,
            [ 
                id
            ],        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
    );
     },
     
     
    
     
};
