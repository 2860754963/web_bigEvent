
// 在用到ajax的时候 会先调用这个函数
// 这个函数会拿到我们对ajax配置的项目
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    // 在发起请求之前  拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 对有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            // 请求头
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // console.log(options.success);
})