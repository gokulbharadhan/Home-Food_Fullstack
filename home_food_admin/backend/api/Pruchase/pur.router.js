const { createProduct, getProductById , getProducts, updateProduct, getUser,deleteProductById} = require("./pur.controller");
const router = require("express").Router();


router.post("/add", createProduct)
        // .get("/:id/add", getProductById)
        .get("/", getProducts)
        .get("/user", getUser)
        .post("/:id/update", updateProduct)
        .delete("/:id/delete", deleteProductById);

module.exports = router;

//localhost:3006/api/products/1  getdata




