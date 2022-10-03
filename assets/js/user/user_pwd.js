$(function () {
    // 2022、10、03
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , samePwd: function (value) {
            if (value == $('[name = "oldpwd"]').val()) {
                return '新旧密码不能相同呐~'
            }
        }
        , rePwd: function (value) {
            if (value != $('[name="newPwd"]').val()) {
                return '两次密码不一致呐~'
            }
        }
    });
    // 发起请求，修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log(111);
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: {
                oldPwd: $('[name="oldpwd"]').val(),
                newPwd: $('[ name="newPwd" ]').val()
            },
            success: function (response) {

                if (response.status != 0) {
                    return layui.layer.msg('更新密码失败了！！')
                }
                layui.layer.msg('更新密码成功啦~')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    })


})