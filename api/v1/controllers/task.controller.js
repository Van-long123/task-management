const Task=require('../models/task.model')
const searchHelper=require("../../../helpers/search")
const paginationHelper=require("../../../helpers/pagination")
module.exports.index=async(req,res)=>{
    console.log(req.user.id)
    let find={
        deleted:false,
        $or:[
            {'createdBy.user_id':req.user.id},
            {listUser:req.user.id}
        ]
        
        // listUser:req.user.id
    }
    // Bộ lọc theo trạng thái
    if(req.query.status){
        find.status=req.query.status
    }
    // Bộ lọc theo trạng thái

    // sort
    let sort={}
    // từ a-z là asc tăng dần
    if(req.query.sortKey&&req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue
    }

    // sort

    //Search
    const objectSearch=searchHelper(req.query)
    if(req.query.keyword){
        find.title=objectSearch.regex;
    }
    //end search

    // Pagination 
    const countTasks=await Task.countDocuments(find); //đem qua bên kia sẽ lỗi nếu thêm async vào trước function cũng lỗi vì bên này có 1 async rồi
    let objectPagination=paginationHelper(req.query,countTasks,
        // truyền object sang vì thằng này tách ra để dùng chung ví dụ này hiển thị 4 mà bên product client hiển thị 6 sản phẩm thì sao 
        {
            currentPage:1,
            limitItems:2
        }
    );
    // end Pagination 

    
    const tasks=await Task.find(find).sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    // }).select('title status timeStart timeFinish')
    // res.render() là để render ra giao diện pug xong ta trả mảng tasks cho pug
    // nhưng bay giờ ta lấy đc data xong trả cho frontend là xong còn việc hiển thị ra view là của frontend
    // để trả về cho frontend chuỗi json thì dùng res.json() là xong
    res.json(tasks)//lúc này chỉ cần front nó truy cập vào link /task này ta sẽ trả cho ổng ấy chuỗi json
    //  là nó có thể lấy đc chuỗi json

}

module.exports.detail=async(req,res)=>{
    try {
        const task=await Task.findOne({
            _id:req.params.id,
            deleted:false
        })
        res.json(task)//lúc này chỉ cần front nó truy cập vào link /task này ta sẽ trả cho ổng ấy chuỗi json
    } catch (error) {
        res.json("ko tìm thấy")
    }

}
module.exports.changeStatus = async (req,res)=>{
    // ví dụ nó đổi trạng thái mà ko nằm trong 5 thằng nớ (doing,initial...)
    // thì tạo 1 colection status lưu title,status (title:đang làm việc...)
    // trước khi thêm check xem value status có trong db ko rồi mới thêm 
    try {
        const id=req.params.id
        const status=req.body.status
        await Task.updateOne({
            _id:id,
        },{
            status:status
        })
        res.json({
            //success 
            code:200,
            message:"cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Ko tồn tại"
        })
    }
    
}

module.exports.changeMulti = async (req,res)=>{
    try {
        const {ids,key,value }=req.body;
        switch(key) {
            case 'status':
                await Task.updateMany({ _id: { $in : ids } }, { status:value})
                res.json({
                    code:200,
                    message:"Cập nhật trạng thái thành công"
                })
                break;
            case 'delete':
                await Task.updateMany({ _id: { $in : ids } }, { deleted:true,deletedAt:new Date()})
                res.json({
                    code:200,
                    message:"Xóa thành công"
                })
                break;
            default:
                res.json({
                    code:401,
                    message:"Ko tồn tại"
                })
                break;
        }
        
    } catch (error) {
        res.json({
            code:400,
            message:"Ko tồn tại"
        })
    }
}
// tự thêm validate 
module.exports.create=async (req,res)=>{
    try {
        if(req.body.taskParentId){
            const taskParent=await Task.findOne({
                _id:req.body.taskParentId
            })
            if(!taskParent){
                res.json({
                    code:400,
                    message:"Task cha không tồn tại!",
                })
                return 
            }
        }
        
        req.body.createdBy={
            user_id:req.user.id
        }
        const task=new Task(req.body)
        await task.save()
        
        res.json({
            code:200,
            message:"Tạo thành công!",
            data:task
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Lỗi!",
        })
    }
}
module.exports.edit=async (req,res)=>{
    try {
        const id=req.params.id
        await Task.updateOne({
            _id:id,
            deleted:false
        },req.body)
        res.json({
            code:200,
            message:"Cập nhật thành công!"
        })
    } catch (error) {
        res.json("Lỗi!")
    }
}
module.exports.delete=async (req,res)=>{
    try {
        const id=req.params.id
        await Task.updateOne({
            _id:id,
            deleted:false
        },{
            deleted:true,
            deletedAt:new Date()
        })
        res.json({
            code:200,
            message:"Xóa thành công!"
        })
    } catch (error) {
        res.json("Lỗi!")
    }
}