$(function () {
    //  初始化富文本编辑器
    initEditor()
    let form = layui.form
    let layer = layui.layer
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            let str = template('fenlei', res)
            // 这里会出现 渲染不进去的问题
            // 通过重新加载框架 就可以解决
            $('[name="cate_id"]').html(str)
            form.render()
        }
    });
    // 文章封面
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 400,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 4. 更换图片，绑定点击事件
    // 4.1 点击按钮 触发输入框 事件
    $('#fengmian').click(function () {
        $('#coverfiles').click()
    })
    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverfiles').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })





    // 对表单绑定事件，拿到数据 并发起请求
    $('#form_pub').submit(function (e) {
        e.preventDefault()
        let fd = new FormData($('#form_pub')[0])
        // 准备数据   数据类型是 form-data  基于表单 创建对象
        // fd.forEach(function (v, k) {
        //     // v是属性值
        //     console.log(v, k);
        //     // k是属性名
        //     //    这里通过对象 赋值得形式添加  属性名与 属性值
        //     obj[k] = v
        // })

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 400
            })
            .toBlob(function (blob) {

                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                // obj.cover_img = blob
                // 6. 发起 ajax 数据请求
                fd.append('cover_img', blob)
                // fd.forEach(function (v, k) {
                //     // v是属性值
                //     console.log(v, k);
                //     // k是属性名
                //     //    这里通过对象 赋值得形式添加  属性名与 属性值
                //     // obj[k] = v
                // })
                publish(fd)
                console.log(fd);
            })

        // let { cate_id, content, cover_img, state, title } = obj
    })

    function publish(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('发布文章失败啦！！')
                }
                layer.msg('发布文章成功啦~')
                location.href = '../../../article/article_list.html'
            }

        })
    }
})