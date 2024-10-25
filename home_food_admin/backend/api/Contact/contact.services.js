const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { genSaltSync, hashSync } = require("bcrypt");
const { callbackPromise } = require("nodemailer/lib/shared");

module.exports = {
   
    details: (body, callBack) => {
        pool.query(
            `insert into contact(subject,message,user_id) values(?,?,?)`,
            [
                body.subject,
                body.message,
                body.userid
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }else if (results) {
                    return callBack(null, results);

                }
            }
        )
    },


 
 
}