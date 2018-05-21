;(function(){

    var wechat = localStorage.getItem('wechat');
    var token = localStorage.getItem('token');    
    var userId = localStorage.getItem('userId'); 
    var user = JSON.parse(localStorage.getItem('info')); 
    var index = localStorage.getItem('index'); 
    //轮播效果
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay:3000,
        autoplayDisableOnInteraction : false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        
    });
    //载入页面时，渲染第一种主题以及房间列表
    // var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
    // if(is_weixin){
    //     $('header').hide();
    //     // $('.status').style.lineHeight = normal;
    //     localStorage.setItem('wechat','wechat');
    // }
    var topicName = []; //列表组
    var topictype = [];

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
    // var user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('type',0);
    var type = localStorage.getItem('type');
    //是否有h5fudanzhexue渠道号,如果有 则弹出年会专享兑换码框框//
    var channel = localStorage.getItem('channel');
    //下载判断//
    var u = navigator.userAgent;
    var chargeArr = [];
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    function yearConfirm(){
        // var r = confirm('发送弹幕需要下载APP,您确定要下载吗?');
        // if(r){
            if(isiOS){
                window.open("https://itunes.apple.com/cn/app/365%E6%8A%93%E5%A8%83%E5%A8%83/id1314921684?mt=8");
            }else{
                window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.wanyiguo.zww365");
            }
        // }
    }
    (function(){
        // if(channel == 'h5fudanzhexue'){
        //     $('.yearParty').css('display','flex');
        // }
        // $('#getCoins').on('click',function(){
        //     var cdkey = $('.code').val();        
        //     console.log(cdkey);
        //     $('.code').val('努力兑换中~')
        //     $.ajax({
        //         type:'post',
        //         url:ip+'/icrane/api/redeemCode/prize',
        //         data:{
        //             "token":token,
        //             "memberId":user.member.id,
        //             'cdkey':cdkey,
        //         },
        //         dataType:'json',
        //         success:function(data){
        //             console.log(data);
        //             if(data.success){
        //                 $("#getCoins").unbind();
        //                 $('.pinkText').text('666Hi币到账,快去抓年货吧!');
        //                 $('#getCoins').text('我要抓');
        //                 $('.code').val('领取成功!')
        //                 localStorage.removeItem('channel');
        //                 $('#getCoins').on('click',function(){
        //                     $('.yearParty').hide();
        //                 })
        //             }else{
        //                 $('.code').val('');
        //                 mizhu.alert('',data.message);
        //             }
        //         }
        //     })
        // })
        // $('.closeHide').on('click',function(){
        //     $('.yearParty').hide();
        // })
        // $('.close_').on('click',function(){
        //     $('.hideInvite').hide();
        // })
        //填入邀请码

    })();
    //发送请求获取第一个房间列表
    $.ajax({
        type:'post',
        url:ip+'/icrane/api/doll/getH5DollList',
        data:{
            "token":token,
            "TopicType":0,
            'memberId':userId,
        },
        dataType:'json',
        success:function(data){
            if(data.success){
                $('.loading').hide();
                var list = data.resultData;
                console.log(list);
                var roomListHtml = ''
                for(var i = 0; i < list.length ; i ++){
                    roomListHtml += '<div class="room-game"><img src="'+list[i].tbimgRealPath+'" alt=""><span class="wawa-name">'+list[i].name + '</span><div class="game-state">';
                    if(list[i].machineStatus == '空闲中'){
                        roomListHtml += '<p class="status"><span>等你抓</span></p>';
                    }else if(list[i].machineStatus == '游戏中'){
                        roomListHtml += '<p class="status yellow"><span>游戏中</span></p>';
                    }else{
                        roomListHtml += '<p class="status red"><span>维修中</span></p>';
                    }
                    roomListHtml += '<p class="rightCoin"><span class="price">'+list[i].price+'</span></p></div></div>';
                }
                /*
                roomListHtml +='<div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room1.jpg" alt=""><span class="wawa-name">蒙奇奇星座款</span><div class="game-state"><p class="status"><span>等你抓</span></p><p class="rightCoin"><span class="price">19</span></p></div></div><div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room2.jpg" alt=""><span class="wawa-name">粉红豹</span><div class="game-state"><p class="status yellow"><span>游戏中</span></p><p class="rightCoin"><span class="price">29</span></p></div></div><div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room3.jpg" alt=""><span class="wawa-name">柯基屁股挎包</span><div class="game-state"><p class="status"><span>等你抓</span></p><p class="rightCoin"><span class="price">19</span></p></div></div><div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room4.jpg" alt=""><span class="wawa-name">玻尿酸鸭</span><div class="game-state"><p class="status"><span>等你抓</span></p><p class="rightCoin"><span class="price">15</span></p></div></div><div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room5.jpg" alt=""><span class="wawa-name">超萌的阿狸</span><div class="game-state"><p class="status"><span>等你抓</span></p><p class="rightCoin"><span class="price">19</span></p></div></div><div class="room-game download"><img src="./images/appExclusive@2x.png" class="app"><img src="./images/room6.jpg" alt=""><span class="wawa-name">露娜猫拖鞋</span><div class="game-state"><p class="status yellow"><span>游戏中</span></p><p class="rightCoin"><span class="price">19</span></p></div></div>'
               */
                // console.log(roomListHtml)
                $(roomListHtml).appendTo($('.mainpage').find('.room-list').eq(0));
                //需要根据房间状态渲染不同颜色的状态灯！！
                //根据doolID获取最近抓中记录 礼物详情 以及通过房间状态渲染操作台
                $('.room-list').on('click','.room-game',function(){
                    if($(this).hasClass('download')){
                        // yearConfirm();
                        //mizhu提示
                        mizhu.confirm('','该款娃娃是APP专享娃娃,下载app,更多狗年娃娃,爆款娃娃等着你!',function(flag){
                            if(flag){
                                yearConfirm();
                            }
                        })
                        return false;
                    }
                    var roomIndex = $(this).index()-1;
                    console.log(roomIndex);
                    localStorage.setItem('index',roomIndex);
                    // if(list[roomIndex].machineStatus == '空闲中'){
                    localStorage.setItem('room',JSON.stringify(list[roomIndex]));
                    // }
                    if(list[roomIndex].machineStatus == '维修中'){
                        mizhu.alert('','该房间正在维修中哦~')
                    }else{
                        window.location.href = "./watchgame.html";
                    }
                })
            }
        }
    })
    console.log(index,null,index == null,index !== 'null' && index !== null)
    if(index !== 'null' && index !== null){ 
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/doll/getH5DollList',
            data:{
                "token":token,
                "TopicType":0,
                'memberId':userId,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    var list = data.resultData;
                    localStorage.setItem('room',JSON.stringify(list[index]));
                    window.location.href = "./watchgame.html";
                }
            }
        })
    }
    //缩放禁止
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
    //导航效果
    var cubuk_seviye = $(document).scrollTop();
    var header_yuksekligi = $('.nav-bottom').outerHeight();
    var header = $('header').outerHeight();
    $(window).scroll(function() {
        if($(window).scrollTop()<64){
            $('header').css('top','0')
        }
        var kaydirma_cubugu = $(document).scrollTop();

        if (kaydirma_cubugu > header_yuksekligi){
            $('.nav-bottom').addClass('gizle');
        } 
        else {
            $('.nav-bottom').removeClass('gizle');
        }
        if (kaydirma_cubugu > header){
            $('header').removeClass('ttt');
        } 
        else {
            ;$('header').addClass('ttt');
        }
        if (kaydirma_cubugu > cubuk_seviye){
            $('.nav-bottom').removeClass('sabit');$('header').addClass('ddd');
        } 
        else {
            $('.nav-bottom').addClass('sabit');$('header').removeClass('ddd');
        }				
        cubuk_seviye = $(document).scrollTop();	
     });
     $('.b1').on('click',function(){
        window.location.href = 'http://h5.365zhuawawa.com/sharePage/bigbattle.html';
     });
     $('.b2').on('click',function(){
        window.location.href = 'http://h5.365zhuawawa.com/sharePage/rank.html?token='+token;
     })
     $('.b3').on('click',function(){
         window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU3NjMzNzc3MQ==&mid=2247483677&idx=1&sn=3986189d406a1d5f6a150ebeea5edbc5&chksm=fd142319ca63aa0fc486f1fab9010ba9dccb888d6ee9bdb1a0626bbf59bb571b4c09fdc56693#rd';
     })
     $('.b4').on('click',function(){
        window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzU3NjMzNzc3MQ==&mid=2247483665&idx=1&sn=f59e3c035cb87c680c210e8ac9c83d80&chksm=fd142315ca63aa035c8235eba2be99d8d1b48260ebbc7caba07644997a80e70ab2ed352beb02#rd';
     });

    //微信支付
    //微信支付
    // if(wechat !== 'wechat'){
    //     $('.list').on('click','li',function(){
    //         mizhu.toast('正在生成订单',2500);
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
    //                 "memberId":userId,
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
        //充值
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
                    "memberId":userId,
                    "IP":'老子是公众号'
                    // "IP":returnCitySN['cip'],
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
                        // alert(outTradeNo);
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
                                            "memberId":userId,
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
                                            // $('#mycoins').text(res.coins);
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
    //充值隐藏框
    //玩家hi币数量渲染
    $.ajax({
        type:'post',
        url:ip+'/icrane/api/member/info/getUserInfo',
        dataType:'json',
        data:{
            "token":token,
            "memberId":userId
        },
        success:function(data){
            var res = data.resultData;
            $('.num').text(res.coins);
        }
    })
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
                    // console.log(chargeList);
                    for(var i = 0; i<chargeList.length;i++){
                        if(chargeList[i].superTicketCharge == 0 &&chargeList[i].superTicketOffer==0 &&chargeList[i].chargeType==0||chargeList[i].chargeType==4){
                        chargeArr.push(chargeList[i]);
                            
                            chargeHtml +='<li><div class="coins"><div class="coinsNum"><div><span class="font24">'+chargeList[i].coinsCharge+'+'+chargeList[i].coinsOffer+'</span>   <span class="font30">Hi币</span></div><span class="coinsName">'+chargeList[i].chargeName+'</span></div><span class="dec">'+chargeList[i].description+'</span></div><div class="chargePrice">¥'+chargeList[i].chargePrice+'</div></li>'
                        }
                    }
                    // console.log(chargeHtml);
                    // console.log(chargeArr);
                    $(chargeHtml).appendTo($('.list'))
                }
            }
        });
    }
    reCharge();
    $('#recharge').on('click',function(){
        $('.hideContent').show();
        $('body').css({'overflow':'hidden','height':'100%'});
        $('html').css({'overflow':'hidden','height':'100%'});
        // $('.mainpage').on('touchmove',function(event){
        //     event.preventDefault();
        // })
    })
    $('.close').on('click',function(){
        $('.hideContent').hide();
        $('html').css('overflow','visible');
        $('body').css('overflow','visible');
        // $('.mainpage').unbind();
        
    })
    $('.closeDown').on('click',function(){
        $('.downloadTop').fadeOut(600,function(){
            $('.downloadTop').remove();
        })
    })
    $('.downloading').on('click',function(){
        if(isiOS){
            window.open("https://itunes.apple.com/cn/app/365%E6%8A%93%E5%A8%83%E5%A8%83/id1314921684?mt=8");
        }else{
            window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.wanyiguo.zww365");
        }
    })
    //禁止下拉
    // var overscroll = function(el) {
    //     el.addEventListener('touchstart', function() {
    //       var top = el.scrollTop
    //         , totalScroll = el.scrollHeight
    //         , currentScroll = top + el.offsetHeight
    //       //If we're at the top or the bottom of the containers
    //       //scroll, push up or down one pixel.
    //       //
    //       //this prevents the scroll from "passing through" to
    //       //the body.
    //       if(top === 0) {
    //         el.scrollTop = 1
    //       } else if(currentScroll === totalScroll) {
    //         el.scrollTop = top - 1
    //       }
    //     })
    //     el.addEventListener('touchmove', function(evt) {
    //       //if the content is actually scrollable, i.e. the content is long enough
    //       //that scrolling can occur
    //       if(el.offsetHeight < el.scrollHeight)
    //         evt._isScroller = true
    //     })
    //   }
    //   overscroll(document.querySelector('.scroll'));
    //   document.body.addEventListener('touchmove', function(evt) {
    //     //In this case, the default behavior is scrolling the body, which
    //     //would result in an overflow.  Since we don't want that, we preventDefault.
    //     if(!evt._isScroller) {
    //       evt.preventDefault()
    //     }
    //   })
})();