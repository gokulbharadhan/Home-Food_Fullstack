const { insertViews ,getVideoViews} = require("./views.services");

module.exports = {
    create:(req,res) => {  
        
        const data=req.body;
        const id=req.params.id;
        insertViews(data,id, (err, results) => {
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
     getVideoViews:(req,res) => {
        console.log('view')
        const id = req.params.id;
        getVideoViews(id, (err, results) => {
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