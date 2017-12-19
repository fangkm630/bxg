/**
 * 添加课程模块
 */
define([
    "jquery",
    "text!tpls/courseAddTpl.html"
], function ($,courseAddTpl) {
    return function () {
        $(courseAddTpl).myModal()
    }
})