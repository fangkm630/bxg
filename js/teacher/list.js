/**讲师列表模块
 * Created by asus on 2017/10/18.
 */
define([
    "jquery",
    //用requireJS官方提供的text查看读取模板内容
    //text插件的路径 ! 模板文件的路径(不能省略.html后缀名)
    "text!tpls/teacherListTpl.html",
    //arttemplate模板引擎
    "art",
    //查看讲师信息模块
    "teacher/show",   //也可以用./show写
    "teacher/add",
    "teacher/edit",
    "teacher/status",
],function ($,teacherListTpl,art,teacherShow,teacherAdd,teacherEdit,teacherStatus) {
    //记得把结果返回!!!!!!!!!!!!!!!!!---------------------
    return function () {
        //    怎么完成渲染讲师列表功能？
//    ---》把整个页面拼接出来
//        --》也就是把页面结构 + 页面数据整合在一起
//           --》 页面结构 : 模板引擎
//              --》数据：ajax请求
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
                // 将时间绑定在这个新创建的特定的panel中
                var $panel =$(html);

                $panel.on("click",".btn-show",function () {
                //通过适当的方式获取对应的讲师id-----》teacherListTpl模板中获取数据时id存储在对应表格中
                    var tc_id =$(this).parent().attr("tc_id");
                    //查看讲师
                    teacherShow(tc_id);
                }).on("click",".btn-add",function () {
                    //添加讲师
                    teacherAdd();
                }).on("click",".btn-edit",function () {
                    //编辑讲师
                    var tc_id =$(this).parent().attr("tc_id");
                    teacherEdit(tc_id);
                }).on("click",".btn-status",function () {
                    var $this =$(this);
                    // 获取页面数据
                    var tc_id =$this.parent().attr("tc_id");
                    var tc_status =$this.parent().attr("tc_status");
                    //把数据传输到模块中
                    teacherStatus(tc_id,tc_status,function (status) {
                    //    修改文本状态
                        $this.parent().siblings(".tc_status").text(status==0?"启用":"注销");
                    //    修改按钮
                        $this.text(status==0?"注销":"启用");
                    //    同步修改存在td上的tc_status属性值
                        $this.parent().attr("tc_status",status)
                    });
                })

                //把真实的内容放到页面上
                $(".main").html($panel);
            }
        })
    }

})