;(function(){
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
    var superlist = '';
    var superlist1 = '';
    var superlist2 = '';
    var normallist = '';
    var normallist1 = '';
    var normallist2 = '';
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var getData_1 = true;
    var getData_2 = true;
    // var memberid;
    $(window).scroll(function(){
        // console.log($(window).scrollTop());
        if($(window).scrollTop()>=1080){
            if(getData_1){
                getData_1 = false;
                $.ajax({
                    type:"post",
                    url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                    dataType:'json',
                    data:{
                        type:1,
                        periodId:4,
                    },
                    success:function(data){
                        var res = data.resultData;
                        var html_1 = '';
                        for(var i =20;i<50;i++){
                            html_1 += '<li><span>'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>';
                            //修改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        }
                        $('.list1 .list').append($(html_1));
                    }
                })
            }
        };
        if($(window).scrollTop()>=3000){
            if(getData_2){
                getData_2 = false;
                $.ajax({
                    type:"post",
                    url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                    dataType:'json',
                    data:{
                        type:1,
                        periodId:4,
                    },
                    success:function(data){
                        var res = data.resultData;
                        var html_1 = '';
                        for(var i =50;i<200;i++){
                            html_1 += '<li><span>'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>';
                            //修改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        }
                        $('.list1 .list').append($(html_1));
                    }
                })
            }
        }
    })
    

    window.onload = function(){
        var getList_2 = true;
        var getList_3 = true;
        //个人信息
        $.ajax({
            type:'post',
            url:'http://p.365zhuawawa.com/?r=rank/member',
            data:{
                token:token,
            },
            dataType:'json',
            success:function(data){
                // console.log(data);
                if(data.code == 200){
                    var res = JSON.parse(data.resultData);
                    // console.log(res.invite_code);
                    localStorage.setItem('memberid',res.invite_code);
                    var img_url = res.img_url;
                    var _name = res.name,
                        chargeNum = res.chargeNum,
                        inviteNum = res.inviteNum,
                        catchNum  = res.catchNum;
                    if(chargeNum == null){
                        chargeNum = 0;
                    }
                    var selfHtml1 = '<div class="self"><img src="'+img_url+'" alt=""><span class="username">'+_name+'</span><div class="rank"><span id="myrank1">我的排名:未上榜</span><span>邀请人数：'+inviteNum+'</span></div></div>';
                    var selfHtml2 = '<div class="self"><img src="'+img_url+'" alt=""><span class="username">'+_name+'</span><div class="rank"><span id="myrank2">我的排名:未上榜</span><span id="charge"></span></div></div>';
                    var selfHtml3 = '<div class="self"><img src="'+img_url+'" alt=""><span class="username">'+_name+'</span><div class="rank"><span id="myrank3">我的排名:未上榜</span><span>抓取数量：'+catchNum+'</span></div></div>';
                    // $(selfHtml1).prepend($('.list1'));
                    $('.list1').prepend($(selfHtml1));
                    $('.list2').prepend($(selfHtml2));
                    $('.list3').prepend($(selfHtml3));
                }
            }
        });
        //获取到用户的memberId
        $.ajax({
            type:"post",
            url: 'http://p.365zhuawawa.com?r=rank/member',
            dataType:'json',
            data:{
                token:token,
            },
            success:function(data){
                // console.log('member'+data);
                if(data.code == 200){
                    var res = JSON.parse(data.resultData);
                    var mycode = res.invite_code;
                    // console.log(mycode);
                    localStorage.setItem('mycode',mycode);
                }
            }
        });
        var mycode = localStorage.getItem('mycode');   
        var memberid = localStorage.getItem('memberid'); 
        // console.log(memberid);
        //榜单1
        $.ajax({
            type:"post",
            url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
            dataType:'json',
            data:{
                type:1,
                periodId:4,
            },
            success:function(data){
                // console.log(data);
                var res = data.resultData;
                // console.log(res.length);
                for(var i = 0 ; i < 3 ; i ++){
                    console.log(i);
                    if(res[i].id == '66533333'){
                        superlist += '<li><div class="info"><img class="ranking" src="./images/rankNo1.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good11"><img src="./images/rankL1.png" alt=""><span class="num1"></span></button><button class="bad bad11"><img src="./images/rankDown.png" alt=""><span class="num11"></span></button></div></li>';
                    }else if(res[i].id == '44562311'){
                        superlist += '<li><div class="info"><img class="ranking" src="./images/rankNo1.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good12"><img src="./images/rankL1.png" alt=""><span class="num2"></span></button><button class="bad bad12"><img src="./images/rankDown.png" alt=""><span class="num22"></span></button></div></li>';
                    }else{
                        superlist += '<li><div class="info"><img class="ranking" src="./images/rankNo1.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good13"><img src="./images/rankL1.png" alt=""><span class="num3"></span></button><button class="bad bad13"><img src="./images/rankDown.png" alt=""><span class="num33"></span></button></div></li>';
                    }
                    arr1.push(res[i].id);
                }
                for(var i =3;i<20;i++){
                        normallist += '<li><span>'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>';
                        //修改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }
                //查找自己的排名
                for(var m = 0 ;m<res.length;m++){
                    if(res[m].id == memberid){
                        $('#myrank1').text('我的排名:'+(m+1));
                    }
                }
                // console.log(arr1);
                $('.list1 .superUser').prepend($(superlist));
                $('.list1 .list').prepend($(normallist));
                $('.list1 .ranking')[1].src = './images/rankNo2.png';
                $('.list1 .ranking')[2].src = './images/rankNo3.png';
                //渲染点赞数量
                $.ajax({
                    type:'post',
                    url:'http://p.365zhuawawa.com?r=rank/love-num',
                    dataType:'json',
                    success:function(data){
                        // console.log(data);
                        $('.num1').text(data[arr1[0]]);
                        $('.num2').text(data[arr1[1]]);
                        $('.num3').text(data[arr1[2]]);
                    }
                })
                //踩的数量
                $.ajax({
                    type:'post',
                    url:'http://p.365zhuawawa.com?r=rank/hate-num',
                    dataType:'json',
                    success:function(data){
                        // console.log(data);
                        $('.num11').text(data[arr1[0]]);
                        $('.num22').text(data[arr1[1]]);
                        $('.num33').text(data[arr1[2]]);
                    }
                });
                //邀请榜点赞
                $('.good11').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/love',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[0],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.bad11').attr('disabled','disabled');
                                $('.good11 img').attr('src','./images/rankL.png');
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/love-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num1').text(data[arr1[0]]);
                                    }
                                })
                            }else{
                                // $('.good11 img').attr('src','./images/rankL.png');
                                mizhu.alert('','你已经赞/踩过了哦~');
                            }
                        }                    
                    })
                })
                $('.good12').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/love',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[1],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.bad12').attr('disabled',true);
                                $('.good12 img').attr('src','./images/rankL.png');
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/love-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num2').text(data[arr1[1]]);
                                    }
                                })
                            }else{
                                // $('.good12 img').attr('src','./images/rankL.png');
                                mizhu.alert('','你已经赞/踩过了哦~');
                            }
                        }                    
                    })
                })
                $('.good13').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/love',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[2],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.bad13').attr('disabled',true);
                                $('.good13 img').attr('src','./images/rankL.png'); 
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/love-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num3').text(data[arr1[2]]);
                                    }
                                })
                            }else{
                                // $('.good13 img').attr('src','./images/rankL.png');                                
                                mizhu.alert('','你已经赞/踩过了哦~');
                            }
                        }                    
                    })
                })
                //邀请榜踩1
                $('.bad11').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/hate',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[0],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.good11').attr('disabled','disabled');
                                $('.bad11 img').attr('src','./images/cai@2x.png');
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num11').text(data[arr1[0]]);
                                    }
                                })
                            }else{
                                mizhu.alert('','你已经赞/踩过了哦~')
                            }
                        }
                    })
                })
                $('.bad12').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/hate',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[1],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.good12').attr('disabled','disabled');
                                $('.bad12 img').attr('src','./images/cai@2x.png');
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num22').text(data[arr1[1]]);
                                    }
                                })
                            }else{
                                mizhu.alert('','你已经赞/踩过了哦~')
                            }
                        }
                    })
                })
                $('.bad13').on('click',function(){
                    $.ajax({
                        type:'post',
                        url:'http://p.365zhuawawa.com?r=rank/hate',
                        dataType:'json',
                        data:{
                            love_id: mycode,
                            loved_id:arr1[2],
                        },
                        success:function(data){
                            // console.log(data);
                            if(data.code == 200){
                                $('.good13').attr('disabled','disabled');
                                $('.bad13 img').attr('src','./images/cai@2x.png');
                                $.ajax({
                                    type:'post',
                                    url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);
                                        $('.num33').text(data[arr1[2]]);
                                    }
                                })
                            }else{
                                mizhu.alert('','你已经赞/踩过了哦~')
                            }
                        }
                    })
                })
            }
        })
        $('.tabs').on('touchend','a',function(){
            this_index = $(this).index();
            $('.tabs a').removeClass('active');
            // console.log(this_index);
            $(this).addClass('active');
            $('.current').removeClass('current');        
            $('.tab').children().eq(this_index).addClass('current');
            if(this_index == 1 && getList_2){
                getList_2 = false;
                //榜单2
                $.ajax({
                    type:"post",
                    url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                    dataType:'json',
                    data:{
                        type:3,
                        periodId:4,
                    },
                    success:function(data){
                        // console.log(data);
                        var res = data.resultData;
                        // console.log(res.length);
                        for(var i = 0 ; i < 3 ; i ++){
                            // console.log(i);
                            if(res[i].id == '16750050'){
                                superlist1 += '<li><div class="info"><img class="ranking" src="./images/rankNo1.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good21"><img src="./images/rankL1.png" alt=""><span class="num4"></span></button><button class="bad bad21"><img src="./images/rankDown.png" alt=""><span class="num44"></span></button></div></li>';
                            }else if(res[i].id == '56223323'){
                                superlist1 += '<li><div class="info"><img class="ranking" src="./images/rankNo2.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good22"><img src="./images/rankL1.png" alt=""><span class="num5"></span></button><button class="bad bad22"><img src="./images/rankDown.png" alt=""><span class="num55"></span></button></div></li>';
                            }else{
                                superlist1 += '<li><div class="info"><img class="ranking" src="./images/rankNo3.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good23"><img src="./images/rankL1.png" alt=""><span class="num6"></span></button><button class="bad bad23"><img src="./images/rankDown.png" alt=""><span class="num66"></span></button></div></li>';
                            }
                            arr2.push(res[i].id);
                        }
                        for(var i =3;i<50;i++){
                            normallist1 += '<li><span>'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>'
                        }
                        //查找自己的排名
                        for(var m = 0 ;m<res.length;m++){
                            if(res[m].id == memberid){
                                $('#myrank2').text('我的排名:'+(m+1));
                                $('#charge').text('充值指数:'+res[m].成绩);
                            }
                        }
                        // console.log(arr2);
                        $('.list2 .superUser').prepend($(superlist1));
                        $('.list2 .list').prepend($(normallist1));
                        $('.list2 .ranking')[1].src = './images/rankNo2.png';
                        $('.list2 .ranking')[2].src = './images/rankNo3.png';
                        //渲染点赞数量
                        $.ajax({
                            type:'post',
                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                            dataType:'json',
                            success:function(data){
                                // console.log(data);
                                $('.num4').text(data[arr2[0]]);
                                $('.num5').text(data[arr2[1]]);
                                $('.num6').text(data[arr2[2]]);
                            }
                        })
                        //踩的数量
                        $.ajax({
                            type:'post',
                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                            dataType:'json',
                            success:function(data){
                                // console.log(data);
                                $('.num44').text(data[arr2[0]]);
                                $('.num55').text(data[arr2[1]]);
                                $('.num66').text(data[arr2[2]]);
                            }
                        });
                        //邀请榜点赞
                        $('.good21').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[0],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad21').attr('disabled','disabled');
                                        $('.good21 img').attr('src','./images/rankL.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num4').text(data[arr2[0]]);
                                            }
                                        })
                                    }else{
                                        // $('.good11 img').attr('src','./images/rankL.png');
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        $('.good22').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[1],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad22').attr('disabled',true);
                                        $('.good22 img').attr('src','./images/rankL.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num5').text(data[arr2[1]]);
                                            }
                                        })
                                    }else{
                                        // $('.good12 img').attr('src','./images/rankL.png');
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        $('.good23').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[2],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad23').attr('disabled',true);
                                        $('.good23 img').attr('src','./images/rankL.png'); 
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num6').text(data[arr2[2]]);
                                            }
                                        })
                                    }else{
                                        // $('.good13 img').attr('src','./images/rankL.png');                                
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        //邀请榜踩1
                        $('.bad21').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[0],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.good21').attr('disabled','disabled');
                                        $('.bad21 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num44').text(data[arr2[0]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                        $('.bad22').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[1],
                                },
                                success:function(data){
                                    console.log(data);
                                    if(data.code == 200){
                                        $('.good22').attr('disabled','disabled');
                                        $('.bad22 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                console.log(data);
                                                $('.num55').text(data[arr2[1]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                        $('.bad23').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr2[2],
                                },
                                success:function(data){
                                    console.log(data);
                                    if(data.code == 200){
                                        $('.good23').attr('disabled','disabled');
                                        $('.bad23 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                console.log(data);
                                                $('.num66').text(data[arr2[2]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                    }
                })
            }else if(this_index == 2 && getList_3){
                getList_3 = false;
                //榜单3
                $.ajax({
                    type:"post",
                    url: 'http://www.365zhuawawa.com:8080/icrane/api/rankingList/get',
                    dataType:'json',
                    data:{
                        type:2,
                        periodId:4,
                    },
                    success:function(data){
                        // console.log(data);
                        var res = data.resultData;
                        // console.log(res.length);
                        for(var i = 0 ; i < 3 ; i ++){
                            // console.log(i);
                            if(res[i].id == '16750050'){
                                superlist2 += '<li><div class="info"><img class="ranking" src="./images/rankNo1.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good31"><img src="./images/rankL1.png" alt=""><span class="num7"></span></button><button class="bad bad31"><img src="./images/rankDown.png" alt=""><span class="num77"></span></button></div></li>';
                            }else if(res[i].id == '99982562'){
                                superlist2 += '<li><div class="info"><img class="ranking" src="./images/rankNo2.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good32"><img src="./images/rankL1.png" alt=""><span class="num8"></span></button><button class="bad bad32"><img src="./images/rankDown.png" alt=""><span class="num88"></span></button></div></li>';
                            }else{
                                superlist2 += '<li><div class="info"><img class="ranking" src="./images/rankNo3.png" alt=""><img class="userImg" src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></div><p>'+res[i].留言+'</p><div class="rankhand"><button class="good good33"><img src="./images/rankL1.png" alt=""><span class="num9"></span></button><button class="bad bad33"><img src="./images/rankDown.png" alt=""><span class="num99"></span></button></div></li>';
                            }
                            arr3.push(res[i].id);
                        }
                        for(var i =3;i<50;i++){
                            normallist2 += '<li><span>'+res[i].排名+'</span><img src="'+res[i].头像+'" alt=""><span>'+res[i].昵称+'</span><span>'+res[i].成绩+'</span><span>'+res[i].奖励+'</span></li>'
                        }
                        // console.log(arr3,res[0].id);
                        //查找自己的排名
                        for(var m = 0 ;m<10;m++){
                            if(res[m].id == memberid){
                                $('#myrank3').text('我的排名:'+(m+1));
                            }
                        }
                        $('.list3 .superUser').prepend($(superlist2));
                        $('.list3 .list').prepend($(normallist2));
                        $('.list3 .ranking')[1].src = './images/rankNo2.png';
                        $('.list3 .ranking')[2].src = './images/rankNo3.png';
                        //渲染点赞数量
                        $.ajax({
                            type:'post',
                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                            dataType:'json',
                            success:function(data){
                                // console.log(data);
                                $('.num7').text(data[arr3[0]]);
                                $('.num8').text(data[arr3[1]]);
                                $('.num9').text(data[arr3[2]]);
                            }
                        })
                        //踩的数量
                        $.ajax({
                            type:'post',
                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                            dataType:'json',
                            success:function(data){
                                // console.log(data);
                                $('.num77').text(data[arr3[0]]);
                                $('.num88').text(data[arr3[1]]);
                                $('.num99').text(data[arr3[2]]);
                            }
                        });
                        //邀请榜点赞
                        $('.good31').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[0],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad31').attr('disabled','disabled');
                                        $('.good31 img').attr('src','./images/rankL.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num7').text(data[arr3[0]]);
                                            }
                                        })
                                    }else{
                                        // $('.good11 img').attr('src','./images/rankL.png');
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        $('.good32').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[1],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad32').attr('disabled',true);
                                        $('.good32 img').attr('src','./images/rankL.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num8').text(data[arr3[1]]);
                                            }
                                        })
                                    }else{
                                        // $('.good12 img').attr('src','./images/rankL.png');
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        $('.good33').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/love',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[2],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.bad33').attr('disabled',true);
                                        $('.good33 img').attr('src','./images/rankL.png'); 
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/love-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num9').text(data[arr3[2]]);
                                            }
                                        })
                                    }else{
                                        // $('.good13 img').attr('src','./images/rankL.png');                                
                                        mizhu.alert('','你已经赞/踩过了哦~');
                                    }
                                }                    
                            })
                        })
                        //邀请榜踩1
                        $('.bad31').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[0],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.good31').attr('disabled','disabled');
                                        $('.bad31 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num77').text(data[arr3[0]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                        $('.bad32').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[1],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.good32').attr('disabled','disabled');
                                        $('.bad32 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num88').text(data[arr3[1]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                        $('.bad33').on('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://p.365zhuawawa.com?r=rank/hate',
                                dataType:'json',
                                data:{
                                    love_id: mycode,
                                    loved_id:arr3[2],
                                },
                                success:function(data){
                                    // console.log(data);
                                    if(data.code == 200){
                                        $('.good33').attr('disabled','disabled');
                                        $('.bad33 img').attr('src','./images/cai@2x.png');
                                        $.ajax({
                                            type:'post',
                                            url:'http://p.365zhuawawa.com?r=rank/hate-num',
                                            dataType:'json',
                                            success:function(data){
                                                // console.log(data);
                                                $('.num99').text(data[arr3[2]]);
                                            }
                                        })
                                    }else{
                                        mizhu.alert('','你已经赞/踩过了哦~')
                                    }
                                }
                            })
                        })
                    }
                })
            }
        })

    }
})()