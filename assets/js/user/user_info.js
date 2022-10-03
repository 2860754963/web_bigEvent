$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                console.log(222);
                return `昵称长度必须在1-6个字符之间`
            }
        }
    });

    // 发起请求   拿到用户信息
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return `获取用户信息失败`
            }
            // 快速给表单赋值
            form.val('formuserinfo', res.data)
        }
    });
    // 2022 / 10 / 3
    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log($('.layui-form').serialize());
        // 发起请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $('.layui-form').serialize(),
            success: function (res) {
                console.log(111);
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(`修改失败了`)
                }
                layer.msg(`恭喜你成功了`)
                // 在子页面如何调用父页面的方法 获取用户基本信息方法
                window.parent.getInfo()

            }
        });

    })











})