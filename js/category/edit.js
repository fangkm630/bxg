/**编辑分类
 * Created by asus on 2017/10/27.
 */
define([
    "jquery",
    "text!tpls/categoryEditTpl.html",
    "art"
], function ($, categoryEditTpl, art) {
    return function (tc_id) {
        $.ajax({
            url:"/api/category/edit",
            type: "get",
            data:{cg_id:tc_id},
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                res.result.top.unshift({cg_id:0,cg_name:"顶级分类"})
                console.log(res);
                //将数据编译到模板
                var categoryEdit = art.render(categoryEditTpl,res.result);
                var $categoryEdit =$(categoryEdit)
                    .on("submit","form",function (e) {
                        e.preventDefault();
                    //    获取输入数据
                        var forData=$(this).serialize();
                    //    把数据提交到服务器
                        $.ajax({
                            url:"/api/category/modify",
                            type:"post",
                            data:forData,
                            success:function (res) {
                                if (res.code != 200) throw new Error(res.msg);
                                //隐藏模态框
                                $categoryEdit.modal("hide")
                            //    刷新分类列表
                                $(".list-group a[v=category]").trigger("click");
                            }
                        })
                    })
                // 显示模态框
                    .myModal();
            }
        })
    }
})
