module.exports=(query)=>{
    let objectSearch={
        keyword:"",
    };
    if(query.keyword){
        objectSearch.keyword=query.keyword.trim();
        objectSearch.regex=new RegExp(objectSearch.keyword,"i");//RegExp(key) dùng để tìm kiếm trong 1 chuỗi có đúng chữ ta search 
    }
    return objectSearch
}