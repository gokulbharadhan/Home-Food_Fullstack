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
                    var type="user";
                    // var password="PAS" + Math.floor(Math.random() * 90000 + 10000);
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
        pool.query(`select * from user where id = ?`,
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
    getCheffById: (id, callBack) => {
        pool.query(
            `SELECT u.name, u.image, v.cheif_id 
             FROM user u 
             JOIN videos v ON u.id = v.cheif_id 
             WHERE v.id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    console.error("Database query failed:", err);
                    return callBack("Internal server error"); // Generic error message for the client
                } else if (results.length === 0) {
                    return callBack("Data not found");
                } else {  
                    return callBack(null, results);
                }
            }
        );
    },
    
    updateImage: (id, data, callBack) => {
        if (!data.image) {
            return callBack(new Error("Image data is missing"), null);
        }
    
        pool.query(
            `UPDATE user SET image = ? WHERE id = ?`,
            [data.image, id],
            (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return callBack(error, null);
                }
    
                console.log('Affected Rows:', results.affectedRows);
                if (results.affectedRows > 0) {
                    return callBack(null, { message: 'Update successful', affectedRows: results.affectedRows });
                } else {
                    return callBack(null, { message: 'No records updated. Please check the ID provided.' });
                }
            }
        );
    },
    
    
    
    getRegs:(callBack) =>{
        pool.query(`select * from user where userRole="user"`,        
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
        pool.query(`delete from userregister where id=?`,
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