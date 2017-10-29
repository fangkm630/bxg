/**课程分类
 * Created by asus on 2017/10/24.
 */
// 注意 ajax 中url 别写成ulr了，否则获取不到数据
define([
    "jquery",
    "text!tpls/categoryListTpl.html",
    "category/add",
    "category/edit",
    "art"
],function ($,categoryListTpl,categoryAdd,categoryEdit,art) {
    return function () {
        $.ajax({
            url:"/api/category",
            type:"get",
            success:function (res) {
                if(res.code!=200) throw new Error(res.msg);
                //获取数据，编译模板
                console.log(res);
                var categoryList = art.render(categoryListTpl,res);
                var $categoryList =$(categoryList)
                $categoryList.on("click",".btn-add",function () {
                    categoryAdd();
                }).on("click",".btn-edit",function () {
                    var tc_id =$(this).parent().attr("cg_id")
                    categoryEdit(tc_id)
                })
                //将编译后的结果放到页面中
                $(".main").html($categoryList);
            }
        })
    }
})