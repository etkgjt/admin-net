import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import AppTable from '../material-kit/tables/AppTable';
import { getAllCustomer } from 'app/redux/actions/CustomerAction';
import { useSelector, useDispatch } from 'react-redux';
import StateManager from 'react-select';
import { updateAllCustonerToRedux } from '../../redux/actions/CustomerAction';
import MyAlert from 'matx/components/MyAlert';

// class CustomerList extends Component {
// 	render() {
// 		return (
// 			<div className="m-sm-30">
// 				<div className="mb-sm-30">
// 					<Breadcrumb
// 						routeSegments={[
// 							{ name: 'Customer', path: '/customer-list' },
// 							{ name: 'Customer List' },
// 						]}
// 					/>
// 				</div>
// 				<AppTable type="customer" />
// 			</div>
// 		);
// 	}
// }
const CustomerList = () => {
	const [state, setState] = useState([]);
	const data = useSelector((state) => state.user);
	console.log('user adata ne', data);
	const { customers } = useSelector((state) => state.customerReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(data.token);
		if (data?.token && (!customers || !customers.length))
			_handleGetAllUser(data?.token);
	}, []);

	const _handleGetAllUser = async (token = '') => {
		try {
			const data = await getAllCustomer(token);
			console.log('all user list', data);
			updateAllCustonerToRedux(dispatch, data);
		} catch (err) {
			MyAlert.show(
				'Lỗi',
				`${err.message}`,
				false,
				() => {},
				() => {}
			);
			console.log('Get All user list err', err);
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
			<AppTable type="customer" data={customers} />
		</div>
	);
};
export default CustomerList;
