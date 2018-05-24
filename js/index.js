
    var token = localStorage.getItem('token');
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
    var channel = GetQueryString('channel');
    var memberId = GetQueryString('memberID');
    // alert(memberId);
    if(channel !== 'QL'){
        channel = 'H5'
    }
    //验证用户是否登录，如果已经登录，直接进入首页
    if(token){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/doll/getDollListPage',
            data:{
                "token":token,
                "TopicType":'全部',
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
                    if(is_weixin){
                        localStorage.setItem('channel',channel);
                        localStorage.setItem('wechat','wechat');
                    }
                    window.location.href = './index_room.html?'+new Date().getTime();
                }else{
                    localStorage.clear();
                    localStorage.setItem('wechat','wechat');
                    // window.location.href = 'http://p.365zhuawawa.com/?r=app/red-packet&key=182a83ef3f34185d329562a36a1bf886';
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcb4254f4b131fc12&redirect_uri=http%3A%2F%2Flanao.nat300.top/icrane/api/h5login&response_type=code&scope=snsapi_userinfo#wechat_redirect';
                }
            }
        })
    }else{
        $('.close_').on('click',function(){
            $('.hideInvite').hide();
            $('.inviteCode').val('');
            $('.accept').css('background','#e4a6c6');
            window.location.href = './index_room.html';
        })
        //判断用户是否是在微信中打开
        var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
        if(is_weixin){
            $('.wxlogin').show();
            $(function(){
                //获取渠道号 channel
                var code = GetQueryString("code");
                var TIME = new Date().getTime();
                if(code){
                    localStorage.setItem('code',code);
                    // alert(code);
                    localStorage.setItem('channel',channel);
                    // localStorage.setItem('code',code);
                    localStorage.setItem('wechat','wechat');
                    $.ajax({
                        type:'post',
                        url:ip+'/icrane/api/wx/getAccessToken',
                        data:{
                            code:code,
                            head:'老子是H5',
                            channel:'wechat/'+channel,
                            // lastLoginFrom: ,
                            phoneModel:'unknow',
                            // memberId:memberId,
                        },
                        dataType:'json',
                        success:function(data){
                            // alert(JSON.stringify(data));
                            localStorage.setItem('wechat','wechat');
                            // alert(JSON.stringify(data.resultData));
                            localStorage.setItem('token',JSON.parse(JSON.stringify(data.resultData.token)));
                            localStorage.setItem('user',JSON.stringify(data.resultData));
                            // window.location.href = "http://h5.lanao.fun/lanaokj/index_room.html";
                        //获取注册时间  时间戳 判断用户是否首次登陆
                            var registerDate = data.resultData.member.registerDate;
                            var registerDate = Date.parse(registerDate.replace(/-/g,"/"));
                            var lastLoginDate = data.resultData.member.lastLoginDate;
                            var lastLoginDate = Date.parse(lastLoginDate.replace(/-/g,"/"));
                            if((lastLoginDate - registerDate)/1000 < 10 &&!data.resultData.member.inviteFlgWeb){
                                $('.hideInvite').show();
                                $('.accept').on('click',function(){
                                    var inviteCode = $('.inviteCode').val();
                                    $.ajax({
                                        type:'post',
                                        url:ip+'/icrane/api/charge/invite',
                                        data:{
                                            "memberId":data.resultData.member.id,
                                            "inviteCode":inviteCode,
                                            "token":data.resultData.token,
                                        },
                                        dataType:'json',
                                        success:function(data){
                                            if(data.success){
                                                // $('.inviteCode').val('领取奖励成功~');
                                                mizhu.alert('',data.message)
                                                setTimeout(function(){
                                                    window.location.href = './index_room.html'
                                                },1000)
                                            }else{
                                                // $('.inviteCode').val('请勿重复领取或输入正确的邀请码').css('fontSize','12px');
                                                // $('.accept').css('background','#666');
                                                mizhu.alert('',data.message)
                                            }
                                        }
                                    })
                                })
                            }else{
                                window.location.href = './index_room.html?'+new Date().getTime();
                            }
                            // console.log((lastLoginDate - registerDate)/1000);
                        },
                        error:function(){
                            mizhu.alert('','登陆失败');
                        }
                    })
                }else{
                   // window.location.href = 'http://p.365zhuawawa.com/?r=user/h5-wechat-login-t&url=http://h5.lanao.fun/lanaokj/&channel='+channel+'&memberID='+memberId;
                }
                // console.log(true);
                // return true;
            });
        }else{
            $('.container').show();
            $(function(){
              //  console.log(false);
                return false;
            });
        }
    }
    window.onload=function(){
        
        ///禁止用户缩放
        document.addEventListener('touchstart',function (event) {
            if(event.touches.length>1){
            event.preventDefault();  
            }
        });
        var lastTouchEnd=0;  
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            lastTouchEnd=now;  
        },false);
        
    };
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    $('.login-icon').on('touchend',function(){
        // alert(1);
        $('.mainpage').hide(100);
        $('.login_page').show().animate({
            left:'0'
        })
        // $.ajax({
        //     type:'post',
        //     url:ip+'/icrane/api/doll/getDollListPage',
        //     data:{
        //         "token":token,
        //         "TopicType":'全部',
        //     },
        //     dataType:'json',
        //     success:function(data){
        //         if(data.success){
        //             window.location.href = './index_room.html?'+new Date().getTime();
        //         }else{
        //             alert('登陆已失效，请重新登陆哦~');
        //         }
        //     }
        // })
    });
    $('.back,.btn_cancle').on('touchend',function(){
        $('.login_page').animate({
            left:'7.5rem'
        },function(){
            $('.mainpage').show();
            $('.login_page').hide();
            window.location.reload();
        })
    });
    //判断是否为手机号 不是则获取验证码按钮不可点击
    $(document).on('input propertychange','.num_box',function(e){
        if (e.type === "input" || e.orignalEvent.propertyName === "value") {
           // console.log(this.value.length);
            if(this.value.length == 11){
                if(myreg.test(this.value)){
                    // common.tips({msg:'请输入正确手机号'});
                    $('.getCode_box').removeAttr('disabled').css('background','#fff');
                    $('.btn_login').removeAttr('disabled').css('background','#e4a6c6');
                    return;
                }
            }else{
                $('.getCode_box').attr('disabled','true').css('background','gray')
            }
        }
    });
    // new invokeSettime("#btn");
    // $('.getCode_box').on('touchend',sendCode(this));

    //没输入手机号时提醒用户输入手机号
    var btn_login = $('.btn_login');
    var telNum = $('.num_box');
    var tips = $('.tips');
    // $('.btn_login').on('touchend',function(){
    //     if($('.num_box').val(   ) == ''){
    //         // $('.tips').show();
    //         alert('请输入正确的手机号码');
    //         return false;
    //     }
    // })
//获取验证码方法
function invokeSettime(obj){
    var countdown=60;
    settime(obj);
    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled",false);
            $(obj).text("获取验证码");
            countdown = 60;
            return;
        } else {
            $(obj).attr("disabled",true);
            $(obj).text("(" + countdown + ") s 重新发送");
            countdown--;
        }
        setTimeout(function() {
            settime(obj) }
        ,1000)
    };
    var telNumber = $('.num_box').val();
   // console.log(telNumber);
    $.ajax({
        type:'post',
        url:ip+'/icrane/api/member/getSmsCodeLogin',
        data:{
            'mobile':telNumber,
        },
        dataType:'json',
        success:function(data){
            console.log(data)
            if(data.success){
                console.log(data);
            }else{
                mizhu.alert('',data.message);
            }
        },
    })
};
//登陆
    $('.btn_login').on('click',function(){
        var telNumber = $('.num_box').val();
        var code = $('.code_box').val();
       // console.log(telNumber.length);
        if(telNumber.length == 11){
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/member/smsCodeLogin',
                data:{
                    'mobile':telNumber,
                    'smsCode': code,
                    'channel':'h5/'+channel,
                },
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    if(data.success){
                        console.log(data);
                        var user = data.resultData;

                        // localStorage.setItem('memberId',user.member.id);
                        var token = data.resultData.token;
                        localStorage.setItem('token',token);
                        localStorage.setItem('userId',user.member.id);
                        $.ajax({
                            type:'post',
                            url:ip+'/icrane/api/member/info/getUserInfo',
                            data:{
                                "memberId":user.member.id,
                                // "dollId":room.id,
                                "token":token,
                            },
                            dataType:'json',
                            success:function(data){
                                var res = data.resultData;
                                if(data.success){
                                    localStorage.setItem('info',JSON.stringify(res));
                                    // window.location.href = './index_room.html';
                                    window.location.href = "./index_room.html";
                                    
                                }
                            }
                        })
                        // localStorage.setItem('token',token);
                    }else{
                        alert(data.message);
                        return false;
                    }
                },
            })
        }else{
            mizhu.alert('','手机号码格式错误');
        }
    })
function isPoneAvailable(str) {  
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(str)) {  
        return false;  
    } else {  
        return true;  
    }  
}
