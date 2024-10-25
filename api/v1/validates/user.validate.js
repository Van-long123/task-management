module.exports.register=(req,res,next)=>{
    if(!req.body.fullName){
        res.json({
            code:400,
            message:"Vui lòng nhập họ tên!"
        })
        return;
    }
    if(!req.body.email){
        res.json({
            code:400,
            message:"Vui lòng nhập email!"
        })
        return;
    }
    if(!req.body.password){
        res.json({
            code:400,
            message:"Vui lòng nhập mật khẩu!"
        })
        return;
    }
    next()
}

module.exports.login=(req,res,next)=>{
    if(!req.body.email){
        res.json({
            code:400,
            message:"Vui lòng nhập email!"
        })
        return;
    }
    if(!req.body.password){
        res.json({
            code:400,
            message:"Vui lòng nhập mật khẩu!"
        })
        return;
    }
    next()
}
module.exports.otp=(req,res,next)=>{
    if(!req.body.email){
        res.json({
            code:400,
            message:"Vui lòng nhập email!"
        })
        return;
    }
    if(!req.body.otp){
        res.json({
            code:400,
            message:"Vui lòng nhập OTP!"
        })
        return;
    }
    next()
}
module.exports.forgotPassword=(req,res,next)=>{
    if(!req.body.email){
        res.json({
            code:400,
            message:"Vui lòng nhập email!"
        })
        return;
    }
    next()

}
module.exports.resetPassword=(req,res,next)=>{
    if(!req.body.password){
        res.json({
            code:400,
            message:"Vui lòng nhập mật khẩu!"
        })
        return;
    }
    next()
}