const { createProduct, getProductById , getProducts, updateProduct, getdata,deleteProductById} = require("./prod.controller");
const router = require("express").Router();


router.post("/add", createProduct)
        .get("/:id/add", getProductById)
        .get("/", getProducts)
        .get("/:categoryid/get", getdata)
        .post("/:id/update", updateProduct)
        .delete("/:id/delete", deleteProductById);

module.exports = router;

//localhost:3006/api/products/1  getdata




