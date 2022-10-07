$(function () {

    getlists()
    let layer = layui.layer
    let form = layui.form
    // 获取文章分类列表
    function getlists() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(`😭获取列表数据失败`);
                }
                console.log(res);
                let str = template('tpl_table', res)
                $('tbody').html(str)
            }
        });
    }
    let guanbi = null
    // 点击添加类别
    $('#btn_addcate').on('click', function () {
        guanbi = layer.open({
            // 基本层类型  页面层
            type: 1
            , area: ['500px', '300px']
            , title: `<b>添加文章分类</b>`
            , content: $('#add_dialog').html()

        });

    })
    // 给表单绑定submit事件

    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            // 接口问题
            // 接口问题
            // 接口问题
            type: 'post',
            url: '/my/article/addcates',
            data: {
                name: $('input[name="name"]').val(),
                alias: $('input[name="alias"]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(`😭新增失败了！`);
                }
                getlists()
                layer.msg(`😏新增成功啦~`);
                layer.close(guanbi)
            }
        })
    })
    let indexEdit = null
    // 点击修改
    $('tbody').on('click', '.btn_edit', function () {
        console.log(222);
        // 弹出
        indexEdit = layer.open({
            // 基本层类型  页面层
            type: 1
            , area: ['500px', '300px']
            , title: `<b>修改文章分类</b>`
            , content: $('#edit_dialog').html()

        });
        let id = $(this).attr('data-id')
        $.ajax({
            // 接口问题
            // 接口问题
            // 接口问题
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(`😭获取失败了！`);
                }
                form.val('form_edit', res.data)
            }
        })


    })
    // 修改分类，绑定事件
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(`${res.message}`);
                }
                layer.msg(`😏更新分类数据成功~`);
                layer.close(indexEdit)
                getlists()
            }
        })
    })

    // 删除事件
    $('tbody').on('click', '.btn_delet', function (res) {
        let id = $(this).attr('data-id')
        console.log(id);
        // 提示用户是否要删除
        layer.confirm('真的要删除吗？', { title: '😭删除' }, function (index) {
            //    、在这里发起请求了
            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'GET',
                success: function (res) {

                    if (res.status != 0) {
                        return layer.msg(`😭${res.message}`);
                    }
                    layer.msg(`😏删除成功~`);
                    layer.close(index);
                    getlists()
                }
            })

        });
    })


})