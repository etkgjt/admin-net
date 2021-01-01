import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'matx';
import SimpleForm from '../material-kit/forms/AppForm';
import SimpleMenu from '../material-kit/menu/SimpleMenu';
import AppExpansionPanel from '../material-kit/expansion-panel/AppExpansionPanel';
import {
	Table,
	TableHead,
	TableCell,
	TableBody,
	IconButton,
	Icon,
	TableRow,
	Grid,
	TextField,
	Button,
	Select,
	MenuList,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { getNumberWithDot } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import DetailsTable from 'matx/components/OrderDetailsTable';
import { KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
	getOrderList,
	updateOrder,
	updateOrdersRedux,
} from '../../redux/actions/OrderAction';
import MySpinner from 'matx/components/MySpinner';
import { useHistory } from 'react-router-dom';
import MyAlert from 'matx/components/MyAlert';
import EditInvoice from './EditInvoice';
import ViewInvoice from './ViewInvoice';

const ViewOrder = ({ location }) => {
	const dispatch = useDispatch();

	const [isEdit, setIsEdit] = useState(false);
	const { token } = useSelector((state) => state.user);
	const [stateId, setStateId] = useState(
		location?.state?.orderId ? location?.state?.orderId : 1
	);
	const orderListRedux = useSelector((state) => state?.orderReducer?.orders);

	useEffect(() => {
		if (orderListRedux || !orderListRedux.length) {
			initialData();
		}
	}, []);

	useEffect(() => {
		if (stateId && orderListRedux && orderListRedux.length)
			setState([...orderListRedux].find((v) => v?.id === stateId));
	}, [stateId, orderListRedux]);

	const [state, setState] = useState(
		[...orderListRedux].find((v) => v?.id === stateId)
	);

	const _changeMode = () => setIsEdit(!isEdit);

	const initialData = async () => {
		try {
			console.log('Fetch Data ne');
			const data = await getOrderList(token);

			updateOrdersRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get Product list err', err);
		}
	};
	// 	{
	// 	  //"documentTitle": "RECEIPT", //Defaults to INVOICE
	//     "currency": "USD",
	//     "taxNotation": "vat", //or gst
	//     "marginTop": 25,
	//     "marginRight": 25,
	//     "marginLeft": 25,
	//     "marginBottom": 25,
	//     "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
	//     //"logoExtension": "png", //only when logo is base64
	//     "sender": {
	//       "company": "ABC",
	//       "address": "DEF",
	//       "zip": "1234 AB",
	//       "city": "Sampletown",
	//       "country": "Samplecountry"
	//       //"custom1": "custom value 1",
	//       //"custom2": "custom value 2",
	//       //"custom3": "custom value 3"
	//     },
	//     "client": {
	//       "company": "Client Corp",
	//       "address": "Clientstreet 456",
	//       "zip": "4567 CD",
	//       "city": "Clientcity",
	//       "country": "Clientcountry"
	//       //"custom1": "custom value 1",
	//       //"custom2": "custom value 2",
	//       //"custom3": "custom value 3"
	//     },
	//     "invoiceNumber": "2020.0001",
	//     "invoiceDate": "05-01-2020",
	//     "products": [{
	//         "quantity": "2",
	//         "description": "Test1",
	//         "tax": 6,
	//         "price": 33.87
	//       },
	//       {
	//         "quantity": "4",
	//         "description": "Test2",
	//         "tax": 21,
	//         "price": 10.45
	//       }
	//     ],
	//     "bottomNotice": "Kindly pay your invoice within 15 days."
	//   };

	const convertOrderData = (data) => {
		const {
			date,
			first_name,
			last_name,
			note,
			details,
			payment_method,
			phone_number,
			shipping_address,
			status,
			username,
			user_id,
			discount,
		} = data;
		const newArr = [...details].map((v) => ({
			productId: v?.product?.id,
			quantity: v?.quantity,
		}));
		const total = [...details].reduce(
			(x, y) => (x += y?.quantity * y?.product?.price),
			0
		);
		// CustomerId: id,
		// 	ShippingAddress: address,
		// 	Note: note,
		// 	StatusId: 1,
		// 	Total: total,
		// 	OrderDetails: cartDetails,
		// 	PaymentMethod: payment.method,
		// 	Discount:
		// 		voucher && voucher.discountPercent ? voucher.discountPercent : 0,
		return {
			CustomerId: user_id,
			ShippingAddress: shipping_address,
			PaymentMethod: payment_method,
			Note: note,
			StatusId: status,
			Total: total,
			OrderDetails: newArr,
			Discount: discount ? discount : 0,
		};
	};
	const _handleSubmit = async (data) => {
		try {
			MySpinner.show();
			console.log('data', data);

			const newData = convertOrderData(data);

			console.log('new data', newData);
			const jsonData = JSON.stringify(newData);

			console.log('Jsondata', jsonData);
			const res = await updateOrder(token, state?.id, jsonData);
			console.log('res ne', res);

			const newState = {
				id: state?.id,
				discount: data?.discount ? data?.discount : 0,
				total: [...data?.details].reduce(
					(x, y) => (x += y?.quantity * y?.product?.price),
					0
				),
				shipping_address: data?.shipping_address,
				date: data?.date,
				note: data?.note,
				payment_method: data?.payment_method,
				status: {
					id: data?.status,
					value:
						data?.status === 1
							? 'Đang xử lý'
							: data?.status === 2
							? 'Đang giao'
							: data?.status === 3
							? 'Đã nhận hàng'
							: 'Đã bị huỷ',
				},
				customer: {
					id: data?.user_id,
					username: data?.username,
					first_name: data?.first_name,
					last_name: data?.last_name,
					address: data?.shipping_address,
					phone_number: data?.phone_number,
				},
				details: [...data?.details],
			};

			const newList = [...orderListRedux];
			const changedItemIndex = newList.findIndex((v) => v?.id === stateId);
			newList.splice(changedItemIndex, 1, newState);
			updateOrdersRedux(dispatch, newList);
			setState(newState);

			MySpinner.hide(() => {}, {
				label: 'Update Success',
				value: 0,
			});
			_changeMode();
		} catch (err) {
			MySpinner.hide(() => {}, {
				label: 'Update Order Info Failed',
				value: 1,
			});
			console.log('Update orderinfo err', err);
		}
	};
	console.log('state data ne', state, stateId);

	return (
		<div className="m-sm-30">
			{orderListRedux && orderListRedux.length ? (
				isEdit ? (
					<EditInvoice
						data={state}
						onCancelPress={_changeMode}
						onSubmitDone={(v) => _handleSubmit(v)}
					/>
				) : (
					<ViewInvoice
						data={state && state?.details ? state : {}}
						onEditPress={_changeMode}
					/>
				)
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default ViewOrder;
{
	/* <ViewInvoice data = {state} onCancelPress={_changeMode} /> */
}
