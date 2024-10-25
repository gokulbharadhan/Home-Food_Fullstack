const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create:(data, callBack) => {      
        pool.query(
            `select * from food where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    var status="active";
                    pool.query(
                        `INSERT INTO food(prefer_age,food_item,category_id,price,description,image,food_type,chef_id,food_status,date_create) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                         [
                            data.prefer_age,
                            data.food_item,
                            data.category_id,
                            data.price,
                            data.description,
                            data.image,
                            data.food_type,
                            data.chef_id,
                            status,
                            date
                            
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
     getProductById:(id,callBack) => {
        pool.query(
            `select * from food where chef_id = ?`,
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
     getProductsByFoodId: (id, callBack) => {
        pool.query(
            `SELECT c.id as category_id, c.name, f.id, f.prefer_age, f.food_item, f.category_id, f.price, f.description, f.image,f.food_type, f.chef_id, f.food_status, f.date_create,s.name as cheffname
            FROM food f 
            LEFT JOIN category c ON f.category_id = c.id 
            LEFT JOIN user s ON f.chef_id = s.id 
            WHERE f.id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.length === 0) {
                    err = "Data not found";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    
     updateProduct:(data, id, callBack) => {
        var status="active";
                    pool.query(
                        `UPDATE food SET prefer_age=?,food_item=?,category_id=?,price=?,description=?, image=?,food_type=? WHERE  id = ?`,
                        [
                            data.prefer_age,
                            data.food_item,
                            data.category_id,
                            data.price,
                            data.description,
                            data.image,
                            data.food_type,
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
     deleteProductById:(id,callBack) => {
        pool.query(`delete from food where id=?`,
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
