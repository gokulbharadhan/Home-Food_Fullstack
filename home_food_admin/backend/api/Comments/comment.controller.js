const { create, getCommentById } = require("./comment.services");

module.exports = {
    create:(req,res) => {  
        console.log('create') 
        const data=req.body;
        const id=req.params.id;
        create(data,id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getCommentById:(req,res) => {
        const id = req.params.id;
        getCommentById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
   
}