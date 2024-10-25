const { insertStatusVideo,getVideoLikes,getVideoStatus,updateLikes} = require("./status.controller");
const router = require("express").Router();


router.post("/:id/add", insertStatusVideo)
    .get("/:id/get",getVideoStatus)
    .get("/:id/likes",getVideoLikes)
    .post("/:id/update",updateLikes)
module.exports = router;

//localhost:3006/api/products/1  getdata




