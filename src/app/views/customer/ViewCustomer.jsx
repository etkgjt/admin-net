import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import SimpleForm from '../material-kit/forms/AppForm';
import { SimpleCard } from 'matx';
import AppSnackbar from '../material-kit/snackbar/AppSnackbar';
import AppExpansionPanel from '../material-kit/expansion-panel/AppExpansionPanel';
import UpdateCustomerForm from '../material-kit/forms/UpdateCustomerForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCustomer,
	updateAllCustonerToRedux,
} from 'app/redux/actions/CustomerAction';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import MyAlert from 'matx/components/MyAlert';

// class ViewCustomer extends Component {
// 	componentDidMount() {
// 		console.log('ViewCustomer Props', this.props);
// 	}
// 	render() {
// 		// const { location } = this.props;
// 		// const { data } = location.state;
// 		// console.log('user Info ne', data);
// 		return (
// 			<div className="m-sm-30">
// 				<h6>Edit</h6>

// 				<UpdateCustomerForm />
// 			</div>
// 		);
// 	}
// }

const ViewCustomer = ({ location }) => {
	const [state, setState] = useState({});
	const data = useSelector((state) => state.user);

	const { customers } = useSelector((state) => state.customerReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(data.token);
		if (!location || !location.state || !location.state.data) {
			if (!customers || !customers.length) _handleGetAllUser(data?.token);
		} else {
			setState(location?.state?.data);
		}
	}, []);
	useEffect(() => {
		console.log('location state', location?.state?.data);
		if (location || location.state || location.state.data) {
			setState(location?.state?.data);
		}
	}, [location]);
	useEffect(() => {
		if (!location || !location.state || !location.state.data) {
			// console.log('customer ne', customers);
			setState(customers?.[0]);
		}
	}, [customers]);

	const _handleGetAllUser = async (token = '') => {
		try {
			const data = await getAllCustomer(token);
			console.log('all user list', data);
			updateAllCustonerToRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get All user list err', err);
		}
	};
	console.log('state ne', state);

	return (
		<div className="m-sm-30">
			<h4>Edit</h4>
			{!state || !state?.username ? (
				<CircularProgress />
			) : (
				<UpdateCustomerForm
					userInfo={state}
					token={data?.token ? data?.token : ''}
				/>
			)}
		</div>
	);
};

export default ViewCustomer;
