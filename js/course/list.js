//课程列表模块
define([
    "jquery",
    "text!tpls/courseListTpl.html",
    "art"
],function ($,courseListTpl,art) {
    return function () {
        $.ajax({
            url:"/api/course",
            type:"get",
            success:function (res) {
                if(res.code!=200) throw new Error(res.msg);
                var result = res.result;
                var  html = art.render(courseListTpl,res)
                var $course =$(html);
                $course.on("click",".btn-courseTime",function () {
                    alert('课时信息')
                }).on("click",".btn-courseMes",function () {
                    alert("课程基本信息")
                })

                $('.main').html($course);
            }
        });
    }
})