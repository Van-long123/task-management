module.exports.create=(req,res,next)=>{
    if(!req.body.title){
        res.json({
            code:400,
            message:"Vui lòng nhập tiêu đề!"
        })
        return;
    }
    if(req.body.title.length<6){
        res.json({
            code:400,
            message:"Vui lòng nhập tiêu đề dài hơn 6 ký tự!"
        })
        return;
    }
    if(req.body.listUser.length<1){
        res.json({
            code:400,
            message:"Vui lòng chọn ít nhất 1 người dùng!"
        })
        return;
    }
    next();
}
