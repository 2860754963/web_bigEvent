$(function () {
    getInfo()
    // 基本资料



    // 更新用户信息
    // $.ajax({
    //     type: 'post',
    //     url: '/my/userinfo',
    //     headers: {
    //         // 请求头
    //         Authorization: localStorage.getItem('token') || ''
    //     },
    // })

    let layer = layui.layer
    //点击退出
    $('#tuichu').on('click', function () {
        console.log(111);
        // 二次确认退出
        layer.confirm('真的确定要退出嘛？', { icon: 3, title: '舍不得退出' }, function (index) {
            console.log(1);
            localStorage.setItem('token', '')
            location.href = '../../login.html'
            layer.close(index);
        });
    })



})
// 获取用户基本信息
function getInfo() {
    $.ajax({
        // 导入baseapi
        type: 'get',
        url: '/my/userinfo',
        // complete: function (r) {
        //     console.log(r);
        //     if (r.responseJSON.status == 1) {
        //         localStorage.removeItem('token')
        //         location.href = '../../login.html'
        //     }
        // },
        success: function (res) {
            console.log(res);
            if (res.status === 1) {
                localStorage.removeItem('token')
                location.href = '../../login.html'
            }
            // 渲染头像
            xuanran(res)
        }

    })
}
// 渲染头像
function xuanran(res) {
    let pic = res.data.user_pic
    let uname = res.data.username
    $('#welcome i').html(uname)
    if (pic == null) {
        $('.userinfo img').hide()
        $('.zimu').html(uname.slice(0, 1).toUpperCase())
    } else {
        $('.zimu').hide()
        $('.userinfo img').show()
        $('.userinfo img').attr('src', pic)
    }
}

