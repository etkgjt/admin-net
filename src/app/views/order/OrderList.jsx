import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import AppTable from '../material-kit/tables/AppTable';
import { useDispatch, useSelector } from 'react-redux';

import { MySpinner } from 'matx/components/MySpinner';
import {
	getOrderList,
	updateOrdersRedux,
} from '../../redux/actions/OrderAction';
import MyAlert from 'matx/components/MyAlert';
import socket from '../socket/index';

const OrderList = ({ location }) => {
	socket.on('new-order-noti', () => initialData());
	const subscribarList = [
		{
			name: 'john doe',
			date: '18 january, 2019',
			amount: 1000,
			status: 'close',
			company: 'ABC Fintech LTD.',
		},
	];
	const dispatch = useDispatch();
	const ordersRedux = useSelector((state) => state.orderReducer.orders);
	const ordersReduxReverse = ordersRedux;
	const [data, setData] = useState(
		ordersReduxReverse && ordersReduxReverse.length ? ordersReduxReverse : []
	);
	const { token } = useSelector((state) => state.user);
	useEffect(() => {
		if (
			!ordersReduxReverse ||
			(ordersReduxReverse && ordersReduxReverse.length === 0)
		)
			initialData();
	}, []);
	useEffect(() => {
		setData(ordersReduxReverse);
	}, [ordersReduxReverse]);
	const initialData = async () => {
		try {
			console.log('Fetch Data ne');
			const data = await getOrderList(token);
			data.reverse();
			console.log('Data ne', data);
			setData(data);
			updateOrdersRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get Product list err', err);
		}
	};

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

			<AppTable type="order" data={data} />
		</div>
	);
};

export default OrderList;
