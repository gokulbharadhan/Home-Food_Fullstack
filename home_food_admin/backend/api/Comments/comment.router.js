const { create,getCommentById } = require("./comment.controller");
const router = require("express").Router();


router.post("/:id/add", create)
        .get("/:id/get", getCommentById)


module.exports = router;

//localhost:3006/api/products/1  getdata




