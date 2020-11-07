import React, { Component, useState } from 'react';
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
} from '@material-ui/core';
import { getNumberWithDot } from 'utils';
import { useSelector } from 'react-redux';
import DetailsTable from 'matx/components/OrderDetailsTable';
import { KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
const mockData = {
	id: 3,
	discount: null,
	total: 311820000.0,
	shipping_address: 'An Duong Vuong - Q5',
	date: 'Sat Nov 07 2020 13:06:25 GMT+0700 (Indochina Time)',
	note: 'Giaoaoaooaoaoaoa',
	payment_method: null,
	status: {
		id: 3,
		value: 'Thành công',
	},
	customer: {
		id: 1,
		username: 'admin@gmail.com',
		first_name: 'Luan',
		last_name: 'Vo Minh',
		address: 'An Duong Vuong - Q5',
		phone_number: '0869089089',
		gender: 2,
		role: {
			name: 'ADMIN',
		},
	},
	orderDetails: [
		{
			product: {
				id: 33,
				name: ' Iphone 11 64GB màu vàng',
				price: 19990000.0,
				stock: 20,
			},
			quantity: 2,
		},
		{
			product: {
				id: 49,
				name: 'Iphone 8 Plus 128GB màu xám',
				price: 14990000.0,
				stock: 25,
			},
			quantity: 2,
		},
		{
			product: {
				id: 69,
				name: 'Samsung Galaxy Note 10+ màu đen',
				price: 16490000.0,
				stock: 25,
			},
			quantity: 2,
		},
		{
			product: {
				id: 32,
				name: ' Iphone 11 64GB màu xanh lá',
				price: 19990000.0,
				stock: 20,
			},
			quantity: 2,
		},
		{
			product: {
				id: 68,
				name: 'Samsung Galaxy Note 10+ màu bạc',
				price: 16490000.0,
				stock: 25,
			},
			quantity: 2,
		},
		{
			product: {
				id: 50,
				name: 'Iphone 8 Plus 128GB màu vàng',
				price: 14990000.0,
				stock: 25,
			},
			quantity: 4,
		},
		{
			product: {
				id: 31,
				name: ' Iphone 11 64GB màu đỏ',
				price: 19990000.0,
				stock: 201,
			},
			quantity: 2,
		},
		{
			product: {
				id: 47,
				name: 'Iphone Xs  64GB màu xám',
				price: 17990000.0,
				stock: 50,
			},
			quantity: 2,
		},
	],
};

const ViewOrder = () => {
	const [isEdit, setIsEdit] = useState(true);
	return (
		<div className="m-sm-30">
			<h6>ViewOrder</h6>
			{isEdit ? (
				<EditInvoice data={mockData} />
			) : (
				<ViewInvoice data={mockData} />
			)}
		</div>
	);
};
const EditInvoice = ({ data }) => {
	const {
		id,
		shipping_address,
		date,
		note,
		payment_method,
		status,
		customer,
		orderDetails,
	} = data;
	const [state, setState] = useState({
		date: date ? date : moment().format('YYYY-MM-DD'),
		shipping_address: customer?.shipping_address
			? customer.shipping_address
			: '',
		note: note || '',
		payment_method: payment_method || 1,
		orderDetails: orderDetails || [],
		status: status || { id: 1, value: 'AAA' },
		phone_number: customer?.phone_number || '',
		username: customer?.username || '',
		first_name: customer?.first_name || '',
		last_name: customer?.last_name || '',
	});

	const _handleSubmit = () => {};
	const _handleChange = (e) => {
		e.persist();
		console.log('firstname', state?.first_name);
		setState({ ...state, [e.target.name]: e.target.value });
	};
	console.log('data ne', orderDetails);
	return (
		<div>
			<h6>Edit Invoice</h6>

			<ValidatorForm onSubmit={_handleSubmit}>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
						justifyContent: 'space-around',
						paddingBottom: 10,
					}}
				>
					<Button color="primary" variant="contained" type="submit">
						<Icon>save</Icon>
						<span className="pl-8 capitalize">Save</span>
					</Button>
				</Grid>
				<Grid container spacing={6}>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<SimpleCard>
							<h6>Customer Info</h6>

							<TextValidator
								className="mb-16 w-100"
								value={state?.first_name}
								name="first_name"
								label="First Name"
								type="text"
								validators={[
									'required',
									'minStringLength: 4',
									'maxStringLength: 20',
								]}
								onChange={_handleChange}
							/>

							<TextValidator
								className="mb-16 w-100"
								value={state?.last_name}
								name="last_name"
								label="Last Name"
								type="text"
								validators={[
									'required',
									'minStringLength: 4',
									'maxStringLength: 20',
								]}
								onChange={_handleChange}
							/>
							<TextValidator
								className="mb-16 w-100"
								value={state?.phone_number}
								name="phone_number"
								label="Phone Number"
								type="text"
								validators={[
									'required',
									'minStringLength: 4',
									'maxStringLength: 20',
								]}
								onChange={_handleChange}
							/>
							<TextValidator
								className="mb-16 w-100"
								value={state?.username}
								name="username"
								label="Email"
								type="text"
								validators={[
									'required',
									'minStringLength: 4',
									'maxStringLength: 20',
									'isEmail',
								]}
								onChange={_handleChange}
							/>
						</SimpleCard>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<SimpleCard>
							<h6>Invoice Info</h6>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
							>
								<p style={{ fontWeight: 'bold' }}>Invoice No.</p>
								<p>#{id}</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
							>
								<p style={{ fontWeight: 'bold' }}>Status:</p>
								<p>{status?.value}</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
							>
								<p style={{ fontWeight: 'bold' }}>Date:</p>
								<TextValidator
									id="date"
									label="Birthday"
									type="date"
									name="date"
									defaultValue={moment(state?.date).format(
										'YYYY-MM-DD'
									)}
									InputLabelProps={{
										shrink: true,
									}}
									onChange={_handleChange}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
							>
								<p style={{ fontWeight: 'bold' }}>Payment method:</p>
								<p>{payment_method ? payment_method : 'None'}</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
							>
								<p style={{ fontWeight: 'bold' }}>Address:</p>
								<p>{shipping_address}</p>
							</div>
						</SimpleCard>
					</Grid>
				</Grid>
			</ValidatorForm>
			<Grid container spacing={6}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<SimpleCard>
						<DetailsTable type="edit" data={orderDetails} />
					</SimpleCard>
				</Grid>
			</Grid>
		</div>
	);
};
const ViewInvoice = ({ data }) => {
	const {
		id,
		shipping_address,
		date,
		note,
		payment_method,
		status,
		customer,
		orderDetails,
	} = data;
	console.log('data ne', orderDetails);
	return (
		<div>
			<h6>View Invoice</h6>

			<Grid container spacing={6}>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<SimpleCard>
						<h6>Customer Info</h6>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Name</p>
							<p>{`${customer?.first_name} ${customer?.last_name}`}</p>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Phone number:</p>
							<p>{`${customer?.phone_number}`}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Email:</p>
							<p>{customer?.username}</p>
						</div>
					</SimpleCard>
				</Grid>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<SimpleCard>
						<h6>Invoice Info</h6>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Invoice No.</p>
							<p>#{id}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Status:</p>
							<p>{status?.value}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Date:</p>
							<p>{date}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Payment method:</p>
							<p>{payment_method ? payment_method : 'None'}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: 0,
								padding: 0,
							}}
						>
							<p style={{ fontWeight: 'bold' }}>Address:</p>
							<p>{shipping_address}</p>
						</div>
					</SimpleCard>
				</Grid>
			</Grid>
			<Grid container spacing={6}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<SimpleCard>
						<DetailsTable type="view" data={orderDetails} />
					</SimpleCard>
				</Grid>
			</Grid>
		</div>
	);
};

export default ViewOrder;
