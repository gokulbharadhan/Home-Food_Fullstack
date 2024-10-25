const pool = require("../../config/dbconfig");
const res = require("express/lib/response");
const { genSaltSync, hashSync} = require("bcrypt");

module.exports = {
    create:(data, callBack) => {      
        pool.query(
            `select * from user where email = ?`,
            [data.email],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    var status="active";
                    var type="cheff";
                    var password="PAS" + Math.floor(Math.random() * 90000 + 10000);
                    pool.query(
                        `INSERT INTO user(name,email,contact,password,date,status,userRole) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.name,
                            data.email,
                            data.contact,
                            data.password,
                            date,
                            status,
                            type,
                            
                            
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
    getRegByIDs:(id, callBack) =>{
        pool.query(`select * from userregister where id = ?`,
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
    updatebyIds:(id,data,callBack) =>{
        pool.query(
            `update user set name=?, email=?, contact=?, password=? where id = ?`,
            [   data.name,
                data.email,
                data.contact,
                data.password,           
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
        pool.query(`select * from user where userRole="cheff"`,        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else{  
                    return callBack(null, results);
                }
            }
        );
    },
    deleteByIds:(id,callBack) =>{
        pool.query(`delete from user where id=?`,
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