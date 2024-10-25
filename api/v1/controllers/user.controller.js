const User=require('../models/user.model')
const ForgotPassword=require('../models/forgot-password.model')
const md5=require('md5')
const generateHelper=require('../../../helpers/generate')
const sendMailHelper=require('../../../helpers/sendMail')
module.exports.register=async (req,res)=>{
    req.body.password=md5(req.body.password)
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        res.json({
            code:400,
            message:"Email đã tồn tại"
        })
    }
    else{
        // const user=new User(req.body)
        // truyền kiểu ni an toàn hơn 
        const user=new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token:generateHelper.generateRandomString(30)
        })
        await user.save()
        const token=user.token
        res.cookie('token',token)
        res.json({
            code:200,
            message:"Tạo tài khoản thành công",
            //frontend tự lưu token này vào cookies 
            token:token
        })
    }
    
}

module.exports.login=async (req,res)=>{
    const email= req.body.email
    const password= req.body.password
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"Email không tồn tại!"
        })
        return 
    }
    if(user.password!==md5(password)){
        res.json({
            code:400,
            message:"Sai mật khẩu!"
        })
        return
    }
    const token=user.token 
    res.cookie('token',token)
    res.json({
        code:200,
        message:"Đăng nhập thành công!",
        token:token
    })

    
}
module.exports.forgotPassword=async (req,res)=>{
    const email= req.body.email
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"Email không tồn tại!"
        })
        return 
    }
    const otp=generateHelper.generateRandomNumber(8)
    const timeExpire=5;
    const objectForgotPassword={
        email: email,
        otp:otp,
        //Date.now() là milliseconds nên Date.now()+timeExpire*60 chỉ có 60s thôi
        expireAt:Date.now()+timeExpire*60*1000,
    }
    const forgotPassword=new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    const subject="Mã OTP xác minh lấy lại mật khẩu"
    const html=`Mã OTP để lấy lại mật khẩu là <b>${otp}</b> .Thời gian sử dụng là ${timeExpire} phút`
    sendMailHelper.sendMail(email,subject,html)

    res.json({
        code:200,
        message:"Đã gửi mã OTP qua email!"
    })

    
}
module.exports.passwordOtp=async (req,res)=>{
    const email= req.body.email
    const otp= req.body.otp

    const result=await ForgotPassword.findOne({
        email:email,
    })
    if(!result){
        res.json({
            code:400,
            message:"Email không tồn tại!"
        })
        return 
    }
    if(result.otp!==otp){
        res.json({
            code:400,
            message:"OTP không hợp lệ!"
        })
        return 
    }
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    // đổi mật khẩu đăng nhập mới đổi đc cho nên nhập otp thành công cho đăng nhập luôn
    const token=user.token 
    res.cookie('token',token)

    res.json({
        code:200,
        message:"Xác thực thành công!",
        token:token
    })
}

module.exports.resetPassword=async (req,res)=>{
    const token=req.body.token;
    const password=req.body.password;
    // đoạn này check validate mới đung 
    const user=await User.findOne({
        token:token,
        deleted:false
    })
    if(!user){
        res.json({
            code:400,
            message:"Token ko hợp lệ!"
        })
        return 
    }

    
    if(user.password===md5(password)){
        res.json({
            code:400,
            message:"Vui lòng nhập mật khẩu mới khác mật khẩu cũ!"
        })
        return
    }
// đoạn này check validate mới đung 
    await User.updateOne({
        token:token
    },{password:md5(password)})
    res.json({
        code:200,
        message:"Đổi mật khẩu thành công!"
    })
}

module.exports.detail=async(req,res)=>{
    try {
        // nếu mà token ko đúng thì user là null thôi ko lọt vào cathc
        res.json({
            code:200,
            message:"Thành công!",
            info:req.user
        })
    } catch (error) {
        res.json({
            code:400,
        })
    }
    
}

module.exports.list=async(req,res)=>{
    const users=await User.find({
        deleted:false
    }).select('fullName email')
    res.json({
        code:200,
        message:"Thành công!",
        users:users
    })
}