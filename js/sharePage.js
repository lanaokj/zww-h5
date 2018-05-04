;(function(){
    //获取url中指定name的值
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }else{
            return null;
        } 
    };
    var token = GetQueryString('token');
    var userId = GetQueryString('userId');
    var index = GetQueryString('index');
    // alert(1);
    if(index == 'null'){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/share/QRCodeImgUrl',
            data:{
                token:token,
                memberId:userId,
                version:1,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    window.location.href = data.resultData.shareUrl;
                }
            }
        })
    }else{
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/share/QRCodeImgUrl',
            data:{
                token:token,
                memberId:userId,
                version:1,
                index: index,                                
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    window.location.href = data.resultData.shareUrl;
                }
            }
        })
    }
}())