module.exports=(query,countRecords,objectPagination)=>{
    // mogoose cung cấp hàm lấy giới hạn bao nhiêu SP là .limit Product.find(find).limit(4); sẽ lấy 4 sản phẩm đầu tiên
    //.skip là bỏ qua á 
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    if(query.limit){
        
        objectPagination.limitItems=parseInt(query.limit);
    }
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItems;

    const totalPage=Math.ceil(countRecords/objectPagination.limitItems);
    objectPagination.totalPage=totalPage

    return objectPagination 
}