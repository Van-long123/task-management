const User=require("../models/user.model")

// nhiệm vụ middleware này kiểm tra xem ở trong header của ông fe đưa lên có chứa token ko 
// khi viết theo kiểu api thì fe luôn gửi token lên khi api này là private 
module.exports.requireAuth=async (req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        const user=await User.findOne({
            token:token,
            deleted:false
        }).select('-password')
        if(!user){
            res.json({
                code:400,
                message:"Token không hợp lệ!"
            })
            return 
        }
        req.user=user 
        next()
        
    }
    else{
        res.json({
            code:400,
            message:"Vui lòng gửi kèm token!"
        })
    }
    
}