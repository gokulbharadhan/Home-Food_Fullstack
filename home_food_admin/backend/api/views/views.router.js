const { create,getVideoViews } = require("./views.controller");
const router = require("express").Router();


router.post("/:id/add", create)
.get("/:id/get",getVideoViews)

module.exports = router;

//localhost:3006/api/products/1  getdata




