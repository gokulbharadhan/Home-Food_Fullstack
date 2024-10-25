const { create,getVideoById,getVideos,deletes,updateVideo} = require("./vd.services");
module.exports={
    createVideo:(req,res)=>{
        const body=req.body;
        create(body,(err,resultes)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:resultes
                })
            }
           
        });
    },
    deleteVideo:(req,res)=>{
        const id = req.params.id;
        deletes(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
    },
    getAllVideos:(req,res)=>{
        getVideos((err,resultes)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:resultes
                })
            }
        })
    },
    getVideoById:(req,res)=>{
        const id = req.params.id;
        getVideoById(id,(err,resultes)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:resultes
                })
            }
        })
    },
    updateVideo:(req,res)=>{
        const data=req.body;
        const id = req.params.id;
        updateVideo(data,id,(err,resultes)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:resultes
                })
            }
        })
    }
}