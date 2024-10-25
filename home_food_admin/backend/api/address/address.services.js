const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create:(data, callBack) => {      
        pool.query(
            `select * from address where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    var status="active";
                    pool.query(
                        `INSERT INTO address(title,country,state,city,street,pin,user_id) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.title,
                            data.country,
                            data.state,
                            data.city,
                            data.street,
                            data.pin,
                            data.userid
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
     getAddressById:(id,callBack) => {
        pool.query(
            `select * from address where user_id = ?`,
            [id],
            (err,results,fields) => {
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
            `select * from food`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     updateAddress:(data, id, callBack) => {
                    
                    pool.query(
                        `UPDATE address SET title=?, country=?, state=?, city=?, street=?, pin=? WHERE id = ?`,
                         [
                            data.title,
                            data.country,
                            data.state,
                            data.city,
                            data.street,
                            data.pin,
                            id
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
     },
     deleteAddressId:(id,callBack) => {
        pool.query(`delete from address where id=?`,
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
