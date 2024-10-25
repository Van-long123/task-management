const express=require('express')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const database=require('./config/database')
database.connect()
const route=require('./api/v1/routes/index.route')
const app = express();
app.use(cors())
const port=process.env.PORT;
app.use(cookieParser('DSADSAD'));//ko thêm DSADSAD vẫn đc tại app.use(flash()); yêu cầu thêm 1 cáu đó thông báo backend ko cần code 
// đoạn code bodyParser dành cho phần form // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended:false}))
// còn bây giờ ta gửi lên 1 chuỗi json nên sẽ dùng khác
// parse application/json
app.use(bodyParser.json())
// 
route(app)
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})