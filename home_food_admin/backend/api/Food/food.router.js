const { createProduct, getProductById , getProducts, updateProduct, deleteProductById,getProductByFood} = require("./food.controller");
const router = require("express").Router();


router.post("/add", createProduct)
        .get("/:id/get", getProductById)
        .get("/", getProducts)
        .get("/:id/foodid",getProductByFood)
        .post("/:id/update", updateProduct)
        .delete("/:id/delete", deleteProductById);

module.exports = router;

//localhost:3006/api/products/1  getdata




