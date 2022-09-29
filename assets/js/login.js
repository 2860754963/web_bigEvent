$(function () {
    // 点击去注册   绑定事件
    $('#link_red').on('click', function () {
        $('.login').slideUp()
        $('.red').slideDown()
    })

    // 点击去登录   绑定事件
    $('#link_login').on('click', function () {
        $('.red').slideUp()
        $('.login').slideDown()
    })

    // layui 自定义 校验规则
    // 从 layui中获得对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 自定义pwd校验规则，第二项为错误提示
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 拿到确认密码框的内容
            // 拿到密码框的内容 然后进行 判断
            let psdval = $('.red [name=password]').val()
            if (psdval != value) {
                return `两次密码不一致`
            }

        }
    })

    // 对注册表单绑定 提交事件
    $('#form_red').on('submit', function (e) {
        e.preventDefault()
        // 发起请求
        let username = $('#form_red [name=uname]').val()
        let password = $('#form_red [name=password]').val()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                console.log(response);
                if (response.status != 0) {
                    return layer.msg(response.message, { icon: 5 });
                }
                layer.msg('注册成功,请登录', { icon: 1 });
                // 函数自调用
                $('#link_login').click()
            }
        });
    })
    // 登录 事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        // let str = { data: $('#form_login').serialize() }
        // console.log(typeof str.data);
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: {
                username: $('#uname').val(),
                password: $('#upsd').val()
            },
            success: function (res) {
                // console.log($('#form_login').serialize());
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功,请登录', { icon: 1 });
                console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })





})