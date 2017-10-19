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
    },
    shim: {
        //    因为bootstrap依赖jquery文件，所以在此处设置jquery读取完毕后再执行bootstrap
        bootstrap: {//要与上面的名称一致
            deps: ["jquery"]//要与上面的名称一致
        }
    }
});

//入口模块
require(["jquery","teacher/list"], function ($,teacherList) {
//    实现菜单切换
    $(".list-group").on("click", "a", function () {
        //    根据菜单的内容决定要加载的内容
        //    获取v属性的值, 其实就是自定义的v属性 ,这样做的目的是防止菜单上下位置变化或者内容变化对代码的影响，
        // 避免重复修改代码
        var value = $(this).attr("v")
        // console.log(value);
        //根据value的值进行判断
        switch (value) {
            case "teacher":
                // $(".main").html("讲师管理");
                //调用teacherList 返回值
                teacherList();
                break;
            case "course":
                $(".main").html("课程管理");
                break;
            case "addcourse":
                $(".main").html("添加课程");
                break;
            case "category":
                $(".main").html("课程分类");
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

})