const a =  {
    formateDate(time){
        if(time==='') return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    },

    pagination(data,callback){
        console.log('page',data);
        return {
            onChange:(current) => {
                callback(current)
            },
            current:data.resule.page,
            pageSize: data.resule.page_size,
            total:data.resule.total,
            showTotal: ()=>{
                return `共${data.resule.total}条`
            },
            showQuickJumper:true
        }
    }
}

export default a