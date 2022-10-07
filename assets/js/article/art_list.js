$(function () {
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;
    // 时间过滤器，美化时间
    template.defaults.imports.dataFormate = function (date) {
        const time = new Date(date)
        let y = time.getFullYear()
        let m = addzero(time.getMonth() + 1)
        let d = addzero(time.getDate())

        let hh = addzero(time.getHours())
        let mm = addzero(time.getMinutes())
        let ss = addzero(time.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 补0函数
    function addzero(n) {
        return n < 9 ? '0' + n : n
    }
    //因为发送数据时 要提交不同的参数 查询对象
    let q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: '',//文章的状态，可选值有：已发布、草稿
    }
    getdata()
    fenlei()
    // 获取列表数据
    function getdata() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('😭获取列表数据失败！！')
                }
                layer.msg('😘 获取列表数据成功了~')
                // 通过模板引擎渲染页面数据
                // console.log(res);
                let str = template('tpl_table', res)
                $('tbody').html(str)

                // 调用渲染分页得方法s
                renderPage(res)
            }
        });
    }
    // 获取所有分类数据
    function fenlei() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('😭获取分类数据失败！！')
                }
                // 模板引擎进行渲染
                let str = template('temp_fenlei', res)
                // console.log(str);
                // 这里会存在 渲染不出来的情况

                $('[name="cate_id"]').html(str)
                //  // 重新加载框架进行解决
                form.render()
            }

        })
    }
    // 点击筛选进行筛选
    $('#form_search').submit(function (e) {
        e.preventDefault()
        // 拿到相应的数据写入 q 中
        let cate_id = $('[name="cate_id"]').val()
        let state = $('[name="state"]').val()
        // 发起请求
        q.cate_id = cate_id
        q.state = state
        // console.log(cate_id);
        // console.log(state);
        // 根据 最新的 p 重新渲染 
        getdata()
    })
    // 定义渲染分页方法
    function renderPage(res) {
        // 通过总条数，计算分页数据
        laypage.render({
            elem: 'page',//注意，这里的 test1 是 ID，不用加 # 号
            count: res.total,//数据总数，从服务端得到
            limit: q.pagesize, //每页显示多少条数据
            curr: q.pagenum, //默认选中哪一页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', 'refresh'],
            limits: [2, 4, 7, 9],
            // 拿到切换后 最新得页码值，根据最新得页码值，重新发请求
            // 通过jump得回调函数 来查看 分页切换
            jump: function (obj, first) { ////这里的第二个参数 如果在点击时被触发，会出现underfind
                // 如果在 加载 renderPage()  的时候被 触发   会出现 true
                console.log(first);
                console.log(obj.curr);
                console.log(obj.limit);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 这里会出现死循环得问题
                if (!first) {
                    getdata()
                }
            }

        });
    }
    // 对删除按钮绑定事件
    $('tbody').on('click', '.btn_delet', function () {
        let length = $('.btn_delet').length///获取按钮的个数
        let id = $(this).attr('data-id')
        console.log(22222);
        layer.confirm('😭确认删除吗？', { title: '删除' }, function (index) {
            //发起请求
            $.ajax({
                url: '/my/article/delete/' + id,
                type: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('😭删除文章失败了！！')
                    }
                    layer.msg('😘删除文章成功啦~')
                    // 当一个页面的数据删除完成时，会停留在那个页面
                    // 所以 要判断当前页中是否有剩余数据，如果没有数据，则页码-1 再次调用
                    // 可以先获取页面的 删除按钮的数量  
                    if (length === 1) {
                        // 如果  length的值为1 则页面的值就没有数据了

                        // 页码值 必须为1
                        q.pagenum = pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    getdata()
                }
            })

            layer.close(index);
        });
    })

})