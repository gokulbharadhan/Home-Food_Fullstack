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
    
    create: (data, callBack) => {
        const date = new Date();
        const paymentno = "PAYMENT_" + Math.floor(Math.random() * 90000 + 10000);
    
        pool.query(
          `INSERT INTO user_payment(payment_no, user_id, amount, payment_status, date, payment_type) VALUES (?, ?, ?, ?, ?, ?)`,
          [paymentno, data.userid, data.amount, data.payments, date, data.selectedPaymentMethod],
          (error, paymentRes) => {
            if (error) {
              return callBack(error);
            }
            if (paymentRes.affectedRows > 0) {
              const orderPromises = data.cart.map((item) => {
                const orderno = "ORD-" + Math.floor(Math.random() * 90000 + 10000);
                return new Promise((resolve, reject) => {
                  pool.query(
                    `INSERT INTO orders(orderno, userid, paymentno, food_id, quantity, price, orderStatus, orderDate, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [orderno, data.userid, paymentno, item.id, item.quantity, item.total, "Pending", date, data.address],
                    (error, results) => {
                      if (error) {
                        reject(error);
                      } else if (results.affectedRows === 0) {
                        reject(new Error("Data not found"));
                      } else {
                        // Call sendMessage after successful order insertion
                        module.exports.sendMessage(data.userid, orderno, item.id, (emailError, emailResults) => {
                          if (emailError) {
                            console.error("Error sending email:", emailError);
                          }
                          resolve(results);
                        });
                      }
                    }
                  );
                });
              });
    
              // Execute all order insertions
              Promise.all(orderPromises)
                .then(() => callBack(null, "Payment Done"))
                .catch((error) => callBack(error));
            } else {
              return callBack("Payment data not inserted");
            }
          }
        );
      },
    sendMessage: (userid, orderno, foodid, callBack) => {
        // First, get the cheff_id from the food table using foodid
        pool.query(
            `SELECT chef_id FROM food WHERE id = ?`,
            [foodid],
            (err, foodResults) => {
                if (err) {
                    return callBack(err);
                } else if (foodResults.length === 0) {
                    return callBack("Food item not found");
                } else {
                    const cheffId = foodResults[0].chef_id;
                    
                    // Now, use the cheff_id to get the chef's email and name from the user table
                    pool.query(
                        `SELECT user.email as userEmail, user.name as userName, 
                        chef.email as chefEmail, chef.name as chefName
                 FROM user as user
                 JOIN user as chef ON chef.id = ?
                 WHERE user.id = ?`,
                        [cheffId, userid],
                        (err, results) => {
                            if (err) {
                                console.error('Database error:', err); // Log the error
                                return callBack(err);
                            }
                
                            if (results.length === 0) {
                                console.log('No data found for userid:', userid, 'and cheffid:', cheffid); // Log ids
                                return callBack("Data not found");
                            }
                
                            const { userEmail, userName, chefEmail, chefName } = results[0];
                
                            const mailOptionsUser = {
                                from: 'homefeast.food@gmail.com',
                                to: userEmail,
                                subject: 'Order tracking',
                                html: `Hi ${userName},<br>Your order has been sent to the specific chef.<br>Your order number is ${orderno}`,
                            };
                
                            const mailOptionsChef = {
                                from: 'homefeast.food@gmail.com',
                                to: chefEmail,
                                subject: 'New order received',
                                html: `Hi ${chefName},<br>You have received a new order.<br>Order number: ${orderno}`,
                            };
                
                            let emailResults = [];
                
                            // Send email to user
                            transporter.sendMail(mailOptionsUser, (errorUser, infoUser) => {
                                if (errorUser) {
                                    console.error('Error sending email to user:', errorUser);
                                    emailResults.push({ user: 'Failed', error: errorUser });
                                } else {
                                    emailResults.push({ user: 'Success', info: infoUser });
                                }
                
                                // Send email to chef
                                transporter.sendMail(mailOptionsChef, (errorChef, infoChef) => {
                                    if (errorChef) {
                                        console.error('Error sending email to chef:', errorChef);
                                        emailResults.push({ chef: 'Failed', error: errorChef });
                                    } else {
                                        emailResults.push({ chef: 'Success', info: infoChef });
                                    }
                
                                    // Return results after both emails have been sent
                                    return callBack(null, emailResults);
                                });
                            });
                        }
                    );
                }
            }
        );
    },
    

    
     getProductById:(id,callBack) => {
      pool.query(
          `select * from category where id = ?`,
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
            `select * from user_payment`,
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
        pool.query(`delete from user_payment where id=?`,
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
