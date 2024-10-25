const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
      user: 'homefeast.food@gmail.com',
      pass: 'hublzhxbiefjnjsf',
    },
  });
module.exports  = {
     create:(data, callBack) => {      
        pool.query(
            `SELECT * FROM trackorder WHERE userid = ? AND status = ? LIMIT 1`,
            [data.userid, "initiated"],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                var trackno = "BBORD3TRC202" + Math.floor(Math.random() * 90000 + 10000);
                const status = "initiated";
                const remark = "order has been initiated";
                const date = new Date();

                

                if (results.length === 0) {
                    pool.query(
                        `INSERT INTO trackorder(userid, trackno, status, remark, date) VALUES (?,?,?,?,?)`,
                        [data.userid, trackno, status, remark, date],
                        (error, res) => {
                            if (error) {
                                return callBack(error);
                            } else {
                                const message = {
                                    trackno: trackno,
                                    message: "Trackno added successfully"
                                };
                                const orderDate = new Date();

                                if (typeof data.cartList != "undefined") {
                                    pool.query(
                                        `INSERT INTO orders(userid, trackid, productId, quantity, orderStatus, order_remark, orderDate) VALUES (?,?,?,?,?,?,?)`,
                                        [data.userid, res.insertId, data.cartList.id, data.cartList.quantity, status, remark, orderDate],
                                        (error) => {
                                            if (error) {
                                                return callBack(error);
                                            }
                                            // Note: This code block doesn't return anything. Consider what you want to do here.
                                        }
                                    );

                                    return callBack(null, "Data added successfully");
                                }
                            }
                        }
                    );
                } else {
                    trackno = results[0].id;
                    const orderDate = new Date();
                    if (typeof data.cartList != "undefined") {
                        pool.query(`select *  from orders where trackid = ? and productId =?`,
                            [trackno, data.cartList.id],
                            (error, results) => {
                                if (error) {
                                    return callBack(error);
                                }
                                if (results.length == 0) {
                                    pool.query(
                                        `INSERT INTO orders(userid, trackid, productId, quantity, orderStatus, order_remark, orderDate) VALUES (?,?,?,?,?,?,?)`,
                                        [data.userid, trackno, data.cartList.id, data.cartList.quantity, status, remark, orderDate],
                                        (error) => {
                                            if (error) {
                                                return callBack(error);
                                            }
                                            // Note: This code block doesn't return anything. Consider what you want to do here.
                                            return callBack(null, "Data added successfully");
                                        }
                                    );
                                } else {
                                    var qty = Number(results[0].quantity) + (data.cartList.quantity);
                                    pool.query(
                                        `UPDATE orders SET quantity = ? where productId = ? and trackid = ? `,
                                        [qty, data.cartList.id, trackno],
                                        (error) => {
                                            if (error) {
                                                return callBack(error);
                                            }
                                            // Note: This code block doesn't return anything. Consider what you want to do here.
                                            return callBack(null, "Data added successfully");
                                        }
                                    );
                                }
                            }
                        );

                    }
                }
            }
        );
                  
     },
     getProductById:(id,callBack) => {
        pool.query(
            `select o.id, o.orderno, o.userid, o.paymentno, o.food_id, o.quantity, o.price, o.orderStatus, o.orderDate, 
            f.food_item, f.image from orders o, food f where f.id = o.food_id and o.userid = ?`,
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
     updageOrderById:(id, data, callBack) => {
        pool.query(
            `UPDATE orders SET orderStatus = ? WHERE id = ?`,
            [data.action, id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                
                // Check if any rows were affected
                if (results.affectedRows === 0) {
                    const err = "Data not found";
                    return callBack(err);
                }
    
                // Define the message based on the action
                let actionMessage;
                if (data.action === "Canceled") {
                    actionMessage = "Your order has been canceled";
                } else if (data.action === "Confirmed") {
                    actionMessage = "Your order has been confirmed";
                } else if (data.action === "Delivered") {
                    actionMessage = "Your order has been delivered";
                } else {
                    actionMessage = "Order status updated";
                }
    
                // Send a message with the appropriate action message
                module.exports.sendMessage(data.email, actionMessage, callBack);
            }
        );
    },
    
     upgradeUserStatus:(id, data, callBack) => {
        pool.query(
            `UPDATE orders SET orderStatus = ? WHERE id = ?`,
            [data.action, id],
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
    
     //getting the products data
     getProducts:(id,callBack) => {
        pool.query(
            `SELECT 
                o.id, 
                o.orderno, 
                o.userid, 
                o.paymentno, 
                o.food_id, 
                o.quantity, 
                o.price, 
                o.orderStatus, 
                o.orderDate, 
                u.name AS username, 
                u.contact,
                u.email,
                f.food_item,
                f.price,
                f.image AS food_image, 
                p.amount,
                p.payment_type, 
                p.payment_status, 
                a.title, 
                a.country, 
                a.state, 
                a.city, 
                a.pin
             FROM 
                orders o
             JOIN 
                food f ON f.id = o.food_id
             JOIN 
                user u ON u.id = o.userid
             JOIN 
                user_payment p ON o.paymentno = p.payment_no
             JOIN 
                address a ON o.address = a.id
                WHERE f.chef_id=?`,
                [id],

            (err, results) => {
              if (err) {
                console.error("Database query error:", err);
                return callBack(err);
              } else {
                console.log("Database results:", results); // Check this log
                return callBack(null, results);
              }
            }
          );
          
     },
     sendMessage: (email,action, callBack) => {
        
                    const mailOptions = {
                        from: 'homefeast.food@gmail.com',
                        to: email,
                        subject: 'Order tracking',
                        text: `${action}`,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error:', error);
                            return callBack(error);
                        }
                        return callBack(null, 'Verification email sent.');
                    });
                },
    

     getAllProduct:(callBack) => {
        pool.query(
           `select o.id, o.orderno, o.userid, o.paymentno, o.food_id, o.quantity, o.price, o.orderStatus, o.orderDate, 
           u.name, f.food_item from orders o, food f, user u where f.id = o.food_id and u.id = o.userid`,
           (err,results) => {
               if(err){
                   return callBack(err);
               }else{
                   return callBack(null, results);
               }

           }
        );
    },
     updateProduct:(data, id, callBack) => {
        pool.query(
            `select * from category where name = ? and id <> ?`,
            [
                data.name,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE category SET name=? WHERE  id = ?`,
                         [
                            data.name,
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
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     deleteProductById:(id,callBack) => {
        pool.query(`delete from orders where id=?`,
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
