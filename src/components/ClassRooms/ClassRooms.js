import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ClassRooms.css';
// import LikeButton from "./sms.send.button";

class ClassRooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		// this.onfetch=this.onfetch.bind(this)
	}
	
	static propTypes = {
		type: PropTypes.object
	};
	render() {
		const {roomList} = this.props;
		
		return (
			<li onClick={this.props.onfetch}>
				{roomList}
			</li>

		);
	}
}

export default ClassRooms;
