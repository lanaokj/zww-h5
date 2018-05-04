;(function(){
    //获取url参数
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }else{
            return null;
        } 
    }
    
    var token = GetQueryString('token');
    var getData_2 = true;
    var getData_3 = true;
    var normallist1 = '';
    var normallist2 = '';
    var normallist3 = '';
    var memberid = '',
        chargeNum = '',
        inviteNum = '',
        catchNum = '',
        timestamp = '',
        nonceStr = '',
        signature = '';
    if(token == null){
        $('.list').hide();
    }
        //充值榜 type3
        $.ajax({
            type:'post',
            url:'http://p.365zhuawawa.com/?r=rank/member',
            data:{
                token:token,
            },
            dataType:'json',
            success:function(data){
                if(data.code == 200){
                    var res = JSON.parse(data.resultData);
                    console.log(data);
                    memberid = res.invite_code;
                    chargeNum = res.chargeNum;
                    inviteNum = res.inviteNum;
                    catchNum = res.catchNum;
                    if(chargeNum == null){
                        chargeNum = 0;
                    }
                    $('.mycore').text(chargeNum);
                    $('.myImg').attr('src',res.img_url);
                    $('.myname').text(res.name)
                    // console.log(memberid)
                }
            }
        })
        $.ajax({
            type:'post',
            url:'http://192.168.2.224:8080/icrane/api/wx/onMenuShareTimeline',
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
                        desc: '超多萌娃!激光瞄准!一个就包邮!蓝澳抓娃娃,赶紧点开一起玩吧!', // 分享描述
                        link: "http://dev.365zhuawawa.com/H5/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                        link: 'http://dev.365zhuawawa.com/H5/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                        title: '哇~抓娃娃居然点开就能玩,抓到了还一个包邮送到家!', // 分享标题
                        desc: '超多萌娃!激光瞄准!一个就包邮!蓝澳抓娃娃,赶紧点开一起玩吧!', // 分享描述
                        link: 'http://dev.365zhuawawa.com/H5/', // 分享链接
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
                        desc: '超多萌娃!激光瞄准!一个就包邮!蓝澳抓娃娃,赶紧点开一起玩吧!', // 分享描述
                        link: 'http://dev.365zhuawawa.com/H5/', // 分享链接
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
    // setTimeout(function(){

        
    // },1500)




    $.ajax({
        type:"post",
        url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
        dataType:'json',
        data:{
            type:3,
            periodId:9,
        },
        success:function(data){
            console.log(data);
            var res = data.resultData;
            //2
            $('.list1 .top2 .iconImg').attr('src',res[1].头像);
            $('.list1 .top2 .userName').text(res[1].昵称);
            $('.list1 .top2 .score').text(res[1].成绩);
            $('.list1 .top2 .given').text(res[1].奖励);
            //1
            $('.list1 .top1 .iconImg').attr('src',res[0].头像);
            $('.list1 .top1 .userName').text(res[0].昵称);
            $('.list1 .top1 .score').text(res[0].成绩);
            $('.list1 .top1 .given').text(res[0].奖励);
            //3
            $('.list1 .top3 .iconImg').attr('src',res[2].头像);
            $('.list1 .top3 .userName').text(res[2].昵称);
            $('.list1 .top3 .score').text(res[2].成绩);
            $('.list1 .top3 .given').text(res[2].奖励);
            for(var i =3;i<res.length;i++){
                normallist1 +=  '<li class="list"><span class="rank">'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span class="username">'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>'
            }
            // console.log(normallist1);
            setTimeout(function(){
                $('.ranklist1').prepend($(normallist1));
                $('.loading').hide();
            },1000)
            //查找自己的排名
            for(var m = 0 ;m<res.length;m++){
                if(res[m].id == memberid){
                    $('.myrank1').text(m+1);
                    $('.mycore').text(res[m].成绩);
                    $('.mygiven').text(res[m].奖励);
                }
            }
        }
    })
    $('.tabs').on('touchend','a',function(){
        this_index = $(this).index();
        $('.tabs a').removeClass('active');
        // console.log(this_index);
        $(this).addClass('active');
        $('.current').removeClass('current');        
        $('.current1').removeClass('current1');        
        $('.tab').children().eq(this_index).addClass('current');
        $('.ranklist').children().eq(this_index).addClass('current1');
        if(this_index == 0){
            $.ajax({
                type:"post",
                url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                dataType:'json',
                data:{
                    type:3,
                    periodId:9,
                },
                success:function(data){
                    if(data.success){
                        var res = data.resultData;
                        for(var m = 0 ;m<res.length;m++){
                            if(res[m].id == memberid){
                                $('.myrank1').text(m+1);
                                // $('.mycore').text(res[m].成绩);
                                $('.mygiven').text(res[m].奖励);
                            }
                        }
                        $('.mycore').text(inviteNum);
                    }
                }
            })
            $('.box').children().eq(1).text('充值指数')
        }else if(this_index == 1){
            $.ajax({
                type:"post",
                url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                dataType:'json',
                data:{
                    type:1,
                    periodId:9,
                },
                success:function(data){
                    if(data.success){
                        var res = data.resultData;
                        for(var m = 0 ;m<res.length;m++){
                            if(res[m].id == memberid){
                                $('.myrank1').text(m+1);
                                // $('.mycore').text(res[m].成绩);
                                $('.mygiven').text(res[m].奖励);
                            }
                        }
                        $('.mycore').text(inviteNum);
                    }
                }
            })
            $('.box').children().eq(1).text('邀请人数');
        }else if(this_index == 2){
            $('.box').children().eq(1).text('抓中数量')
            $.ajax({
                type:"post",
                url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                dataType:'json',
                data:{
                    type:2,
                    periodId:9,
                },
                success:function(data){
                    if(data.success){
                        var res = data.resultData;
                        for(var m = 0 ;m<res.length;m++){
                            if(res[m].id == memberid){
                                $('.myrank1').text(m+1);
                                // $('.mycore').text(res[m].成绩);
                                $('.mygiven').text(res[m].奖励);
                            }
                        }
                        $('.mycore').text(inviteNum);
                    }
                }
            })        
        }
        //榜单2 & 3
        if(this_index == 1 && getData_2){
            $('.loading').show();
            getData_2 = false;
            //榜单2 type1
            $.ajax({
                type:"post",
                url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                dataType:'json',
                data:{
                    type:1,
                    periodId:9,
                },
                success:function(data){
                    if(data.success){
                        var res = data.resultData;
                        //2
                        $('.list2 .top2 .iconImg').attr('src',res[1].头像);
                        $('.list2 .top2 .userName').text(res[1].昵称);
                        $('.list2 .top2 .score').text(res[1].成绩);
                        $('.list2 .top2 .given').text(res[1].奖励);
                        //1
                        $('.list2 .top1 .iconImg').attr('src',res[0].头像);
                        $('.list2 .top1 .userName').text(res[0].昵称);
                        $('.list2 .top1 .score').text(res[0].成绩);
                        $('.list2 .top1 .given').text(res[0].奖励);
                        //3
                        $('.list2 .top3 .iconImg').attr('src',res[2].头像);
                        $('.list2 .top3 .userName').text(res[2].昵称);
                        $('.list2 .top3 .score').text(res[2].成绩);
                        $('.list2 .top3 .given').text(res[2].奖励);
                        for(var i =3;i<res.length;i++){
                            normallist2 +=  '<li class="list"><span class="rank">'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span class="username">'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>'
                        }
                        setTimeout(function(){
                            $('.ranklist2').prepend($(normallist2));
                            $('.loading').hide();
                        },1000)
                        // //查找自己的排名
                        // for(var m = 0 ;m<res.length;m++){
                        //     if(res[m].id == memberid){
                        //         $('.myrank1').text(m+1);
                        //         $('.mycore').text(res[m].成绩);
                        //         $('.mygiven').text(res[m].奖励);
                        //     }
                        // }
                        // $('.mycore').text(inviteNum);
                    }
                }
            })
        }else if(this_index == 2 && getData_3){
            getData_3 = false;
            $('.loading').show();
            $.ajax({
                type:"post",
                url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                dataType:'json',
                data:{
                    type:2,
                    periodId:9,
                },
                success:function(data){
                    if(data.success){
                        var res = data.resultData;
                        //2
                        $('.list3 .top2 .iconImg').attr('src',res[1].头像);
                        $('.list3 .top2 .userName').text(res[1].昵称);
                        $('.list3 .top2 .score').text(res[1].成绩);
                        $('.list3 .top2 .given').text(res[1].奖励);
                        //1
                        $('.list3 .top1 .iconImg').attr('src',res[0].头像);
                        $('.list3 .top1 .userName').text(res[0].昵称);
                        $('.list3 .top1 .score').text(res[0].成绩);
                        $('.list3 .top1 .given').text(res[0].奖励);
                        //3
                        $('.list3 .top3 .iconImg').attr('src',res[2].头像);
                        $('.list3 .top3 .userName').text(res[2].昵称);
                        $('.list3 .top3 .score').text(res[2].成绩);
                        $('.list3 .top3 .given').text(res[2].奖励);
                        for(var i =3;i<res.length;i++){
                            normallist3 +=  '<li class="list"><span class="rank">'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span class="username">'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>'
                        }
                        setTimeout(function(){
                            $('.ranklist3').prepend($(normallist3));
                            $('.loading').hide();
                        },1000)
                        // //查找自己的排名
                        // for(var m = 0 ;m<res.length;m++){
                        //     if(res[m].id == memberid){
                        //         $('.myrank1').text(m+1);
                        //         $('.mycore').text(res[m].成绩);
                        //         $('.mygiven').text(res[m].奖励);
                        //     }
                        // }
                    }
                }
            })
        }
    })
}())