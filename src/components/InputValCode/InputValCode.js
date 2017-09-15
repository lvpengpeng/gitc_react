import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputValCode.css';
import LikeButton from "./sms.send.button";

class InputValCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			close_display: 'none',
			text: '请输入验证码'
		}
	}
	static propTypes = {
		type: PropTypes.string,
	};

	static defaultProps = {
		type: 'text'
	};
	_handleInput() {
		let input = this.refs.input;
		let value = input.value;
		if(value.length) {
			this.setState({
				close_display: 'block'
			})
		}else{
			this.setState({
				close_display: 'none'
			})
		}
		console.log(value.length);
		this.props.getValue(value);
	}
	_handleClear() {
		console.log(this)
		let input = this.refs.input;
		input.value = "";
		this.setState({
			close_display: 'none'
		})
	}
	render() {
		// const { type} = this.props;
		// let className="name";
		// if(this.props.type === "password"){
		//     className="password";
		// }

		return (
			<div>
				<div className={this.props.class}>
					<input onInput={this._handleInput.bind(this)} type={this.props.type ? this.props.type : 'text'} className="fl" ref="input" placeholder={this.state.text}/>
					{/*<em className="code-btn">获取验证码</em>*/}
					<LikeButton/>
				</div>
			</div>

		);
	}
}

export default InputValCode;
