const mongoose = require('mongoose');
const generate = require('../../../helpers/generate');
//khi một thằng đang nhập vào ta gắn thêm 1 cờ gì đó để những ông khác bt đc ông A đang on là statuson
const userSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token:String,
    phone:String,
    avatar:String,
    status:{
        type:String,
        default:'active'
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deleteAt:Date,
},
{
    timestamps:true
});
const User=mongoose.model('User',userSchema,'users');
module.exports = User;