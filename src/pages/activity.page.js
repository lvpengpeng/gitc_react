/*global WeixinJSBridge*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from "moment"
import './activity.page.css';
import {PREFIX_URL, WECHAT_AUTH_URL, request, isLogin,isWeixinAuth,handleWechatAuth,subQueryString} from "../common"
import {isWeixin} from "../common"
import LikeButton from "../components/sms.send.button";
import Loading from '../components/loading';
import Error from './error.page';
// const QRCode = require('qrcode.react');
// let wechat_auth_url = 'http://127.0.0.1:3002/wechat/';
const BANNER_IMAGE = require("../components/images/banner.png")
// var wx = require('weixin-js-sdk');
// console.log('wx----->',wx);

Moment.locale('zh-cn');
class Activity extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            // display_code是提醒正确输入手机号或验证码的state，当输入手机号或验证码错了店时候设置display_code: 'block',
            displayPayBox: false,
            display_tel: 'none',
            dispaly_code: 'none',
            changeNumber: false,
            code_text: "请输入验证码",
            // original_price: "99.00",
            // member_price: "66.00",
            hide_sign_up: "block",
            non_member: "block",
            number_1: 1,
            // number_2: 1,
            vip_link: "line-through",
            vip_color: "#999",
            activityId: null,
            stageId: null,
            data: {},
            bannerCss: {},
            rangeEndTime: "",
            userid: '',
            mobile: '',
            loading: true,
            errorMessage: null,
            showWarn: false,
            warnMessage: "",
            hide_sign_up_box: 'none'

        };
    }

    static propTypes = {
        number_1: PropTypes.number,
    };

    async componentWillMount() {
        // console.log(wx);

        if (this.state.non_member === "none") {
            this.setState({
                vip_link: '',
                vip_color: "#00f8ff"
            });
        }
        if (this.state.data && this.state.data.EXIST_PEOPLE_NUM && this.state.data.EXIST_PEOPLE_NUM !== 0) {
            this.setState({
                hide_sign_up_box: 'block'
            });
        }
        // this.props.match.params.activity_id;？？？
        let activityId = this.props.match.params.activity_id;
        let stageId = this.props.match.params.stg_id;

        if(isWeixin()){//在微信里，去看是否已授权过
            if(isWeixinAuth()){//已授权过，不处理

            }else{//没有处理过授权
                let query = this.props.location.search;


                if(query && query.length>0){
                    // handleWechatAuth(query);

                    let params=subQueryString(query);
                    let wechatId = params.wechatId;
                    let token = params.token;
                    let openid = params.openid;
                    let mobile=params.mobile;
                    let userId=params.userid;

                    if(wechatId  && wechatId!=="" && wechatId!==null && wechatId!=='undefined' && wechatId!==undefined
                        && token && token!=="" && token!==null && token!=='undefined' && token!==undefined
                        && openid&& openid!=="" && openid!==null && openid!=='undefined' && openid!==undefined ){
                        handleWechatAuth(query);
                        this.setState({
                            wechatId:wechatId,
                            token:token,
                            openid:openid,
                            mobile:mobile,
                            userId:userId,
                        })
                    }else{
                        window.location = WECHAT_AUTH_URL + 'goAuthorize/activity/' + activityId + '/' + stageId;
                        return;
                    }
                }else{
                    window.location = WECHAT_AUTH_URL + 'goAuthorize/activity/' + activityId + '/' + stageId;
                    return;
                }

            }
        }else{//非微信环境


        }

        try {
            // 取活动数据
            // URL
            // this.setState({loading: 'block'});
            let resJson = await request(PREFIX_URL + "activity/" + activityId + "/stg/" + stageId);
            // let resJson = await res.json();
            // console.log("getResult from server...", resJson, resJson.data);
            // this.setState({loading: 'none'});
            if (resJson && resJson.code === 0) {
                await this.setState({data: resJson.data, loaded: true});
                //page title
                // console.log(this.state.data.STGNAME);
                let title = '艾米1895';
                if (this.state.data.NAME) {
                    title = this.state.data.NAME;
                    if (this.state.data.STGNAME) {
                        title = title + '-' + this.state.data.STGNAME;
                    } else {
                        title += '-艾米1895';
                    }
                }
                document.title = title;
                //头部图片设定

                let css = {
                    width: "16rem",
                    height: "10rem",
                    background: this.state.data.PHOTO ? "url(" + this.state.data.PHOTO + ")" : "url(" + BANNER_IMAGE + ")",
                    backgroundSize: "cover",
                    overflow: "hidden",
                    borderBottom: "0.025rem solid #ccc",
                };

                this.setState({
                    bannerCss: css
                });

                //计算离结束的天数
                if (this.state.data.END_TIME) {
                    await this.setState({
                        rangeEndTime: Moment(this.state.data.END_TIME).fromNow()
                    })
                }
            } else {
                this.setState({error: resJson.message});
                alert("获取活动信息失败." + resJson.message);
            }
        } catch (err) {
            console.log('parsing failed', err);
            this.setState({error: JSON.stringify(err)});
            alert("获取活动信息失败." + JSON.stringify(err));
        }

        this.setState({loading: false});

    }

    async componentWillUpdate() {
    }

    async componentDidMount() {
        let mobile = localStorage.mobile;

        this.setState({
            mobile:mobile
        })

        //从列表页点进来直接显示购买
        let isDirectBuy = localStorage.getItem("directBuy");
        localStorage.removeItem("directBuy");

        if (isDirectBuy) {
            this.setState({
                displayPayBox: true
            })
        }
    }

    componentWillUnmount() {
       
    }

    showPayBox(e) {
        e.nativeEvent.stopImmediatePropagation();

        this.setState({
            displayPayBox: true
        })
    }

    changeNumber(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            changeNumber: true
        });
    }

    hidePayBox() {
        // this.setState({
        //     dispaly_code: 'none',
        //     changeNumber_btn: 'none'
        // });
        this.setState({
            displayPayBox: false
        })
    }

    //原手机号
    _handleInput() {
        let input = this.refs.input;
        let value = input.value;
        return value;
    }

    //新手机号
    _input_new_tel() {
        let input = this.refs.inputnewtel;
        let value = input.value;
        this.setState({
            mobile: value
        });
        return value;
    }


    getInputMobile=()=>{

        return this.state.mobile?this.state.mobile:"";
    }

    obtain_code() {
        let input = this.refs.obtaincode;
        let value = input.value;
        return value;
    }

    // changcode_text() {
    //     alert("aaa");
    // }

    fn_now_tel_1_add() {

        if (this.state.data.PEOPLE_UNIT_LIMIT_AMOUNT) {
            if (this.state.number_1 >= this.state.data.PEOPLE_UNIT_LIMIT_AMOUNT) {
                return;
            }
        }

        this.setState({
            number_1: this.state.number_1 + 1
        });
    }

    fn_now_tel_1_next() {
        if (this.state.number_1 <= 1) {
            this.setState({
                number_1: 1
            });
        } else {
            this.setState({
                number_1: this.state.number_1 - 1
            });
        }
    }

    closeError = () => {
        this.setState({
            showWarn: false,
            warnMessage: ""
        })
    }
    submitOrder = async () => {
        console.log("提交定单");
        let activityId = this.props.match.params.activity_id;
        let stageId = this.props.match.params.stg_id;

        // let mobile = localStorage.mobile;
        let mobile=this.state.mobile;
        let verifyCode;

        console.log(isLogin(), !this.state.changeNumber);

        if(this.isShowVerifyCodePay()){//默认手机号支付
            // mobile = localStorage.mobile;
        }else{
            mobile = this.state.mobile;
            verifyCode = this.obtain_code();

            if (!mobile) {
                // alert("请填写手机号!");
                this.setState({
                    showWarn: true,
                    warnMessage: "请填写手机号!"
                });
                return;
            }

            if (!(verifyCode)) {
                // alert("请填写收到的验证码!");
                this.setState({
                    showWarn: true,
                    warnMessage: "请填写收到的验证码!"
                })
                return;
            }
        }

        let order = {
            "activityid": activityId,
            "mobile": mobile,  //必填
            // "mobile":"13716820716",
            // "wechatid":"1234",
            "stgid": stageId,            //必填
            // "code": 3235,  //验证码   //如果没有wechatid 必填
            "amount": this.state.number_1   //购买数量  //必填
        }

        if (localStorage.wechatId) {
            order.wechatid = localStorage.wechatId;
        } else {
            // 获取用户输入的验证码
            // order.code = 3235;
            // if (!(verifyCode)) {
            //     // alert("请填写收到的验证码!");
            //     this.setState({
            //         showWarn: true,
            //         warnMessage: "请填写收到的验证码!"
            //     })
            //     return;
            // }
        }
        order.code = verifyCode;

        console.log("submit order.....form data is -->", order);
        // let ctx=this;
        let resJson = await request(PREFIX_URL + 'order/customer_order', {data: order});
        if (resJson && resJson.success === true) {
            // 服务器返回
            console.log("保存成功！" + JSON.stringify(resJson));

            //保存用户信息到localStorage
            if (resJson.data && resJson.data.MOBILE) {
                localStorage.setItem("mobile", resJson.data.MOBILE)
            }

            if (resJson.data && resJson.data.USER_ID) {
                localStorage.setItem("userid", resJson.data.USER_ID)
            }


            console.log(resJson.data.PAY_STATUS, typeof (resJson.data.PAY_STATUS));

            if (resJson.data.PAY_STATUS === "0" || resJson.data.PAY_STATUS === 0) {
                //请求自己的接口，获取微信所需的参数
                let data = resJson.data;
                data.openid = localStorage.getItem('openid');
                let prePayResJson = await request(WECHAT_AUTH_URL+'wechat_pay/prepay',{data:data});
                console.log(prePayResJson);
                

                //TODO 跳转至微信支付
                console.log("TODO 调用微信支付");
                // window.location.href = "/personal";
                if(prePayResJson.success==true){
                    this.onBridgeReady(prePayResJson.data);
                }else{
                    alert('调用微信预支付订单失败!!')
                }
                


                return;
            } else if (resJson.data.PAY_STATUS === "1" || resJson.data.PAY_STATUS === 1) {
                window.location.href = "/personal";
                return;
            } else {
                window.location.href = "/personal";
                return;
            }
        } else {
            console.log(resJson, resJson.message);
            //alert("保存失败！" + JSON.stringify(resJson));
            this.setState({
                showWarn: true,
                warnMessage: "保存失败！" + resJson.message
            })
        }
    }

    onBridgeReady(data) {
        alert(JSON.stringify(data));

        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":data.appId,     //公众号名称，由商户传入
                "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":data.nonceStr, //随机串
                "package":"prepay_id="+data.prepay_id,
                "signType":"MD5",         //微信签名方式：
                "paySign":data.paySign //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    console.log('微信支付成功啦～～～');
                }else{
                    alert('微信支付失败－－>'+res.err_msg);
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );

    }

    /**
     * 是否显示输入验证码的付款界面
     * @returns {boolean}
     */
    isShowVerifyCodePay(){
        return isLogin()&& !this.state.changeNumber&& isWeixin();
    }


    renderPayBox = () => {
        // console.log("是否已登录??->",isLogin() );

        // let showVerifyBox=false;
        // if(this.state.changeNumber){
        //     showVerifyBox=true;
        // }else if(!isWeixin()){
        //     showVerifyBox=true;
        // }
        return (
            <div>
                {/*默认手机号支付模块*/}
                {
                    this.isShowVerifyCodePay() ? <div className="now_tel now_tel_1"
                                     style={{display: this.state.displayPayBox ? 'block' : 'none'}}>
                        <input type="number" value={this.state.mobile} className="now_tel_val" disabled/>
                        <div className="clearfix">
                            <div className="number_val_content fl clearfix">
                                <span className="next fl" onClick={this.fn_now_tel_1_next.bind(this)}>-</span><span
                                className="number_val_text fl">{this.state.number_1}</span><span
                                className="add fl" onClick={this.fn_now_tel_1_add.bind(this)}>+</span>
                            </div>
                            <div className="fr now_tel_money">
                                <em>￥</em>{this.state.number_1 * this.state.data.PRICE / 100}
                            </div>
                        </div>
                        <div className="pay_off_btn" onClick={this.submitOrder}>提交并支付</div>
                        <p className="clearfix tel_number_btn_box">
                            <span className="fr tel_number_btn_font" onClick={this.changeNumber.bind(this)}>变更手机号</span>
                        </p>
                    </div>
                        : /*变更手机号支付模块
                     变更手机号支付模块的css样式是从默认手机号支付模块里copy过来的*/
                        <div className="now_tel now_tel_2" style={{display: this.state.displayPayBox ? 'block' : 'none'}}>
                        <input type="number" className="now_tel_val" placeholder={"请输入手机号并成为艾影会会员"}
                               onInput={this._input_new_tel.bind(this)} ref="inputnewtel"/>
                        <div className="code_input_box">
                            <input type="number" className="now_tel_val obtain_code"
                                   onInput={this.obtain_code.bind(this)}
                                   ref="obtaincode"/>
                            {/*<span className="code_input_font" onClick={this.changcode_text.bind(this)}><div
                             className="left_link">{this.state.code_text}</div></span>*/}
                            <LikeButton  onClick={this.getInputMobile}/>
                        </div>

                        <div className="clearfix">
                            <div className="number_val_content fl clearfix">
                                <span className="next fl" onClick={this.fn_now_tel_1_next.bind(this)}>-</span><span
                                className="number_val_text fl">{this.state.number_1}</span><span className="add fl"
                                                                                                 onClick={this.fn_now_tel_1_add.bind(this)}>+</span>

                            </div>
                            <div className="fr now_tel_money">
                                <em>￥</em>{this.state.number_1 * this.state.data.PRICE / 100}
                            </div>
                        </div>
                        <div className="pay_off_btn" onClick={this.submitOrder}>提交并支付</div>

                    </div>
                }


            </div>
        )
    }

    renderActivity = () => {
        return (
            <div>
                <div onClick={this.hidePayBox.bind(this)} onTouchMove={this.hidePayBox.bind(this)}>
                    <div style={this.state.bannerCss} className="overflow_hidden">
                        <div className="banner_mask">
                            <p className="clearfix banner_mask_top"><span
                                className="fl shop_title">{this.state.data.NAME}</span>
                                <span className="fr have_vip">￥{this.state.data.PRICE / 100}</span>
                            </p>
                            <p className="clearfix"><i className="shop_icon fl"/><span
                                className="fl shop_name">{this.state.data.STGNAME}</span><span
                                className="fl shop_state">正在发起...</span>

                                {/*{localStorage.mobile ?
                                 <div>
                                 <span
                                 className="fr vip_money">￥{this.state.data.USER_PRICE / 100}</span>
                                 <i className="vip fr"></i></div> : ""
                                 }*/}
                            </p>
                        </div>
                    </div>
                    <div style={{display: this.state.hide_sign_up_box}}>
                        <div className="loading_content" style={{display: this.state.hide_sign_up}}>
                            <p className="pople_number">{this.state.data.EXIST_PEOPLE_NUM}人已报名</p>
                            {this.state.data.REMAIN_PEOPLE_NUM > 0 ?
                                <div className="loading_box">
                                    <div className="loading_icon"/>
                                </div>
                                : ""}
                            <div className="clearfix home_day">
                                {this.state.data.REMAIN_PEOPLE_NUM > 0 ?
                                    <span
                                        className="fl">剩余{this.state.data.REMAIN_PEOPLE_NUM} {this.state.data.UNIT_DESC}</span>
                                    :
                                    ""}
                                {this.state.rangeEndTime ?
                                    <span className="fr">剩余：{this.state.rangeEndTime}</span>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>

                    <div className="activity_content">
                        <div className="activity_name">活动详情</div>
                        <div className="activity_name_content_auto">
                            <div dangerouslySetInnerHTML={{__html: this.state.data.DETAIL}}/>
                        </div>
                    </div>
                    {/*<div className="activity_content">*/}
                    {/*<div className="activity_name">温馨提示</div>*/}
                    {/*{this.state.data.TIPS}*/}
                    {/*</div>*/}
                    <div className="aimi_code_box">
                        <div className="clearfix aimi_code_content">
                            <div className="aimi_code_left fl">
                                {/*二维码*/}
                                <img src={this.state.data.STGMAP} alt=""/>
                                {/*<div className="qrcode_positive">
                                 <QRCode size={128} value={"http://baidu.com"} />
                                 </div>*/}
                                <p>关注艾米{this.state.data.STGNAME}</p>
                            </div>
                            <div className="aimi_code_right fl">
                                <a href="http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MjM5MTE0MzU2MA==#wechat_webview_type=1&wechat_redirect">
                                    <img src={require("../components/images/5.png")} alt=""/>
                                </a>
                                <p>关注艾米1895</p>
                            </div>
                        </div>
                        <div className="aimi_code_box_fonts">关注艾米电影街官方微信，参加更多活动！</div>
                    </div>
                </div>

                < div className="footer clearfix">
                    <a href={"tel:" + this.state.data.PHONE}><span className="tel_icon fl">  </span></a>
                    <span className="add_activity fl" onClick={this.showPayBox.bind(this)}>我要报名</span>
                </div>
                {/*弹框模块*/}
                <div className="pop_tel" style={{display: this.state.display_tel}}>
                    <span className="pop_tel_close">X</span>
                    请正确输入手机号或验证码
                </div>
                {
                    this.renderPayBox()
                }
                {
                    this.state.showWarn ? <div className="warnModel">
                        <div className="warning"><i className="closeWarn"
                                                    onClick={this.closeError}/>{this.state.warnMessage}</div>
                    </div> : ""
                }
            </div>
        )
    }

    render() {

        return (
            <div className="bg">
                {
                    this.state.errorMessage ? <Error message={this.state.errorMessage}/> : this.state.loading ?
                        <Loading display_show={this.state.loading}/> : this.renderActivity()
                }
            </div>  
        );
    }
}

export default Activity;

