
// 在用到ajax的时候 会先调用这个函数
// 这个函数会拿到我们对ajax配置的项目
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起请求之前  拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})