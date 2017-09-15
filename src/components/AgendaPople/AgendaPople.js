import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AgendaPople.css';
class AgendaPople extends Component {
	constructor(props) {
		super(props);
		this.state={
			li:{
				width:'15rem',
				margin:"0.4rem auto",
				background:'red'
			},
			div:{
				width:'14rem',
				margin:"0 auto"
			}
		}
	}
	
	static propTypes = {
		type: PropTypes.string,
	};

	_handleClick() {
	}
	render() {
		return (
			<li style={this.state.li}>
				<div style={this.state.div}>11</div>
			</li>

		);
	}
}

export default AgendaPople;
