import React from 'react';

import { useHistory } from 'react-router-dom';

import {
	Table,
	TableHead,
	TableCell,
	TableBody,
	IconButton,
	Icon,
	TableRow,
} from '@material-ui/core';
import MyAlert from 'matx/components/MyAlert';
import {
	deleteProduct,
	updateProductsRedux,
} from 'app/redux/actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import MySpinner from 'matx/components/MySpinner';
import moment from 'moment';
import { getNumberWithDot } from '../../../../utils';
import {
	updateOrdersRedux,
	updateOrderStatus,
} from 'app/redux/actions/OrderAction';

const subscribarList = [
	{
		name: 'john doe',
		date: '18 january, 2019',
		amount: 1000,
		status: 'close',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'james cassegne',
		date: '8 january, 2019',
		amount: 5000,
		status: 'close',
		company: 'Collboy Tech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'john doe',
		date: '18 january, 2019',
		amount: 1000,
		status: 'close',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'james cassegne',
		date: '8 january, 2019',
		amount: 5000,
		status: 'close',
		company: 'Collboy Tech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
];
const tableHeading = {
	customer: ['Name', 'Email', 'Address', 'Phone Number', ''],
	product: ['Name', 'Description', 'Inventory', 'Price', ''],
	order: ['Order No.', 'Customer', 'Date', 'Status', 'Method', 'Total', ''],
};

const SimpleTable = ({ type, data }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user);
	const _handleEditCustomerInfo = (info) => {
		history.push('/customer/view-customer', { data: info });
	};
	const _handleEditProduct = (info) => {
		history.push('/product/view-product', { data: info });
	};
	const _handleDeleteProduct = (productId) => {
		MyAlert.show(
			'Warning',
			'Do you want to delete this product ? ',
			true,
			async () => {
				try {
					MySpinner.show();
					const res = await deleteProduct(token, productId);
					console.log('dleete product success', res);
					const newProductList = [...data].filter(
						(v) => v.id !== productId
					);
					updateProductsRedux(dispatch, newProductList);
					MySpinner.hide(() => {}, {
						label: 'Delete Success !',
						value: 0,
					});
				} catch (err) {
					MySpinner.hide(() => {}, {
						label: `Delete Failed ! ${err.message}`,
						value: 1,
					});
					console.log('Delete pRoduct err', err);
				}
			},
			() => console.log('No click ne')
		);
		console.log('product Id ne', productId);
	};
	const _handleOnChangeOrderStatusSuccess = (idx, status) => {
		console.log('new status ne', idx, status);
		const newOrderList = [...data];
		console.log('Old Item', newOrderList?.[idx]);
		const newItem = { ...newOrderList?.[idx], status };
		newOrderList.splice(idx, 1, newItem);
		console.log('new Order List', newOrderList);
		updateOrdersRedux(dispatch, newOrderList);
	};
	return (
		<div className="w-100 overflow-auto">
			<Table style={{ whiteSpace: 'pre' }}>
				<TableHead>
					<TableRow>
						{type === 'customer'
							? tableHeading?.customer?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))
							: type === 'product'
							? tableHeading?.product?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))
							: tableHeading?.order?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))}
					</TableRow>
				</TableHead>
				<TableBody>
					{type === 'customer'
						? data.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.first_name} ${item?.last_name}`}
									</TableCell>
									<TableCell className="px-0">
										{`${item?.username}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.address}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.phone_number}`}
									</TableCell>

									<TableCell className="px-0" align="right">
										<IconButton
											onClick={() => _handleEditCustomerInfo(item)}
										>
											<Icon>create</Icon>
										</IconButton>
										<IconButton>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))
						: type === 'product'
						? data.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{item?.name}
									</TableCell>
									<TableCell
										className="px-0 capitalize overflow-hidden pr-5"
										align="left"
									>
										{item?.description?.introduction
											? item?.description?.introduction
											: 'None'}
									</TableCell>
									<TableCell
										className="px-0 pl-20  capitalize"
										align="left"
									>
										<div
											style={{
												padding: 5,
												backgroundColor:
													item?.stock < 5
														? '#FF3D57'
														: item?.stock < 10
														? '#FFAF38'
														: item?.stock < 15
														? '#09B66E'
														: '#09B66E',
												color: 'white',
												borderRadius: 5,
												textAlign: 'center',
												display: 'inline-block',
												fontSize: 10,
											}}
										>
											{`${
												item?.stock > 0
													? 'Available ' + item?.stock + ' item'
													: 'Out of stock'
											}`}
										</div>
									</TableCell>
									<TableCell className="px-0 capitalize">
										{getNumberWithDot(item?.price)}
									</TableCell>
									<TableCell className="px-0" align="right">
										<IconButton
											onClick={() => _handleEditProduct(item)}
										>
											<Icon>create</Icon>
										</IconButton>
										<IconButton
											onClick={() => _handleDeleteProduct(item?.id)}
										>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))
						: data.map((item, indexs) => (
								<TableRow key={indexs}>
									<TableCell className="px-0 capitalize" align="left">
										{item?.id}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.customer?.first_name} ${item?.customer?.last_name}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${moment(item?.date).format('YYYY-MM-DD')}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										<div
											style={{
												padding: 5,
												backgroundColor:
													item?.status?.id === 1
														? '#FFAF38'
														: item?.status?.id === 2
														? '#FFAF38'
														: item?.status?.id === 3
														? '#09B66E'
														: '#FF3D57',
												color:
													item?.status?.id * 1 <= 2
														? 'black'
														: 'white',
												borderRadius: 5,
												textAlign: 'center',
												display: 'inline-block',
												fontSize: 10,
											}}
										>
											{item?.status?.value}
										</div>
									</TableCell>
									<TableCell className="px-0 capitalize">
										{item?.payment_method
											? item?.payment_method
											: 'None'}
									</TableCell>
									<TableCell className="px-0 capitalize">
										{getNumberWithDot(item?.total)}
									</TableCell>
									<TableCell className="px-0" align="right">
										<GroupButton
											orderId={item?.id}
											token={token}
											onChangeStatusSuccessFunc={(indexs, status) =>
												_handleOnChangeOrderStatusSuccess(
													indexs,
													status
												)
											}
											index={indexs}
										/>
									</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</div>
	);
};

const GroupButton = ({ token, orderId, onChangeStatusSuccessFunc, index }) => {
	const history = useHistory();

	const _handleViewOrderClick = () => {
		history.push('/order/view-order', { orderId: orderId ? orderId : 1 });
	};
	const _handleChangeOrderStatus = async (status) => {
		try {
			MySpinner.show();
			const res = await updateOrderStatus(
				token,
				JSON.stringify({ status_id: status }),
				orderId
			);
			const newStatus = {
				id: status,
				value: status === 3 ? 'Đã giao' : 'Đã huỷ',
			};
			onChangeStatusSuccessFunc(index, newStatus);
			MySpinner.hide(() => {}, { label: 'Change status success', value: 0 });
		} catch (err) {
			console.log('change status err', err);
			MySpinner.hide(() => {}, {
				label: 'Change status failed',
				value: 1,
			});
		}
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
			}}
		>
			<IconButton
				onClick={() =>
					MyAlert.show(
						'Warning',
						`Do you want to change this order's status ?`,
						true,
						() => _handleChangeOrderStatus(3),
						() => {}
					)
				}
			>
				<Icon style={{ color: '#09B66E' }}>check</Icon>
			</IconButton>
			<IconButton
				onClick={() =>
					MyAlert.show(
						'Warning',
						`Do you want to change this order's status ?`,
						true,
						() => _handleChangeOrderStatus(4),
						() => {}
					)
				}
			>
				<Icon color="error">close</Icon>
			</IconButton>
			<IconButton onClick={_handleViewOrderClick}>
				<Icon>arrow_right_alt</Icon>
			</IconButton>
		</div>
	);
};

export default SimpleTable;
