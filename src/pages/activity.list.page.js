import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom'
// import { PREFIX_URL,request } from "../common"
// import { getShopList, handlePhone } from "../common"
import ClassDetails from "../components/ClassDetails/ClassDetails"
import ClassRooms from "../components/ClassRooms/ClassRooms"
import AgendaPople from "../components/AgendaPople/AgendaPople"
// // import fetchJsonp from 'fetch-jsonp';
import './activity.list.page.css';
// import StgItem from "../components/stg.item";
const LOGO_1 = require('../components/images/logo1.jpg')
const LOGO_2 = require('../components/images/logo2.jpg')
const MAP = require('../components/images/map.png')

export default class Activity extends Component {
    constructor(...args) {
        super(...args);
        this.onFetch = this.onFetch.bind(this)
        this.state = {
            data:null,
            data1:[],
            DATAS:[]
        }
        this.onfetchBtn=this.onfetchBtn.bind(this)
    }
    componentWillMount(){
        let rooms  = require("./../mock/data");
        console.log(rooms["DATAS"],'llllllllllll')
        this.setState({
            data:rooms,
            data1:rooms["DATA23"],
            DATAS:rooms["DATAS"]
        })

    }
    onfetchBtn(e){
        console.log(e.target.innerHTML)
    }
    componentDidMount(){
       
    }
    onFetch(e){
        this.setState({
            data1:this.state.data[e.target.getAttribute('name')]
        })
    }
       
    render() {

        return (
            <span>
                <div className="index-banner"></div>
                <div className="content">
                    <div className="highlights">
                        <h3 className="highlights-name ">大会亮点</h3>
                        <p className="highlights-title">ASSEMBLY HIGHLIGHTS</p>
                        <ul className="highlights-ul clearfix">
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font "> 领袖峰会</div>
                                <div>触电行业最强大脑</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font "> 领袖峰会</div>
                                <div>触电行业最强大脑</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font "> 领袖峰会</div>
                                <div>触电行业最强大脑</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                            <li className="highlights-li ">
                                <span className="highlights-icon1"></span>
                                <div className="highlights-li-font ">行业领袖</div>
                                <div>技术军团旗帜人物</div>
                            </li>
                        </ul>
                    </div>
                    <div className="special">
                        <h3 className="special-name">大会专题</h3>
                        <p className="special-title">GENERAL ASSEMBLY TOPICS</p>
                        <ul className="special-ul ">
                            {this.state.DATAS?
                            this.state.DATAS.map((data,index)=>{
                               return <ClassDetails key={index} text={data.text} titleName={data.name}/>
                            }):""}
                            {/*<ClassDetails taxt="222" titleName="主会场1"/
                           <ClassDetails taxt="222"  titleName="主会场2"/>
                           <ClassDetails taxt="222" titleName="主会场3"/>
                           <ClassDetails  taxt="222" titleName="主会场4"/>*/}
                        </ul>
                    </div>
                    <div className="pr big">
                        <h3 className="agenda-name">大会议程</h3>
                        <p className="agenda-title">GENERAL ASSEMBLY AGENDA</p>
                        <Link to="./error.page" className="look-all">查看全部 》</Link>
                    </div>
                    <div className="agenda-content" >
                        <div className="time"  onClick={this.onFetch}>
                            <span className="time1 cat-btn" name="DATA23">11.23</span>
                            <span className="time2" name="DATA24">11.24</span>
                        </div>
                        <div className="agenda-ul-box">
                            <div className="agenda-ul-toggle" style={{ display: "block" }}>
                                <ul className=" agenda-ul agenda-ul-btn1 clearfix">
                                    {/*<li className="toggle-bg">主会会场</li>*/}
                                    {/*<ClassRooms roomList="主会场1"/>
                                    <ClassRooms roomList="主会场2"/>
                                    <ClassRooms roomList="主会场3"/>*/}
                             {this.state.data1?
                            this.state.data1.map((data,index)=>{
                               return <ClassRooms key={index} roomList={data.name} onfetch={this.onfetchBtn}/>
                            }):""}
                                </ul>
                                <div className="agenda-pople-box agenda-pople-box-btn1" >
                                    <ul className="agenda-pople" style={{ display: "block" }}>
                                        <AgendaPople/>
                                       <AgendaPople/>
                                    </ul>
                                </div>
                            </div>
                            {/*<div className="agenda-ul-toggle">
                                <ul className="agenda-ul agenda-ul-btn2 clearfix">
                                    <ClassRooms roomList="24主会场1"/>
                                    <ClassRooms roomList="24主会场2"/>
                                    <ClassRooms roomList="24主会场3"/>
                                </ul>
                                <div className="agenda-pople-box agenda-pople-box-btn2">
                                    <ul className="agenda-pople" style={{ display: "block" }} >
                                        <li>11</li>
                                        <li>111</li>
                                        <li>11</li>
                                        <li>11</li>
                                    </ul>
                                    <ul className="agenda-pople" >
                                        <li>22</li>
                                        <li>22</li>
                                        <li>22</li>
                                        <li>22</li>
                                    </ul>
                                    <ul className="agenda-pople">
                                        <li>33</li>
                                        <li>33</li>
                                        <li>33</li>
                                        <li>33</li>
                                    </ul>
                                    <ul className="agenda-pople">
                                        <li>44</li>
                                        <li>44</li>
                                        <li>44</li>
                                        <li>33</li>
                                    </ul>
                                </div>
                            </div>*/}
                            <a href="#" className="btn-all btn-all-bottom " >会议提要 &nbsp&nbsp》 </a>
                            <div className="guests-popole">
                                <div className="highlights">
                                    <h3 className="highlights-name ">大会嘉宾</h3>
                                    <p className="highlights-title">ASSEMBLY HIGHLIGHTS</p>
                                </div>
                                <span className="title-btn "> 大会主席团	</span>
                                <ul className="guests-popole-ul clearfix">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <a href="#" className="btn-all btn-all-bottoms" >查看更多 &nbsp&nbsp》 </a>
                                <span className="title-btn "> 专家顾问团	</span>
                                <ul className="guests-popole-ul clearfix">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <a href="#" className="btn-all btn-all-bottoms" >查看更多 &nbsp&nbsp》 </a>
                                <span className="title-btn "> 演讲嘉宾	</span>
                                <ul className="guests-popole-ul clearfix">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <a href="#" className="btn-all btn-all-bottoms" >查看更多 &nbsp&nbsp》 </a>
                            </div>
                            <div className="logo">
                                <div className="highlights">
                                    <h3 className="highlights-name ">合作伙伴</h3>
                                    <p className="highlights-title">ASSEMBLY HIGHLIGHTS</p>
                                </div>
                            </div>
                            <div className="logo-contnet">
                                <p>钻石赞助</p>
                                <img src={LOGO_1} alt="" />
                                <p>媒体合作</p>
                                <img src={LOGO_2} alt="" />
                                <a href="#" className="btn-all btn-all-bottoms" >赞助机会 &nbsp&nbsp》 </a>
                            </div>
                            <div className="bg-b">
                                <div className="maps" >
                                    <div className="highlights">
                                        <h3 className="highlights-name ">参会指南</h3>
                                        <p className="highlights-title">ASSEMBLY HIGHLIGHTS</p>
                                    </div>
                                    <img src={MAP} alt="" />
                                    <p>时间:2017.11.23-11.24</p>
                                    <p>地址:国家会议中心</p>
                                    <p>乘车地址:地铁十五号线奥林匹克公园站H西南口下车</p>
                                </div>
                                <div className="about-me">
                                    <div className="highlights">
                                        <h3 className="highlights-name ">联系我们</h3>
                                        <p className="highlights-title">ASSEMBLY HIGHLIGHTS</p>
                                    </div>
                                    <p className="one">赞助大会&展览展示咨询：business@kylinclub.org</p>
                                    <p>合作单位&合作媒体咨询：gitc@kylinclub.org</p>
                                    <p>麒麟会会员申请咨询：mrnmber@kylinclub.org</p>
                                    <p>志愿者招募：staff@kylinclub.org</p>
                                    <p>致电电话：010-88323888</p>
                                    <span className="code"></span>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    <a href="https://www.baidu.com" className="live">直播</a>
                </div>
                
            </span>
        );
    }
}

