;(function(){
    function vibration(){
        navigator.vibrate = navigator.vibrate
                || navigator.webkitVibrate
                || navigator.mozVibrate
                || navigator.msVibrate;
 
        if (navigator.vibrate) {
            // 支持
            console.log("支持设备震动！");
        }
        navigator.vibrate(100);
    }   

    $('button').bind('contextmenu', function(e){
        e.preventDefault();
    });
    $('body').bind('contextmenu', function(e){
        e.preventDefault();
    });
    function random(){
        var randomNum = Math.floor(Math.random()*10+1);
        if(randomNum > 5){
            $('.bgm').attr('src','./music/music1.mp3');
        }else{
            $('.bgm').attr('src','./music/music2.mp3');
        }
    }

    random();
    $('.music').on('click',function(){
        $(this).hide();$('.playMusic').show();
        $('.bgm').attr('src','')
    })
    $('.playMusic').on('click',function(){
        $(this).hide();$('.music').show();
        $('.bgm').attr('src','./music/music1.mp3');
    })
    var wechat = localStorage.getItem('wechat');
    var room = JSON.parse(localStorage.getItem('room'));
    var token = localStorage.getItem('token');  
    var user = JSON.parse(localStorage.getItem('info'));
    var topictype = localStorage.getItem('topictype');
    var index = localStorage.getItem('index');
    // console.log(user,room,user.member);
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
                // $('bgmusic').play();
                wx.onMenuShareAppMessage({
                    title: TITLE, // 分享标题
                    desc: DESC, // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: room.tbimgRealPath, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    // 用户确认分享后执行的回调函数
                        // alert(1);
                        $('.hideShare').hide();
                        // mizhu.toast('分享成功',1000);
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                        // alert(2);
                        $('.hideShare').hide();
                    }
                });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title:TITLE, // 分享标题
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: room.tbimgRealPath, // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    $('.hideShare').hide();
                    // mizhu.toast('分享成功',1000);
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        $('.hideShare').hide();
                    }
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title:TITLE, // 分享标题
                    desc: DESC, // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                    imgUrl: room.tbimgRealPath, // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    $('.hideShare').hide();
                    // mizhu.toast('分享成功',1000);
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    $('.hideShare').hide();
                    }
                });
                //分享到QQ空间
                wx.onMenuShareQZone({
                    title:TITLE, // 分享标题
                    desc: DESC, // 分享描述
                    link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                    imgUrl: room.tbimgRealPath, // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    $('.hideShare').hide();
                    // mizhu.toast('分享成功',1000);
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    $('.hideShare').hide();
                    }
                });
                wx.error(function(){
                    // alert(2);
                });
            })
        }
    })
    var chargeArr = [];    
    var catchList = '';
    var num = 30; 
    var num1 = 30;
    var NUM = 10;
    var coins;
    //根据房间状态不定时去刷新房间按钮
    var clawSuccess = false;
    $('.roomName').text(room.name);
    //微信分享jssdk
    var TITLE = '快来领取你的"'+room.name+'"';
    var DESC = '在线抓娃娃,点开就能玩!抓到了还一个包邮送到家!超多娃娃!激光瞄准';
    // $('title').text(room.name)
    window.onload = function () {
        //进入房间
        //获取网络延迟
        localStorage.setItem('index','null');
        var Time = new Date().getTime();
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/dollRoom/enterDoll',
            data:{
                "token":token,
                "memberId":user.id,
                "dollId":room.id,
            },
            dataType:'json',
            success:function(data){
                var newTime = new Date().getTime();
                var delay = newTime - Time;
                if(delay < 50){
                    $('.network img').attr('src','./images/network4.png');
                }else if(50 < delay < 60){
                    $('.network img').attr('src','./images/network3.png');
                }else if(60 < delay < 80){
                    $('.network img').attr('src','./images/network2.png');
                }else{
                    $('.network img').attr('src','./images/network1.png');
                }
            }
        })
        //报修
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/dollRepairs/repairsProblem',
            data:{
                "token":token,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    var res = data.resultData;
                    var repairHtml  = '';
                    for(var i = 0; i<res.length;i++){
                        repairHtml += '<li class="item">'+res[i].problem+'</li>';
                    }
                    repairHtml += '<li id="other">其他异常情况</li>'
                }
                $('.servicing ul').prepend($(repairHtml));
            }
        })
        $(document).on('click','.suggestion',function(){
            // $('.BOX').show();
            $('.servicing').removeClass('hide');
        })
        $('#cancle').on('click',function(){
            $('.servicing').addClass('hide');
        })
        $('.repairList').on('click','.item',function(){
            $('.current1').removeClass('current1');
            $(this).addClass('current1');
            var this_index = $(this).index();
            var this_text = $('.repairList').find('.current1').text();
            console.log(this_index,this_text);
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/dollRepairs/giveAlarm',
                data:{
                    "token":token,
                    "memberId":user.id,
                    "dollId":room.id,
                    "reason":this_text,
                },
                dataType:'json',
                success:function(data){
                    if(data.success){
                        $('.servicing').addClass('hide');
                        mizhu.alert('',data.message);
                    }
                }
            })
        })
        $(document).on('click','#other',function(){
            $('.BOX').show();
            $('.servicing').addClass('hide');
            $('.otherCases').removeClass('hide');
        })
        //提交自定义报修
        $(document).on('click','#submit',function(){
            var text = $('.otherText').val();
            if(text == ''){
                mizhu.alert('','小抓到底犯了什么错,您说出来嘛')
            }
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/dollRepairs/giveAlarm',
                data:{
                    "token":token,
                    "memberId":user.id,
                    "dollId":room.id,
                    "reason":text,
                },
                dataType:'json',
                success:function(data){
                    if(data.success){
                        $('.servicing').addClass('hide');
                        mizhu.alert('',data.message);
                        $('.otherCases').addClass('hide');
                        $('.otherText').val('');
                        $('.BOX').hide();
                    }
                }
            })
        })
        //关闭报修
        $(document).on('click','.closeSubmit',function(){
            $('.BOX').hide();
            $('.otherCases').addClass('hide');
        })
        var h5Url = room.rtmpUrlH5;
        // localStorage.setItem('h5Url',h5Url);
        $('#data-url').val(h5Url);
        // var h5Url = localStorage.getItem('h5Url');
        $('#play').trigger("click");
        setTimeout(function(){
            $('canvas').show();
            $('.handleInGame').show();
            $('.loadingGame').hide();
        },2000) 
        
        //验证登录
 /*       $.ajax({
            type:'post',
            url:ip+'/icrane/api/doll/getDollListPage',
            data:{
                "token":token,
                "TopicType":'全部',
            },
            dataType:'json',
            success:function(data){
                if(!data.success){
                    mizhu.alert('','您的登陆已失效,请重新登陆');
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcb4254f4b131fc12&redirect_uri=http%3A%2F%2Flanao.nat300.top/icrane/api/h5login&response_type=code&scope=snsapi_userinfo#wechat_redirect';
                }
            }
        })*/
        if(room.machineStatus == '空闲中'){
            $('.otherInGame').hide();
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/dollRoom/getDollRoom',
                data:{
                    "count":3,
                    "dollId":room.id,
                    "token":token,
                },
                success:function(data){
                    if(data.success){
                        $('.Icon').empty();
                        // console.log(data)
                        var length = data.dollRoomCount;
                        $('#num').text(length+'人在房间');
                        var giftUrl = data.dollImgList;
                        // console.log(giftUrl);
                        var playMember = data.playMemberMap;
                        $('#playmember').attr('src',playMember.iconRealPath);
                        $('.userName').text(playMember.name);
                        var memberhead = data.memberHeadList;
                        var headhtml = '';
                        if(memberhead.length == 1){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt="">'
                        }
                        if(memberhead.length == 2){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt="">'
                        }
                        if(memberhead.length == 3){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[2].iconRealPath+'" alt="">'
                        }
                        $('.Icon').prepend($(headhtml));
                    }
                }
            })
        }else if(room.machineStatus == '游戏中'){
            $('.startGame').hide();
            $.ajax({
                type:'post',
                url:ip+'/icrane/api/dollRoom/getDollRoom',
                data:{
                    "count":3,
                    "dollId":room.id,
                    "token":token,
                },
                success:function(data){
                    if(data.success){
                        $('.Icon').empty();
                        // console.log(data)
                        var length = data.dollRoomCount;
                        $('#num').text(length+'人在房间');
                        var giftUrl = data.dollImgList;
                        // console.log(giftUrl);
                        var playMember = data.playMemberMap;
                        $('#playmember').attr('src',playMember.iconRealPath);
                        $('.userName').text(playMember.name);
                        var memberhead = data.memberHeadList;
                        var headhtml = '';
                        if(memberhead.length == 1){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt="">'
                        }
                        if(memberhead.length == 2){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt="">'
                        }
                        if(memberhead.length == 3){
                            headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[2].iconRealPath+'" alt="">'
                        }
                        $('.Icon').prepend($(headhtml));

                    }
                }
            })
        }
        //获取最近抓取成功记录
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/dollRoom/getCatchSuccuss',
            data:{
                "dollId":room.id,
                "token":token,
            },
            dataType:'json',
            success:function(data){
                // console.log(data);
                if(data.success){
                    var result = data.catchDollList;
                    for(var i = 0;i<result.length;i++){
                        catchList += '<li><div class="pic"><img src="'+result[i].iconRealPath
                    +'" alt=""></div><div class="userinfo"><span>'+result[i].name+'</span><span>'+result[i].catchDate+'</span></div><span class="result">成功</span></li>'
                    }
                    // console.log(catchList);
                    $(catchList).appendTo($('.record'));
                }
            }
        })
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
    }
    //根据房间信息更新房间状态按钮
    function checked(){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/doll/getDollStatus',
            data:{
                // "count":3,
                "dollIds":room.id,
                "token":token,
            },
            success:function(data){
                if(data.success){
                    if(data.resultData[0].status == '空闲中'){
                        $('.otherInGame').hide();
                        $('.startGame').css('display','flex')
                    }else if(data.resultData[0].status == '游戏中'){
                        $('.startGame').hide();
                        $('.otherInGame').show();
                        $('.gameState').text('游戏中');
                        var playMember = data.resultData[0].hostInfo;
                        $('#playmember').attr('src',playMember.iconRealPath);
                        $('.userName').text(playMember.name);
                    }

                }
            }
        })
    };
    setInterval(function(){
        //游戏中别人的id 头像
        //网络延时
        var Time = new Date().getTime();
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/dollRoom/getDollRoom',
            data:{
                "count":3,
                "dollId":room.id,
                "token":token,
            },
            success:function(data){
                if(data.success){
                    var newTime = new Date().getTime();
                    var delay = newTime - Time;
                    if(delay < 50){
                        $('.network img').attr('src','./images/network4.png');
                    }else if(50 < delay < 60){
                        $('.network img').attr('src','./images/network3.png');
                    }else if(60 < delay < 80){
                        $('.network img').attr('src','./images/network2.png');
                    }else{
                        $('.network img').attr('src','./images/network1.png');
                    }
                    // alert(new Date().getTime()-Time);
                    $('.Icon').empty();
                    var giftUrl = data.dollImgList;
                    var length = data.dollRoomCount;    
                    $('#num').text(length+'人在房间');
                    // var playMember = data.playMemberMap;
                    // $('#playmember').attr('src',playMember.iconRealPath);
                    // $('.userName').text(playMember.name);
                    var memberhead = data.memberHeadList;
                    var headhtml = '';
                    if(memberhead.length == 1){
                        headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt="">'
                    }
                    if(memberhead.length == 2){
                        headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt="">'
                    }
                    if(memberhead.length == 3){
                        headhtml += '<img id="img1" src="'+memberhead[0].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[1].iconRealPath+'" alt=""><img id="img1" src="'+memberhead[2].iconRealPath+'" alt="">'
                    }
                    $('.Icon').prepend($(headhtml));
                }
            }
        })
    },6000)
    var check = setInterval(checked,500);
    //获取礼物详情
    $.ajax({
        type:'post',
        url:ip+'/icrane/api/dollRoom/dollParticulars',
        data:{
            "dollId":room.id,
            "token":token,
        },
        success:function(data){
            if(data.success){
                console.log(data);
                var res = data.resultData;
                var dollName = res.dollParticulars.name,
                    size = res.dollParticulars.size,
                    type = res.dollParticulars.type,
                    note = res.dollParticulars.note;
                    var textHtml = '';
                if(dollName){
                    textHtml +='<div class="giftDetails"><p class="dollName">'+dollName+'</p><ul>'
                }
                if(size){
                    textHtml +='<li><span>尺寸</span><span>'+size+'</span></li>'
                }
                if(dollName){
                    textHtml +='<li><span>名字</span><span>'+dollName+'</span></li>'
                }
                if(type){
                    textHtml +='<li><span>材质</span><span>'+type+'</span></li>'
                }
                if(note){
                    textHtml +='<li><span>备注</span><span>'+note+'</span></li>'
                }
                textHtml += '</ul></div>'
                // var textHtml = '<div class="giftDetails"><p class="dollName">'+dollName+'</p><ul><li><span>尺寸</span><span>'+size+'</span></li><li><span>名字</span><span>'+dollName+'</span></li><li><span>材质</span><span>'+type+'</span></li><li><span>备注</span><span>'+note+'</span></li></ul></div>'
                var giftUrl = res.dollImgList;
                var giftHtml = '';
                for(var i = 0 ; i<giftUrl.length;i++){
                    giftHtml += '<img src="'+giftUrl[i].imgRealPath+'" alt="">';
                }
                giftHtml = textHtml+giftHtml;
                $(giftHtml).appendTo($('.photo'));
                // $(giftHtml).appendTo($('.photo'));
            }
        }
    })
    //用户余额
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
            var res = data.resultData;
            console.log(res);
            $('.balanceNum').text('余额'+res.coins);
            $('.num1').text(res.coins);
        }
    });
    //渲染价格
    $('#price').text(room.price);
    /////////////////
    //开始游戏
    $('.startGame').on('click',function(){
        //开始游戏 倒计时开始减少
        // clearInterval(check);
        num = 30;
        console.log(1);
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/game/start',
            data:{
                "memberId":user.id,
                "dollId":room.id,
                "token":token,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    $('.loadingGame').show();
                    $('.handleInGame').hide();
                    localStorage.setItem('socket',JSON.stringify(data.resultData));
                    //连接socket
                    var ws = new WebSocket(data.resultData.socketUrl+'/'+user.id+'/'+room.id+'/'+room.machineSerialNum+'/'+room.machineUrl+'/'+room.machineIp+'/'+token);
                    console.log(ws);
                    //游戏控制
                    ws.onopen = function(event) {
                        window.q = setInterval(function(){
                            ws.send('querry');
                        },2000);
                        console.log('链接成功')
                        $('#right').on('touchstart',function(){
                            ws.send('right');                        
                            return false;
                        });
                        $('#top').on('touchstart',function(){
                            ws.send('forward');
                            return false;
                        })
                        $('#down').on('touchstart',function(){
                            ws.send('backward');                        
                            return false;
                        })
                        $('#left').on('touchstart',function(){
                            ws.send('left');                        
                            return false;
                        })
                        $('#top,#down,#left,#right').on('touchend',function(){
                            ws.send('stop');
                        })
                        $('#claw').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:ip+'/icrane/api/game/claw',
                                data:{
                                    "memberId":user.id,
                                    "dollId":room.id,
                                    "token":token,
                                    state: 0,
                                },
                                dataType:'json',
                                success:function(data){
                                    if(data.success){
                                        coins = data.resultData.memberCoins;
                                        console.log(coins);
                                        $('.balanceNum').text('余额'+coins);
                                    }
                                }
                            })
                            //用户余额
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
                                    var res = data.resultData;
                                    console.log(res);
                                    $('.balanceNum').text('余额'+res.coins);
                                    $('.num1').text(res.coins);
                                    coins = res.coins;
                                }
                            });
                            // vibration();
                            $('.downTime').text('　　');
                            clearInterval(t);
                            // clearInterval(p);
                            num = 30;
                            ws.send('claw');
                            $('#claw').css('backgroundColor','#d8d8d8');
                            $('#claw').attr("disabled",true);
                            ws.onmessage = function(event){
                                var res = JSON.parse(event.data);
                                if(res.s == 'gotToy'){
                                    clawSuccess = true;
                                };
                                if(res.s == 'idle'){
                                    console.log(clawSuccess);
                                    if(clawSuccess){
                                        $.ajax({
                                            type:'post',
                                            url:ip+'/icrane/api/game/endRound',
                                            data:{
                                                "memberId":user.id,
                                                "dollId":room.id,
                                                "token":token,
                                                'gotDoll':1,
                                            },
                                            success:function(data){
                                                console.log(data);
                                            }
                                        })
                                        $('.catchSuccess').css('display','flex');
                                        //根据用户娃娃币判断是否够下次玩 不够则提示充值再战
                                        console.log($('.balanceNum').val());
                                        if(coins >= room.price){
                                            $('.again').text('再来一局(10s)');
                                            var ten = setInterval(function(){
                                                NUM--;
                                                $('.again').text('再来一局('+NUM+'s)');
                                                if(NUM == 0){
                                                    clearInterval(ten);
                                                    NUM = 10;
                                                    $('.close').trigger("touchend");
                                                }
                                            },1000);
                                        }else{
                                            $('.again').unbind();
                                            $('.again').text('充值再战(10s)');
                                            //弹出充值框
                                            $('.again').on('click',function(){
                                                $('.close').trigger('touchend');
                                                $('.hideContent').show();
                                            })
                                            var ten = setInterval(function(){
                                                NUM--;
                                                $('.again').text('充值再战('+NUM+'s)');
                                                if(NUM == 0){
                                                    clearInterval(ten);
                                                    NUM = 10;
                                                    $('.close').trigger("touchend");
                                                }
                                            },1000);  
                                        }
                                        clawSuccess = false; //倒计时
                                        $('.close,.again').on('touchstart',function(){
                                            clearInterval(ten);
                                            NUM=10;
                                        })
                                    }else{
                                        $.ajax({
                                            type:'post',
                                            url:ip+'/icrane/api/game/endRound',
                                            data:{
                                                "memberId":user.id,
                                                "dollId":room.id,
                                                "token":token,
                                                'gotDoll':0,
                                            },
                                            success:function(data){
                                                console.log(data);
                                            }
                                        })
                                        $('.catchFaild').css('display','flex'); //倒计时
                                        // $('.again').text('再来一局(10s)'); 
                                        if(coins >= room.price){
                                            $('.again').text('再来一局(10s)');
                                            var ten = setInterval(function(){
                                                NUM--;
                                                $('.again').text('再来一局('+NUM+'s)');
                                                if(NUM == 0){
                                                    clearInterval(ten);
                                                    NUM = 10;
                                                    $('.close').trigger("touchend");
                                                }
                                            },1000);
                                        }else{
                                            $('.again').unbind();
                                            $('.again').text('充值再战(10s)');
                                            //弹出充值框
                                            $('.again').on('click',function(){
                                                $('.close').trigger('touchend');
                                                $('.hideContent').show();
                                            })
                                            var ten = setInterval(function(){
                                                NUM--;
                                                $('.again').text('充值再战('+NUM+'s)');
                                                if(NUM == 0){
                                                    clearInterval(ten);
                                                    NUM = 10;
                                                    $('.close').trigger("touchend");
                                                }
                                            },1000);  
                                        }                                   
                                        // $('.catchSuccess').css('display','flex');
                                        clawSuccess = false; //倒计时
                                        // var ten = setInterval(function(){
                                        //     NUM--;
                                        //     $('.again').text('再来一局('+NUM+'s)');
                                        //     if(NUM == 0){
                                        //         clearInterval(ten);
                                        //         NUM = 10;
                                        //         $('.close').trigger("touchend");
                                        //     }
                                        // },1000);
                                        $('.close,.again').on('touchstart',function(){
                                            clearInterval(ten);
                                            NUM=10;
                                        })
        
                                    }
                                }
                            }
                        })
                    }; 
                    //渲染余额
                    ws.onmessage = function(event){
                        var res = JSON.parse(event.data);
                        console.log(res.s,res);
                        if(res.s == 'idle'){
                            ws.send('coin');
                            clearTimeout(q);                            
                        }
                        if(res.s == 'ready'){
                            $('.loadingGame').hide();
                            $('.liveVideo').css('height','10.8rem');
                            $('.handleInGame').hide();
                            $('.play').show();                        
                            $('.downTime').show();
                            window.t = setInterval(function(){
                                $('.downTime').text(num+'s');
                                num--;
                                if(num == 0){
                                    $('#claw').trigger('click');
                                    $('.downTime').text('　　');
                                    clearInterval(t);
                                    num = 30;
                                    $('#claw').css('backgroundColor','#d8d8d8');
                                }
                            },1000)
                        }
                        if(res.s == 'claw'){
                            // clearInterval(t);

                        }
                    }
                    ws.onclose = function(){
                        console.log('链接关闭了')
                    }
                }else if(data.message == '您的游戏币不足，请先充值！'){
                    mizhu.confirm('','您的游戏币不足，请先充值！',function(flag){
                        if(flag){
                            $('.hideContent').show();
                            $('body').css({'overflow':'hidden','height':'100%'});
                            $('html').css({'overflow':'hidden','height':'100%'});
                        }
                    })
                }else if(data.message == '您的钻石不足，请先充值！'){
                    mizhu.alert('','您的钻石不足，请先充值！')
                }else{
                    mizhu.alert('','被其他用户抢先一步啦,请您稍等哦');
                }
                //关闭弹窗
                $('.close').on('touchend',function(){
                    $('#claw').attr("disabled",false);
                    //下机
                    $.ajax({
                        type:'post',
                        url:ip+'/icrane/api/game/end',
                        data:{
                            "memberId":user.id,
                            "dollId":room.id,
                            "token":token,
                        },
                        dataType:'json',
                        success:function(data){
                            console.log(data);
                        }
                    })
                    ws.close();
                    $('.startGame').show();                    
                    $('.handleInGame').css('opacity','1');
                    $('.liveVideo').css('height','9.1rem');
                    $('.catchSuccess,.catchFaild').hide();
                    $('.play').hide();
                    $('.handleInGame').show();
                    $('#claw').css('background','#ecaacc');
                    // clearInterval(t);
                    // clearInterval(p);
                    num = 30;
                    
                    return false;
                })
                //再来一局
                $('.again').on('touchend',function(){
                    // $('.close').trigger('touchend');
                    // $('.handleInGame').css('opacity','0');
                    // $('.liveVideo').css('height','10.8rem');
                    // setTimeout(function(){
                    //     $('.startGame').trigger('click');
                    // },200)
                    clearInterval(t);
                    ws.send('coin');                    
                    $('#claw').attr("disabled",false);
                    $('#claw').css('background','#ecaacc');
                    window.t = setInterval(function(){
                        $('.downTime').text(num+'s');
                        num--;
                        if(num == 0){
                            $('.downTime').text('　　');
                            clearInterval(t);
                            num = 30;
                            ws.send('claw');
                            $('#claw').css('backgroundColor','#d8d8d8');
                        }
                    },1000)
                    catchSuccess = false;
                    return false;
                })
            }
        })
    })
    //后续添加维护中的弹窗

    //下面tab栏
    $('.gameDetails').on('click','li',function(){
        var $this = $(this);
        var $this_index = $this.index();
        $('.gameDetails').children().removeClass('active');
        $this.addClass('active');
        console.log($this,$this_index)
        if($this_index == 0){
            $('.record').addClass('current');
            $('.photo').removeClass('current');
        }else{
            $('.record').removeClass('current');
            $('.photo').addClass('current');
        }
    })
    // 抓取成功失败的弹窗关闭事件
    $('.again').on('touchend',function(){
        $('.catchSuccess,.catchFaild').hide();
    })
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    function yearConfirm1(){
            if(isiOS){
                window.open("https://itunes.apple.com/cn/app/365%E6%8A%93%E5%A8%83%E5%A8%83/id1314921684?mt=8");
            }else{
                window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.wanyiguo.zww365");
            }
        // }
    }
    //充值
    $('.balance').on('click',function(){
        $('.hideContent').show();
        $('body').css({'overflow':'hidden','height':'100%'});
        $('html').css({'overflow':'hidden','height':'100%'});
        // $('body').on('touchmove',function(event){
        //     event.preventDefault();
        // })
    });
    //关闭充值框
    $('._close').on('click',function(){
        $('.hideContent').hide();
        $('body').css('overflow','visible');
        $('html').css('overflow','visible');
        // $('body').unbind();
    })
    //发言
    $('.sendMsg').on('click',function(){
        mizhu.alert('','此功能正在构建中！')
  /*      mizhu.confirm('','发送弹幕需要下载APP,您确定要下载吗?',function(flag){
            if(flag){
                yearConfirm1();
            }
        })*/
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
            // alert(user.openId);
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
                    if(res.success){
                        var data = JSON.stringify(res.resultData);
                        var result = JSON.parse(data);
                        var outTradeNo = result.outTradeNo;
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
                                            // setTimeout(function(){
                                            //     window.location.reload();
                                            // },1500)
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
                                    // mizhu.alert('','您取消了支付');
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
        // window.history.go(-1);

    $('.back').on('click',function(){
        $.ajax({
            type:'post',
            url:ip+'/icrane/api/dollRoom/exitDoll',
            data:{
                "memberId":user.id,
                "token":token,
            },
            dataType:'json',
            success:function(data){
                
            }
        })
        // if(window.history.length>1){
            // window.history.go(-1);
        // }else{
            window.location.href = './index_room.html';
        // }
    })
    //分享sdk
    $(document).on('click','.please,.flaunt',function(){
        $('.hideShare').show();
    })
    $(document).on('click','.please',function(){
        TITLE = '大神快来帮我抓"'+room.name+'"';
        DESC = '我刚刚差一点就抓到"'+room.name+'"了,快来帮我抓一个嘛'
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
                        title: TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: room.tbimgRealPath, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                            // alert(1);
                        },
                        cancel: function () {
                        // 用户取消分享后执行的回调函数
                            // alert(2);
                        }
                    });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title:TITLE, // 分享标题
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ
                    wx.onMenuShareQQ({
                        title:TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                        },
                        cancel: function () {
                        // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ空间
                    wx.onMenuShareQZone({
                        title:TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
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
        return false;
    })
    //炫耀
    $(document).on('click','.flaunt',function(){
        TITLE = '我刚刚在网搜抓娃娃抓到一只"'+room.name+'",你也快来一起玩吧!';
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
                        title: TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: room.tbimgRealPath, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                            // alert(1);
                        },
                        cancel: function () {
                        // 用户取消分享后执行的回调函数
                            // alert(2);
                        }
                    });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title:TITLE, // 分享标题
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ
                    wx.onMenuShareQQ({
                        title:TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
                        },
                        cancel: function () {
                        // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ空间
                    wx.onMenuShareQZone({
                        title:TITLE, // 分享标题
                        desc: DESC, // 分享描述
                        link: 'http://zww.lanao.fun/lanaokj/sharePage.html?token='+token+'&userId='+user.id + '&index='+index, // 分享链接
                        imgUrl: room.tbimgRealPath, // 分享图标
                        success: function () {
                        // 用户确认分享后执行的回调函数
                        $('.hideShare').hide();
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
        return false;
    })
    
})()
