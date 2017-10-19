/**讲师列表模块
 * Created by asus on 2017/10/18.
 */
define([
    "jquery",
    //用requireJS官方提供的text查看读取模板内容
    //text插件的路径 ! 模板文件的路径(不能省略.html后缀名)
    "text!tpls/teacherListTpl.html",
    //arttemplate模板引擎
    "art"
],function ($,teacherListTpl,art) {
    //记得把结果返回!!!!!!!!!!!!!!!!!---------------------
    return function () {
        //    怎么完成渲染讲师列表功能？
//    ---》把整个页面拼接出来
//        --》也就是把页面结构 + 页面数据整合在一起
//           --》 页面结构 : 模板引擎
//              --》数据：ajax请求
//         $(".main").html(teacherListTpl);//这句不需要写，否则会先显示出代码
        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function (res){
                // 判断语句缩写，如果只有一句条件，则可以省略 {} ，减少{}的嵌套
                if(res.code!=200)  return  console.log(res.msg);
                // 请求成功,获取数据
                var result = res.result;
                //  把数据编译到模板中----》获取到真实的内容
                //    art.render(参数1，参数2) 将渲染的结果返回
                //    参数1：模板名称或者id
                //    参数2：模板数据
                // console.log(result);
                var html = art.render(teacherListTpl,{
                    r:result
                });
                //    把真实的内容放到页面上
                $(".main").html(html);
            }
        })
    }

})