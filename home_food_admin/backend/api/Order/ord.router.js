const { createProduct, getProductById , getProducts, updateProduct, deleteProductById,getAllProduct,updageOrderById,upgradeUserStatus} = require("./ord.controller");
const router = require("express").Router();


router.post("/add", createProduct)
.post("/:id/upgrade",updageOrderById)
.post("/:id/upgradeuser",upgradeUserStatus)
        .get("/:id", getProductById)
        .get("/:id/get", getProducts)

        .post("/:id/update", updateProduct)
        .delete("/:id/delete", deleteProductById)
        .get("/",getAllProduct);

module.exports = router;

//localhost:3006/api/products/1  getdata




