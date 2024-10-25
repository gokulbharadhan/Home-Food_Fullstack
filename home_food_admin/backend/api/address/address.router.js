const { createAddress, getAddressById , getProducts, updateAddress, deleteAddressId} = require("./address.controller");
const router = require("express").Router();


router.post("/add", createAddress)
        .get("/:id/get", getAddressById)
        .get("/", getProducts)
        .post("/:id/update", updateAddress)
        .delete("/:id/delete", deleteAddressId);

module.exports = router;

//localhost:3006/api/products/1  getdata




