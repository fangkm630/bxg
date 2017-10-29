/**编辑讲师模块
 * Created by asus on 2017/10/22.
 */
define([
    "jquery",
    "text!tpls/teacheEditTpl.html",
    "art"
],function ($,teacheEditTpl,art) {
    return function (tc_id) {
      $.ajax({
          url:"/api/teacher/edit",
          type:"get",
          data:{
              tc_id:tc_id
          },
          success:function (res) {
              if (res.code != 200) throw  new Error(res.msg);
              var html = art.render(teacheEditTpl, res.result);
              var $html=$(html).on("submit","form",function (e) {
                  e.preventDefault();
              //    获取表单数据
                  var formData =$(this).serialize();
                  $.ajax({
                      url:"/api/teacher/update",
                      type:"post",
                      data:formData,
                      success:function (res) {
                          if (res.code!=200) throw new Error(res.msg);
                          // 隐藏模态框
                          $html.modal("hide");
                          $(".list-group a[v=teacher]").trigger("click");
                      }
                  })
              }).on("hidden.bs.modal",function () {
                  $html.remove();//移除模态框容器
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
              }).appendTo("body").modal();//弹出模态框
          }
      })
    }
})