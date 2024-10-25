const {getAllVideos, createVideo,deleteVideo,updateVideo,getVideoById} = require("./vd.controller");
const router=require("express").Router();
router.post("/add",createVideo)
.get("/",getAllVideos)
.post("/:id/update",updateVideo)
.get("/:id/get",getVideoById)
.delete("/:id/delete",deleteVideo);
module.exports=router;




 