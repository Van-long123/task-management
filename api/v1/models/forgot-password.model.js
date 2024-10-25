const mongoose = require('mongoose');
const forgotPasswordSchema=new mongoose.Schema({
    email:String,
    otp:String,
    // https://mongoosejs.com/docs/api/schemadateoptions.html
    expireAt:{
        type:Date,
        expires:0
    },//thời gian hết hạn là kiểu tới h là sẽ xóa bản ghi
},
{
    timestamps:true
});
const ForgotPassword=mongoose.model('ForgotPassword',forgotPasswordSchema,'forgot-password');
module.exports = ForgotPassword;