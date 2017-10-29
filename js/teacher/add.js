/**添加讲师模块
 * Created by asus on 2017/10/21.
 */
//日期控件使用导入顺序
// css导入顺序：bootstrap.css--》bootstrap-datetimepicker.css
// js导入顺序： jquery--》bootstrap-datetimepicker.js--》语言包bootstrap-datetimepicker.zh-CN.js
define([
    "jquery",
    "text!tpls/teacherAddTpl.html",

], function ($,teacherAddTpl) {
    return function () {
        var $html = $(teacherAddTpl)
        $html.on("hidden.bs.modal",function () {
            //移除模态框容器
            $(this).remove();
        }).on("shown.bs.modal",function () {
        //    日期控件一定要在模态框弹出之后呈现，否则过早会被模态框挡住，看不到
            $html.find(".date-join").datetimepicker({
                format: 'yyyy-mm-dd',
                daysOfWeekDisabled:[0,6],
                autoclose:true,
                //最小能看到的视图：
                minView:"month",
                //是否显示"今天"按钮
                todayBtn:true,
                //指定选择器的语言；要想指定语言必须首先导入相应的语言包
                language:"zh-CN"
            })
        }).on("submit","form",function (e) {
        //    阻止页面刷新
            e.preventDefault();
            //获取表单数据
            var formData = $(this).serialize()
        //    提交数据
            $.ajax({
                url:"/api/teacher/add",
                type:"post",
                data:formData,
                success:function (res) {
                    if(res.code!=200) throw  new Error(res.msg)
                //    隐藏模态框
                    $html.modal("hide");
                //    模拟点击,刷新讲师列表
                    $(".list-group a[v=teacher]").trigger("click");
                }
            })
        }).appendTo("body").modal();
    }
})
