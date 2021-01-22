/**
 * 高频方法集
 *
 * @author fengshuonan
 * @date 2019/7/29 21:20
 */
layui.define(['jquery', 'layer', 'admin', 'table'], function (exports) {
    var $ = layui.$;
    var layer = layui.layer;
    var admin = layui.admin;
    var table = layui.table;

    var func = {

        /**
         * 获取内部高度，返回数值
         */
        getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        },

        /**
         * 获取内部高度，返回字符串
         */
        getClientHeightPx: function () {
            return Feng.getClientHeight() + 'px';
        },

        /**
         * 打开表单的弹框
         */
        open: function (param) {

            //宽度计算
            var width = '1000px';
            if (param.width) {
                width = param.width;
            }

            //计算高度
            var clientHeight = func.getClientHeight();
            if (param.height) {
                if (clientHeight < param.height) {
                    param.area = [width, clientHeight + "px"];
                } else {
                    param.area = [width, param.height + "px"];
                }
            } else {
                param.area = [width, clientHeight + "px"];
            }

            param.skin = 'layui-layer-admin';
            param.offset = '35px';
            param.type = 2;

            admin.putTempData('formOk', false);
            param.end = function () {
                layer.closeAll('tips');
                if (param.tableId) {
                    admin.getTempData('formOk') && table.reload(param.tableId);
                }

                if (param.endCallback) {
                    admin.getTempData('formOk') && param.endCallback();
                }
            };

            if (!param.fixed) {
                param.fixed = false;
            }

            if (!param.resize) {
                param.resize = false;
            }

            if (!param.shade) {
                param.shade = .1;
            }

            //ifream 内遮罩层
            //var thisIndex = top.layui.layer.open(param);
            //ifream 内遮罩层
            var thisIndex = admin.open(param);

            //按键监听esc关闭对话框
            $(window).keydown(function (event) {
                if (event.keyCode === 27) {
                    //admin.closeThisDialog();
                    parent.layer.close(thisIndex)
                }
            });

            return thisIndex;
        }
    };

    exports('func', func);
});
