/**
 * Created by tyliu on 2017/5/9.
 */
let env = process.env.NODE_ENV || "developemnt";
let PATH_CONFIG = require("../conf/config.json");
let ipPath = PATH_CONFIG.baseUrl[env];
let PREFIX_URL = `${ipPath}/`;

let WECHAT_AUTH_URL = `${PATH_CONFIG.wechatAuthUrl[env]}/`;

import fetchJsonp from 'fetch-jsonp';
import $ from "n-zepto";

/**
 * 判断是否在微信里
 * @returns {boolean}
 */
let isWeixin = function () {
    let ua = navigator.userAgent.toLowerCase();
    // ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 MicroMessenger/6.5.7 NetType/4G Language/zh_CN';
    return /micromessenger/i.test(ua) === true;
};

/**
 * 是否微信已授权
 */
let isWeixinAuth = function () {

    if(!isWeixin){
        return false;
    }
    let wechatId = localStorage.getItem("wechatId");
    let token = localStorage.getItem("token");
    let openid = localStorage.getItem("openid");
    let setTime = localStorage.getItem("setTime");

    if (!(wechatId && wechatId !== "" && wechatId !== null && wechatId !== "null" && wechatId !== 'undefined'&& wechatId !== undefined)) {
        return false;
    }
    if (!(token && token !== "" && token !== null && token !== "null" && token !== 'undefined'&& token !== undefined)) {
        return false;
    }
    if (!(openid && openid !== "" && openid !== null && openid !== "null" && openid !== 'undefined'&& openid !== undefined)) {
        return false;
    }
    if (!(setTime && setTime !== "" && setTime !== null && setTime !== "null" && setTime !== 'undefined'&& setTime !== undefined)) {
        return false;
    }

    // if (token && setTime) {
    let now = new Date().getTime();
    // console.log('now,setTime', now, localStorage.setTime);
    let time=(now - setTime);

    if (time > 7200 * 1000) {
        console.log('已过期');
        //客户端token已过期
        localStorage.removeItem('token');
        localStorage.removeItem("setTime");
        localStorage.removeItem("openid");
        localStorage.removeItem("wechatId");
        return false;
    }
    // }

    return true;
};

let subQueryString=function (query) {
    if (query && query.length > 0) {
        let queryParams = query.substring(1).split('&');
        let params = {};
        for (let item of queryParams) {
            let pos = item.indexOf('=');
            if (pos !== -1) {
                let name = item.substring(0, pos);
                let val = item.substring(pos + 1);
                params[name] = unescape(val);
            }
        }
        return params;
    }else{
        return {};
    }

}

let handleWechatAuth=function (query) {
    if (query && query.length > 0) {
        let params = subQueryString(query);
        let wechatId = params.wechatId;
        let token = params.token;
        let mobile = params.mobile;
        let openid = params.openid;
        let userid = params.userid;

        if(wechatId  && wechatId!=="" && wechatId!==null && wechatId!=='undefined' && wechatId!==undefined
            && token && token!=="" && token!==null && token!=='undefined' && token!==undefined
            && openid&& openid!=="" && openid!==null && openid!=='undefined' && openid!==undefined ){
            localStorage.setItem("wechatId",wechatId);
            localStorage.setItem("token",token);
            localStorage.setItem("setTime",new Date().getTime());
            localStorage.setItem("openid",openid);
        }


        if(mobile  && mobile!=="" && mobile!==null && mobile!=='undefined' && mobile!==undefined){
            localStorage.setItem("mobile",mobile);
        }
        if(userid  && userid!=="" && userid!==null && userid!=='undefined' && userid!==undefined){
            localStorage.setItem("userid",userid);
        }

        // if (!localStorage.wechatId && wechatId && wechatId !== 'undefined') {
        //     localStorage.wechatId = wechatId;
        // }
        // if (!params.from && !localStorage.token && token && token !== 'undefined') {
        //     localStorage.token = token;
        //     localStorage.setTime = new Date().getTime();
        // }
        // if (!localStorage.openid && openid && openid !== 'undefined') {
        //     localStorage.openid = openid;
        // }
        // if (!localStorage.mobile && mobile && mobile !== 'undefined') {
        //     localStorage.mobile = mobile;
        //     this.setState({mobile: mobile});
        // }
        // if (!localStorage.userid && userid && userid !== 'undefined') {
        //     localStorage.userid = userid;
        //     this.setState({userid: userid});
        // }
    }
};

/**
 *  是否已登录
 */
let isLogin = function () {
    let userId=localStorage.getItem("userid");
    let mobile=localStorage.getItem("mobile");
    // console.log(userId,mobile);
    if (!(userId && userId !== "" && userId !== null && userId !== "null" && userId !== 'undefined'&& userId !== undefined )) {
        // console.log("!!!!!",userId,mobile);
        return false;
    }
    if (!(mobile && mobile !== "" && mobile !== null && mobile !== "null" && mobile !== 'undefined'&& mobile !== undefined)) {
        // console.log("@@@@@",userId,mobile);
        return false;
    }
    return true;
};

let handlePhone = function (phone) {
    return phone.substr(0, 3) + '****' + phone.substr(7, 4);
};

let getShopList = function () {
    const STAGE_LIST = [
        {
            "ID": 658,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "北京世茂店",
            "STATUS": 1
        },
        {
            "ID": 541,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "南京IFC店",
            "STATUS": 1
        },
        {
            "ID": 671,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "南京环亚店",
            "STATUS": 1
        },
        {
            "ID": 675,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "南京金盛",
            "STATUS": 1
        },
        {
            "ID": 673,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "南京江宁店",
            "STATUS": 1
        },
        {
            "ID": 542,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "扬州珍园店",
            "STATUS": 1
        },
        {
            "ID": 561,
            "STG_TYPE": 0,
            "TYPE": 2,
            "NAME": "上海静安店",
            "STATUS": 1
        },
        {
            "ID": 647,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "沈阳大悦城",
            "STATUS": 1
        },
        {
            "ID": 654,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "西安王府井",
            "STATUS": 1
        },
        {
            "ID": 657,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "天津泰达店",
            "STATUS": 1
        },

        {
            "ID": 662,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "嘉兴旭辉店",
            "STATUS": 1
        },
        {
            "ID": 665,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "杭州解百店",
            "STATUS": 1
        },
        {
            "ID": 670,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "杭州星光店",
            "STATUS": 1
        },
        {
            "ID": 667,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "山东书城店",
            "STATUS": 1
        },
        {
            "ID": 674,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "成都大悦城",
            "STATUS": 1
        },
        {
            "ID": 676,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "长沙海信店",
            "STATUS": 1
        },
        {
            "ID": 679,
            "STG_TYPE": 0,
            "TYPE": 1,
            "NAME": "宁波和义店",
            "STATUS": 1
        }
    ];

    return STAGE_LIST;
};


//ajax 回调转成Promise
function ajaxPost(url, data) {
    return new Promise((resolve, reject) => {
        try {
            $.post(url, data, function (res) {
                resolve(res);
            });
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 公共请求方法
 * @param {*} url
 * @param {*} options为空，则为get请求,使用jsonp
 * {
 * method:xxx
 * data:{}
 * formData
 * }
 */
let request = async (url, options) => {
    let res;
    let resJson;
    try {
        if (!options) {
            res = await fetchJsonp(url);
            resJson = await res.json();
        } else {
            let formData = options.formData;
            if (!formData) {
                //普通ajax请求
                resJson = await ajaxPost(url, options.data);
            } else {
                //fetch form-data方式
                res = await fetch(url, {method: 'POST', body: formData});
                resJson = await res.json();
            }
        }
        let code = resJson.code;
        if (code === 1001) {//未登录,怎么跳转
            alert(resJson.message);
            localStorage.removeItem("loginUser");
            window.location.href = "/login";
        }
        return resJson;
    } catch (error) {
        alert(error.message);
    }

};

module.exports = {
    PREFIX_URL: PREFIX_URL,
    WECHAT_AUTH_URL: WECHAT_AUTH_URL,
    isWeixin: isWeixin,
    handleWechatAuth:handleWechatAuth,
    isLogin:isLogin,
    isWeixinAuth:isWeixinAuth,
    handlePhone: handlePhone,
    getShopList: getShopList,
    request: request,
    subQueryString:subQueryString
};