/**自己的插件，基于jquery+bootstrap 模态框插件
 * Created by asus on 2017/10/29.
 */
define([
    "jquery"
],function ($) {
    $.fn.extend({
        myModal:function () {
            this.on("hidden.bs.modal",function () {
                this.remove();
            }).appendTo("body").modal();
            // 实现链式编程，执行完毕后，用户还可以去调用其他的jquery方法
            return this;
        }
    })
})