/**注销、启用讲师模块
 * Created by asus on 2017/10/22.
 */
define([
    "jquery"
],function ($) {
    return function (tc_id,tc_status,callback) {
    //修改服务器中的数据
        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:{
                tc_id:tc_id,
                tc_status:tc_status
            },
            success:function (res) {
                if(res.code!=200) throw new Error(res.msg);
            //    获取最新状态值
                var tc_status =res.result.tc_status;
                //callback 其实就是 list.js中teacherStatus()里面的匿名函数
                callback(tc_status);
            }
        })
    }
})