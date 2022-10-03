$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#file').hide()

    $('#btnImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        let filelist = e.target.files
        console.log(filelist);
        if (filelist.length == 0) {
            return layer.msg(`请先上传图片呐`)
        }
        // 拿到文件
        let file = e.target.files[0]
        console.log(file);
        // 将文件转化为url路径
        let imgurl = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgurl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 对确定进行事件绑定
    $('#btn_upload').on('click', function () {
        console.log(11);
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发起请求
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (response) {
                if (response.status != 0) {
                    return layer.msg(`更换失败了！！`)
                }
                layer.msg(`更换成功啦~`)
                window.parent.getInfo()
            }
        });




    })







})