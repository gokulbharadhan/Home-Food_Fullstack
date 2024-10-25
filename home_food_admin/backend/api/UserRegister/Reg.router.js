const { createReg, getRegById,updateImageById, getRegData,deleteById ,getCheffById} = require('./Reg.controller');
const router = require("express").Router();

router.post("/add", createReg)
        .get("/:id/get", getRegById)
       .get("/:id/getCheffId",getCheffById)
        .post("/:id/image", updateImageById)
        .get("/", getRegData)        
        .delete("/:id/delete",deleteById);


module.exports = router;


