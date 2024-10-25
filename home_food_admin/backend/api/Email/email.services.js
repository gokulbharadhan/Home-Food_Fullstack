const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { genSaltSync, hashSync } = require("bcrypt");
const { callbackPromise } = require("nodemailer/lib/shared");

module.exports = {
    changepwd: (bodyData, callBack) => {
        if (bodyData.newPassword == bodyData.confirmPassword) {
            var email = bodyData.email;
            var newPassword = bodyData.newPassword;

            pool.query(
                `select password from user where email = ?`,
                [email],
                (err, results) => {
                    var queryData = results;
                    if (err) {
                        return callBack(err);
                    } else if (queryData.length == 0) {
                        return callBack("Unable to update your password..!", null);
                    } else {
                        pool.query(
                            `update user set password = ? where email = ?`,//query
                            [newPassword, email],//passing parameters
                            (err, results) => {//sending response
                                if (err) {
                                    return callBack(err);
                                } else if (results) {
                                    return callBack(null, "Password updated successfully..!")
                                } else {
                                    return callBack("Unable to update your password..!")
                                }
                            }
                        );
                    }
                }
            );
        } else {
            return callBack("Passwords dont match..!", null);
        }
    },
    forgotpwd: (body, callBack) => {
        pool.query(
            `select * from user where email = ?`,
            [body],
            (error, results) => {
                if (error) {
                    return callBack(error);
                } else if (results.length == 0) {
                    return callBack("data not found");
                } else if (results) {
                    return callBack(null, results);

                }
            }
        )
    },


 
 
    updatePasswordS: (data, callBack) => {
        pool.query(
            `select * from user where email = ?`
            [data.email],
            (error, results) => {
                if (results != "") {
                    pool.query(`update user set password = ? where email = ?`,
                        [
                            data.newPassword,
                            data.email
                        ],
                        (error, results) => {
                            if (error) {
                                return callBack(error);
                            } else {
                                message = "Password updated successfully";
                                return callBack(null, message);
                            }
                        }
                    );
                } else if (error) {
                    return callBack(error);
                }
                else {
                    error = "Email Id is not Registered";
                    return callBack(error);
                }
            }
        );
    },
   
    
  
   
    
};