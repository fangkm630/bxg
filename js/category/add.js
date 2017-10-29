/** 添加分类
 * Created by asus on 2017/10/26.
 */
// ajax数据获取到时可以进行修改的，只要在使用前修改都有效果，添加顶级分类  这个选项就是个例子
define([
    "jquery",
    "text!tpls/categoryAddTpl.html",
    "art"
], function ($, categoryAddTpl, art) {
    return function () {
        $.ajax({
            //请求上级分类数据
            url: "/api/category/top",
            type: "get",
            success: function (res) {
                if (res.code != 200) throw  new Error(res.msg);
                //将顶级分类 添加到res.result第一个中，
                res.result.unshift({cg_id: 0, cg_name: "顶级分类"})
                // 将数据编译到模板中
                var categoryAdd = art.render(categoryAddTpl, res);
                // 将编译的结果放到页面中
                var $categoryAdd = $(categoryAdd)
                    .on("submit", "form", function (e) {
                        //阻止默认提交后跳转
                        e.preventDefault();
                        //获取表单数据
                        var formData = $(this).serialize();
                        // 发送ajax请求
                        $.ajax({
                            url: "/api/category/add",
                            type: "post",
                            data: formData,
                            success: function (res) {
                                if (res.code != 200) throw  new Error(res.msg);
                            //    关闭模态框--》隐藏模态框
                                $categoryAdd.modal("hide");
                            //    模拟点击刷新列表；
                                $(".list-group a[v=category]").trigger("click")
                            }
                        })
                    })
                    .modal();
            }

        })

    }
})