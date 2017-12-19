/**入口文件
 * Created by asus on 2017/10/18.
 */
//配置require 配置接口参数
require.config({
//    基础路径
    baseUrl: "js",
    paths: {
        //配置一些常用的第三方模块路径【不能有后缀，有会报错】
        jquery: "lib/jquery-2.1.4",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        // art-template模板引擎
        art: "lib/template-web",
        //requirejs提供的架子啊html文件的插件，主要用于加载模板
        text: "lib/text",
        // 配置模板文件路径
        tpls: "../tpls",
        //配置日期控件
        datetime: "../assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker",
        datetimeLang: "../assets/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        // 配置jquery.cookie
        cookie: "lib/jquery.cookie"

    },
    shim: {
        //    因为bootstrap依赖jquery文件，所以在此处设置jquery读取完毕后再执行bootstrap
        bootstrap: {//要与上面的名称一致
            deps: ["jquery"]//要与上面的名称一致
        },
        datetimeLang: {
            deps: ["datetime"]
        }
    }
});

//入口模块 ，所有的jquery插件只需要在入口模块中导入一次即可
require([
    "jquery",
    "teacher/list",//讲师列表js路径
    "category/list",//课程分类
    "course/list",//课程管理
    "course/add",//添加课程
    "bootstrap",
    "datetime",
    "datetimeLang",
    "cookie",
    "common/myModal"  //自定义模态框
], function ($, teacherList,categoryList,courseList,courseAdd) {

    // 1 获取用户登录信息----------------------------
    var userInfoStr = $.cookie("userInfo");
    //  如果没有数据，就认为没有登陆过，而该项目必须要登录才能访问，如果没有就直接返回login
    if (!userInfoStr) return location.href = "login.html";
    var userInfo = JSON.parse(userInfoStr);
    // 将数据放到页面
    $(".profile img").attr("src", userInfo.tc_avatar);
    $(".profile .text-username").text(userInfo.tc_name);

    // 2 实现菜单切换------------------------------
    $(".list-group").on("click", "a", function () {
        //    根据菜单的内容决定要加载的内容
        //    获取v属性的值, 其实就是自定义的v属性 ,这样做的目的是防止菜单上下位置变化或者内容变化对代码的影响，
        // 避免重复修改代码
        var value = $(this).attr("v")
        // console.log(value);
        //根据value的值进行判断
        switch (value) {
            case "teacher":
                //调用teacherList 返回值
                teacherList();
                break;
            case "course":
                courseList();
                break;
            case "addcourse":
                // $(".main").html("添加课程");
                courseAdd();
                break;
            case "category":
                categoryList();
                break;
            case "chart":
                $(".main").html("图标统计");
                break;
        }
        //    改变按钮背景颜色
        $(this).addClass("active").siblings().removeClass("active");
    })
//    让浏览器默认打开时就点击讲师管理   ----》模拟点击实现
    $(".list-group a[v=teacher]").trigger("click");
//   3 实现退出功能------------------------------
    $(".link-logout").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/logout",
            type: "post",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                //    移除登录时的cookie
                $.removeCookie("userInfo");
                //    跳转到登录页面
                location.href = "login.html"
            }
        })
    })

})