(function(){

    var user = JSON.parse(localStorage.getItem('info'));
    var token = localStorage.getItem('token');
    var chargeArr = [];    
    var wechat = localStorage.getItem('wechat');
    $('.index').on('click',function(){
        window.location.href = './index_room.html';
    })
    //微信分享jssdk
    $.ajax({
        type:'post',
        url:ip+'/icrane/api/wx/onMenuShareTimeline',
        data:{
            'url':window.location.href.split('#')[0],
        },
        dataType:'json',
        success:function(res){
            console.log(res)
            var timestamp = res.resultData.timestamp,
                nonceStr = res.resultData.noncestr,
                signature = res.resultData.sign,
                appId = res.resultData.appId;
            wx.config({
                // url:window.location.href.split('#')[0],
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
                // alert(1);
                //分享到朋友
                wx.onMenuShareAppMessage({
                    title: '哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                    desc: '在线抓娃娃,点开就能玩!抓到了还一个包邮送到家!超多娃娃!激光瞄准', // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    // 用户确认分享后执行的回调函数
                        // alert(1);
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                        // alert(2);
                    }
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: '哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title:'哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                    desc: '超多萌娃!激光瞄准!一个就包邮!网搜抓娃娃,赶紧点开一起玩吧!', // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id, // 分享链接
                    imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ空间
                wx.onMenuShareQZone({
                    title: '哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                    desc: '超多萌娃!激光瞄准!一个就包邮!网搜抓娃娃,赶紧点开一起玩吧!', // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id, // 分享链接
                    imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                });
                wx.error(function(){
                    // alert(2);
                });
            })
        }
    })
    // alert(JSON.stringify(user));
    
    //     code = localStorage.getItem('code');
    // var data = localStorage.getItem('data');
    //     alert(data);
    // alert(user.member.id)
    // alert(token);
    // alert(user.member.id);
    // $(document).ready(function(){  
    //     $("*").click(function(){  
    //       var nowTime = new Date().getTime();
    //       var clickTime = $(this).attr("ctime");
    //       if( clickTime != 'undefined' && (nowTime - clickTime < 301)){
    //         //   alert('操作过于频繁，稍后再试');
    //           return false;
    //        }else{
    //           $(this).attr("ctime",nowTime);
    //         //   alert('提交成功');
    //        };
    //      });
    //    });
    // window.ontouchstart = function(e) { 
    // e.preventDefault(); 
    // };
    //禁止用户缩放
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){  
        event.preventDefault();  
        } 
    }) 
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false) 
   window.onload = function(){
       /*      $.ajax({
            type:'post',
            url:ip+'/icrane/api/doll/getDollListPage',
            data:{
                "token":token,
                "memberId":user.id,
                "TopicType":0,
            },
            dataType:'json',
            success:function(data){
                if(!data.success){
                    mizhu.alert('','您的登陆已失效,请重新登陆');
                    localStorage.clear();
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcb4254f4b131fc12&redirect_uri=http%3A%2F%2Flanao.nat300.top/icrane/api/h5login&response_type=code&scope=snsapi_userinfo#wechat_redirect'
                }
            }
        })*/
        // if(user.member.inviteFlgWeb){
        //     $('.invite').remove();
        // }
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/member/info/getUserInfo',
            data:{
                "memberId":user.id,
                // "dollId":room.id,
                "token":token,
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if(data.success){
                    var res = data.resultData;
                    localStorage.setItem('info',JSON.stringify(res));
                    var info = '';
                    if(res.gender == 'n'){
                        if(res.iconRealPath == ''){
                            info = '<div class="headPic"><img src="../images/logo@2x.png" alt=""><img class="sex" src="./images/xing_bie_nan、@2x.png" alt=""></div><span class="userName">'+res.name+'</span><div class="idAndCatch"><span class="id">ID:'+res.memberID+'</span><span class="line"></span><span>抓取次数:'+res.catchNumber+'</span></div>'
                        }else{
                            info = '<div class="headPic"><img src="'+res.iconRealPath+'" alt=""><img class="sex" src="./images/xing_bie_nan、@2x.png" alt=""></div><span class="userName">'+res.name+'</span><div class="idAndCatch"><span class="id">ID:'+res.memberID+'</span><span class="line"></span><span>抓取次数:'+res.catchNumber+'</span></div>'
                        }
                    }else{
                        if(res.iconRealPath == ''){
                            info = '<div class="headPic"><img src="../images/logo@2x.png" alt=""><img class="sex" src="./images/xing_bie_nv@2x.png" alt=""></div><span class="userName">'+res.name+'</span><div class="idAndCatch"><span class="id">ID:'+res.memberID+'</span><span class="line"></span><span>抓取次数:'+res.catchNumber+'</span></div>'
                        }else{
                            info = '<div class="headPic"><img src="'+res.iconRealPath+'" alt=""><img class="sex" src="./images/xing_bie_nv@2x.png" alt=""></div><span class="userName">'+res.name+'</span><div class="idAndCatch"><span class="id">ID:'+res.memberID+'</span><span class="line"></span><span>抓取次数:'+res.catchNumber+'</span></div>'
                        }
                    }
                    $(info).appendTo($('header'));
                    $('.num').text(res.coins);
                    $('#mycoins').text(res.coins);
                }
            }
        })
    }
    $('.accept').on('click',function(){
        var inviteCode = $('.inviteCode').val();
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/charge/invite',
            data:{
                "memberId":user.id,
                "inviteCode":inviteCode,
                "token":token,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    // $('.inviteCode').val('领取奖励成功~');
                    mizhu.alert('',data.message)
                    
                }else{
                    // $('.inviteCode').val('请勿重复领取或输入正确的邀请码').css('fontSize','12px');
                    // $('.accept').css('background','#666');
                    mizhu.alert('',data.message)
                }
            }
        })
    })
    $('#recharge1,#recharge').on('click',function(){
        $('.hideContent').show();
        $('body').css('overflow','hidden');
        $('html').css('overflow','hidden');
        // $('body').on('touchmove',function(event){
        //     event.preventDefault();
        // })
    })
    $('.close').on('click',function(){
        $('.hideContent').hide();
        $('body').css('overflow','visible');
        $('html').css('overflow','visible');
        // $('body').unbind();
        
    })
    $('.call').on('click',function(){
        $('.hideContact').show();
        $('body').css('overflow','hidden');
        $('html').css('overflow','hidden');
    })
    $('#iknow').on('click',function(){
        $('.hideContact').hide();
        $('body').css('overflow','visible');
        $('html').css('overflow','visible');        
    })
    // $('.invite').on('click',function(){
    //     $('.hideInvite').show();
    // })
    $('.close_').on('click',function(){
        $('.hideInvite').hide();
        $('.inviteCode').val('');
        $('.accept').css('background','#e4a6c6');
    })
    // $('.outLogin').on('click',function(){
    //     $.ajax({
    //         type:'post',
    //         url:ip+'/icrane/api/charge/invite',
    //         data:{
    //             "id":user.id,
    //             // "inviteCode":inviteCode,
    //             "token":token,
    //         },
    //         dataType:'json',
    //         success:function(data){
    //             localStorage.clear();                
    //             mizhu.alert('','您已退出登录~');
    //             window.location.href = './index.html'
    //         }
    //     })
    // })
    //充值列表
    function reCharge(){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/chargeRules/getChargeRules',
            dataType:'json',
            data:{
                "token":token
            },
            success:function(data){
                if(data.success){
                    var chargeList = data.resultData;
                    var chargeHtml = '';
                    console.log(chargeList);
                    for(var i = 0; i<chargeList.length;i++){
                        if(chargeList[i].superTicketCharge == 0 &&chargeList[i].superTicketOffer==0 &&chargeList[i].chargeType==0||chargeList[i].chargeType==4){
                        chargeArr.push(chargeList[i]);
                            chargeHtml +='<li><div class="coins"><div class="coinsNum"><div><span class="font24">'+chargeList[i].coinsCharge+'+'+chargeList[i].coinsOffer+'</span>   <span class="font30">Hi币</span></div><span class="coinsName">'+chargeList[i].chargeName+'</span></div><span class="dec">'+chargeList[i].description+'</span></div><div class="chargePrice">¥'+chargeList[i].chargePrice+'</div></li>'
    
                        }
                    }
                    console.log(chargeHtml);
                    console.log(chargeArr);
                    $(chargeHtml).appendTo($('.list'))
                }
            }
        });
    }
    reCharge();
    //微信支付
    // if(wechat !== 'wechat'){
    //     $('.list').on('click','li',function(){
    //         var $index = $(this).index();
    //         var this_index = chargeArr[$index].id;
    //         console.log(this_index);
    //         // alert(wechat)
            
    //         $.ajax({
    //             type:'post',
    //             url:ip+'/icrane/api/wx/pay',
    //             data:{
    //                 "token":token,
    //                 "chargeruleid":this_index,
    //                 "memberId":user.id,
    //                 "IP":returnCitySN['cip'],
    //             },
    //             dataType:'json',
    //             success:function(res){
    //                 console.log(res);
    //                 // alert(1);
    //                 if(res.success){
    //                     window.location.href = res.resultData.mwebUrl+'?'+Math.random();
    //                     // console.log(data);
    //                     // alert('充值成功后记得刷新页面查看哦~')
    //                 }
    //             }
    //         })
    //     })
    // }else{
        $('.list').on('click','li',function(){
            var $index = $(this).index();
            var this_index = chargeArr[$index].id;
            // console.log(this_index);
            // alert(user.member.openId);
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/wx/pay',
                data:{
                    "token":token,
                    "chargeruleid":this_index,
                    "memberId":user.id,
                    "IP":'老子是公众号'
                },
                dataType:'json',
                success:function(res){
                    // alert(JSON.stringify(res));
                    // alert(1);
                    if(res.success){
                        // window.location.href = res.resultData.mwebUrl+'?'+Math.random();
                        // var res = JSON.stringify(res);
                        var data = JSON.stringify(res.resultData);
                        var result = JSON.parse(data);
                        var outTradeNo = result.outTradeNo;
                        // alert(data);
                        // alert(result);
                        // alert(result.paySign);
                        // alert(result.prepayId);
                        
                        // alert('充值成功后记得刷新页面查看哦~')
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId":"wxcb4254f4b131fc12",     //公众号名称，由商户传入
                                "timeStamp":result.timeStamp,         //时间戳，自1970年以来的秒数     
                                "nonceStr":result.nonceStr, //随机串     
                                "package":"prepay_id="+result.prepayId,     
                                "signType":"MD5",         //微信签名方式：     
                                "paySign":result.paySign //微信签名 
                            },
                            function(res){
                                // alert(JSON.stringify(res));
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                    $.ajax({
                                        type:'post',
                                        url:ip+'/icrane/api/charge/successfulRechargeRecords',
                                        data:{
                                            "token":token,
                                            "memberId":user.id,
                                            mchOrderNo:outTradeNo,
                                        },
                                        dataType:'json',
                                        success:function(data){
                                            mizhu.alert('',data.message);
                                            chargeArr=[];
                                            $('.list').empty();
                                            reCharge();
                                        }
                                    })
                                    $.ajax({
                                        type:'post',
                                        url:ip+'/icrane/api/member/info/getUserInfo',
                                        data:{
                                            "memberId":user.id,
                                            // "dollId":room.id,
                                            "token":token,
                                        },
                                        success:function(data){
                                            var res = data.resultData;
                                            $('.num').text(res.coins);
                                            $('#mycoins').text(res.coins);
                                        }
                                    })
                                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                    mizhu.alert('','您取消了支付');
                                }else{
                                    mizhu.alert('','支付失败')
                                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                            }
                        );
                        if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                        }else{
                        onBridgeReady();
                        }
                        // alert(1);
                    }else{
                        mizhu.alert('',res.message);
                    }
                }
            })

        })
    // }

})()