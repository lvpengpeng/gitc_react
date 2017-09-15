/**
 * Created by tyliu on 2017/5/22.
 */
/* rem.js文件内容 */
;(function(win, doc){
    function change(){
        doc.documentElement.style.fontSize=20*doc.documentElement.clientWidth/320+'px';
    }
    change();

    win.addEventListener('resize', change, false);
})(window, document);