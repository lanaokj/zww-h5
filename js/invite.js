;(function(){
    var u = navigator.userAgent;    
    var user = JSON.parse(localStorage.getItem('info'));
    var token = localStorage.getItem('token');
    var channel = localStorage.getItem('channel');
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        $('.inviteText').css({'margin-bottom':'0','padding-bottom':'.3rem'})
    }
    if(channel == 'QL'){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/share/QRCodeImgUrl',
            data:{
                token:token,
                memberId:user.id,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    $('.QR').attr('src',data.resultData.shareImgUrl);
                }
            }
        })
        $('.qrImg').show();
        $('.mainpage').addClass("hide");
    }
    window.onload = function(){
        $('.myInvite').text('我的邀请码:'+user.memberID);

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
                        link: "http://47.106.39.237:8080/lanaokj/qrImg.html?token="+token+"&userId="+user.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideInvite').addClass("hide");
                    // mizhu.toast('分享成功',1000);
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
                        link: "http://47.106.39.237:8080/lanaokj/qrImg.html?token="+token+"&userId="+user.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideInvite').addClass("hide");
                    // mizhu.toast('分享成功',1000);
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ
                    wx.onMenuShareQQ({
                        title:'哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                        desc: '超多萌娃!激光瞄准!一个就包邮!网搜抓娃娃,赶紧点开一起玩吧!', // 分享描述
                        link: "http://h5.lanao.fun/lanaokj/qrImg.html?token="+token+"&userId="+user.id, // 分享链接
                        imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideInvite').addClass("hide");
                    // mizhu.toast('分享成功',1000);
                        },
                        cancel: function () {
                        // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ空间
                    wx.onMenuShareQZone({
                        title: '哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                        desc: '超多萌娃!激光瞄准!一个就包邮!网搜抓娃娃,赶紧点开一起玩吧!', // 分享描述
                        link:"http://h5.lanao.fun/lanaokj/qrImg.html?token="+token+"&userId="+user.id, // 分享链接
                        imgUrl: 'http://zww-image-dev.oss-cn-shanghai.aliyuncs.com/238640877592622509.jpg', // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideInvite').addClass("hide");
                    // mizhu.toast('分享成功',1000);
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
    }
    function inviteNumber(){
        $.ajax({
            type:'post',
            url:ip+'//icrane/api/charge/howInvite',
            data:{
                "token":token,
                "memberId":user.id,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    // console.log(data);
                    $('.inviteNumber').text(data.resultData.inviteNumber+'人');
                }
            }
        });
    }
    $('#share').on('click',function(){
        $('.hideInvite').removeClass('hide');
    })
    $('.closeShare').on('click',function(){
        $('.hideInvite').addClass('hide');
    })
    inviteNumber();
    $('.back').on('click',function(){
        window.history.go(-1);
    })
    $('.enterInvite').on('click',function(){
        window.location.href = './enterInvite.html';
    })
})()