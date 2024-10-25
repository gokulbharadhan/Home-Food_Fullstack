const pool = require("../../config/dbconfig");
const res = require("express/lib/response");
const { genSaltSync, hashSync} = require("bcrypt");

module.exports = {
    create:(data, callBack) => {      
        
    pool.query(
        `INSERT INTO user_reviews(customer_name,food_id,subject,comment,rating) VALUES (?,?,?,?,?)`,
            [
            data.name,
            data.id,
            data.subject,
            data.description,
            data.rating,
            
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
    getRegByIDs:(id, callBack) =>{
        pool.query(`select * from user_reviews where review_id  = ?`,
            [id],
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    return callBack(null, results);
                }
            }
        );
    },
    updatebyIds:(id,callBack) =>{
        pool.query(
            `update user_reviews set username=?, email=?, phone=?, password=?, didx=? where id = ?`,
            [   data.username,
                data.email,
                data.phone,
                data.password,
                data.didx ,            
                id
            ],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                }
                return callBack(null, results[0]);
            }
        );
   },
    getRegs:(callBack) =>{
        pool.query(`select * from user_reviews`,        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    return callBack(null, results);
                }
            }
        );
    },
    deleteByIds:(id,callBack) =>{
        pool.query(`delete from user_reviews where id=?`,
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
}
};