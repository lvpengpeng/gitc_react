import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ClassDetails.css';
// import LikeButton from "./sms.send.button";

class ClassDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleBtn:true
			// close_display: 'none',
			// text: '请输入验证码'
		}
	}
	
	static propTypes = {
		type: PropTypes.string,
	};

	// static defaultProps = {
	// 	type: 'text'
	// };
	_handleClick() {
		this.setState({
			toggleBtn:!this.state.toggleBtn
		})
	}
	// 	console.log(value.length);
	// 	this.props.getValue(value);
	// }
	// _handleClear() {
	// 	console.log(this)
	// 	let input = this.refs.input;
	// 	input.value = "";
	// 	this.setState({
	// 		close_display: 'none'
	// 	})
	// }
	render() {
		const { titleName,text} = this.props;
		// let className="name";
		// if(this.props.type === "password"){
		//     className="password";
		// }

		return (
			<li>
				<div className="clearfix special-li" onClick={this._handleClick.bind(this)}>
					<span className="fl">{titleName}</span>
					<i className={this.state.toggleBtn?"fr jt-icon rotate":"fr jt-icon rotate1"}></i>
				</div>
				{this.state.toggleBtn?<div className="special-show-font">{text}
				</div>:""}
				
			</li>

		);
	}
}

export default ClassDetails;
