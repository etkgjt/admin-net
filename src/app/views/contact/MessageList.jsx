import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import AppTable from '../material-kit/tables/AppTable';
import { useDispatch, useSelector } from 'react-redux';

import { MySpinner } from 'matx/components/MySpinner';
import {
	getAllContactMessage,
	updateContactMessageToRedux,
} from '../../redux/actions/ContactAction';
import MyAlert from 'matx/components/MyAlert';
import socket from '../socket/index';

const MessageList = ({ location }) => {
	socket.on('new-message-noti', () => initialData());
	const dispatch = useDispatch();
	const listMessageReverse = useSelector(
		(state) => state.contactReducer.messages
	);
	// const listMessageReverse = listMessageRedux?.reverse();
	const [data, setData] = useState(
		listMessageReverse && listMessageReverse.length ? listMessageReverse : []
	);
	const { token } = useSelector((state) => state.user);
	useEffect(() => {
		if (
			!listMessageReverse ||
			(listMessageReverse && listMessageReverse.length === 0)
		)
			initialData();
	}, []);
	useEffect(() => {
		setData(listMessageReverse);
	}, [listMessageReverse]);
	const initialData = async () => {
		try {
			console.log('Fetch Data ne');
			const data = await getAllContactMessage(token);
			console.log('Data ne', data);
			setData(data);
			updateContactMessageToRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get Product list err', err);
		}
	};
	console.log('data ne', data);

	return (
		<div className="m-sm-30">
			{/* <div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Customer', path: '/customer-list' },
							{ name: 'Customer List' },
						]}
					/>
				</div> */}

			<h4>OrderList</h4>
			<AppTable type="contact" data={data} />
		</div>
	);
};

export default MessageList;
