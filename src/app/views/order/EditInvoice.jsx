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
} from '@material-ui/core';
import { getNumberWithDot, STATUS } from 'utils';
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

const EditInvoice = ({
	data,
	onCancelPress = () => {},
	onSubmitDone = () => {},
}) => {
	const {
		id,
		shipping_address,
		date,
		note,
		payment_method,
		status,
		customer,
		details,
		discount,
	} = data;
	const [state, setState] = useState({
		id: id || '',
		date: date ? date : moment().format('YYYY-MM-DD'),
		shipping_address: shipping_address || '',
		note: note || '',
		payment_method: payment_method || 1,
		details: details || [],
		status: status?.id || 1,
		phone_number: customer?.phone_number || '',
		username: customer?.username || '',
		first_name: customer?.first_name || '',
		last_name: customer?.last_name || '',
		user_id: customer?.id || '',
		gender: customer?.gender || 1,
		discount: discount || null,
	});

	const _handleSubmit = () => {
		console.log('new state ne', state);
		onSubmitDone(state);
	};
	const _handleChange = (e) => {
		e.persist();
		console.log('firstname', state?.first_name);
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
		<div className="p-0">
			<h4>Edit Invoice</h4>
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
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							// justifyContent: 'space-between',
							// width: '100%',
						}}
					>
						<Button
							style={{ width: 120, height: 50 }}
							onClick={() => onCancelPress()}
						>
							<span className="pl-8 capitalize">Cancel</span>
						</Button>
						<Button
							style={{ width: 120, height: 50 }}
							color="primary"
							variant="contained"
							type="submit"
							className="ml-12"
							// onClick={() => onSubmitDone(state)}
						>
							<span className="pl-8 capitalize text-center">Save</span>
						</Button>
					</div>
				</Grid>
				<Grid container spacing={6}>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<SimpleCard>
							<h5 className="mb-16">Customer Info</h5>

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
									'isEmail',
								]}
								onChange={_handleChange}
							/>
						</SimpleCard>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<SimpleCard>
							<h5 className="mb-16">Invoice Info</h5>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
								className="mb-16"
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
								className="mb-16"
							>
								<p style={{ fontWeight: 'bold' }}>Status:</p>
								<Select
									defaultValue={state?.status * 1}
									name="status"
									onChange={_handleChange}
								>
									{STATUS.map((v, i) => (
										<MenuItem value={i + 1}>{v}</MenuItem>
									))}
								</Select>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
								className="mb-16"
							>
								<p style={{ fontWeight: 'bold' }}>Order date:</p>
								<TextValidator
									id="date"
									label="Order Date"
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
								className="mb-16"
							>
								<p style={{ fontWeight: 'bold' }}>Payment method:</p>
								<Select
									name="payment_method"
									defaultValue={state?.payment_method * 1}
									onChange={_handleChange}
								>
									<MenuItem value={1}>Credit Card</MenuItem>
									<MenuItem value={2}>Paypal</MenuItem>
									<MenuItem value={3}>Delivery</MenuItem>
								</Select>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									margin: 0,
									padding: 0,
								}}
								className="mb-16"
							>
								<p style={{ fontWeight: 'bold' }}>Address:</p>
								<TextValidator
									className="mb-16 w-100"
									value={state?.shipping_address}
									name="shipping_address"
									label="Shipping Address"
									type="text"
									validators={['required', 'minStringLength: 4']}
									onChange={_handleChange}
								/>
							</div>
						</SimpleCard>
					</Grid>
				</Grid>
			</ValidatorForm>
			<Grid container spacing={6}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<SimpleCard>
						<DetailsTable
							discount={state?.discount ? state.discount : 0}
							type="edit"
							data={state?.details}
							onChangeData={(data) => {
								setState({ ...state, details: data });
							}}
						/>
					</SimpleCard>
				</Grid>
			</Grid>
		</div>
	);
};
export default EditInvoice;
