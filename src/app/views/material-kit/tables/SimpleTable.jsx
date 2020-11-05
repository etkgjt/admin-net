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
						label: 'Delete Failed !',
						value: 1,
					});
					console.log('Delete pRoduct err', err);
				}
			},
			() => console.log('No click ne')
		);
		console.log('product Id ne', productId);
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
										{item?.stock}
									</TableCell>
									<TableCell className="px-0 capitalize">
										{item?.price}
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
						: subscribarList.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										Order No.
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										Customer
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										Date
									</TableCell>
									<TableCell className="px-0 capitalize">
										Status
									</TableCell>
									<TableCell className="px-0 capitalize">
										Method
									</TableCell>
									<TableCell className="px-0 capitalize">
										Total
									</TableCell>
									<TableCell className="px-0" align="right">
										<IconButton>
											<Icon>create</Icon>
										</IconButton>
										<IconButton>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</div>
	);
};

export default SimpleTable;
