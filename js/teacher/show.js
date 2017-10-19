/**查看讲师信息
 * Created by asus on 2017/10/19.
 */
define([
    "jquery",
    "text!tpls/teacherShowTpl.html",
    "art"
], function ($, teacherShowTpl, art) {
    //通过传参获取点击讲师信息的id，传送到数据库，从而获取讲师数据
    return function (id) {
        $.ajax({
            url: "/api/teacher/view",
            type: "get",
            data: {
                tc_id: id,
            },
            success: function (res) {
                //    判断数据状态是否异常
                if (res.code != 200) throw  new Error(res.msg);
                //    获取正常数据，把数据编译到模板中
                var html = art.render(teacherShowTpl, res.result);
                //    把编译好的内容放到网页中，并且以模态框的形式呈现
                var $html=$(html).on("hidden.bs.modal",function () {
                    //将本模态框的容器代码从页面中移除，否则每次点击都会添加模态框代码
                    $html.remove();
                }).appendTo("body").modal();//弹出模态框
            }
        })
    }
})
