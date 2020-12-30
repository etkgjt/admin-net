import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'matx';
import AppTable from '../material-kit/tables/AppTable';
import { useDispatch, useSelector } from 'react-redux';

import { MySpinner } from 'matx/components/MySpinner';
import {
	getAllContactMessage,
	updateContactMessageToRedux,
} from '../../redux/actions/ContactAction';
import MyAlert from 'matx/components/MyAlert';
import socket from '../socket/index';
import {
	deleteVoucher,
	getAllVoucherSync,
	updateVoucherInfo,
} from 'app/redux/actions/UserActions';
import {
	Card,
	CircularProgress,
	TableCell,
	TableHead,
	Table,
	TableBody,
	TableRow,
	Icon,
	IconButton,
	Grid,
	Button,
} from '@material-ui/core';

import moment from 'moment';
import { getNumberWithDot } from 'utils';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const VoucherList = ({ location }) => {
	const dispatch = useDispatch();
	const [mode, setMode] = useState(true);
	const { token, vouchers } = useSelector((state) => state.user);
	const listVoucherRedux = useSelector((state) => state.user?.vouchers);
	// const listVoucherRedux = listMessageRedux?.reverse();
	const [data, setData] = useState(
		listVoucherRedux && listVoucherRedux.length ? listVoucherRedux : []
	);

	useEffect(() => {
		if (
			!listVoucherRedux ||
			(listVoucherRedux && listVoucherRedux.length === 0)
		)
			initialData();
	}, []);
	useEffect(() => {
		setData(listVoucherRedux);
	}, [listVoucherRedux]);
	const initialData = () => {
		console.log('init vooucher data ne');
		dispatch(getAllVoucherSync(token));
	};
	// console.log('data ne', data, vouchers);
	const [updateItem, setUpdateItem] = useState(data?.[0] ? data?.[0] : null);
	const [state, setState] = useState(data?.[0] ? data?.[0] : null);
	const handleChange = (event) => {
		event.persist();
		setState({ ...state, [event.target.name]: event.target.value });
	};
	console.log('state ne', state);
	const _handleDeleteClick = (id) => dispatch(deleteVoucher(id, token));
	const _handleSubmit = () => {
		const sendData = {
			DiscountPercent: state.discount_percent,
			StartDate: state.start,
			EndDate: state.end,
			Name: state.name,
			Code: state?.voucher.toUpperCase(),
			Id: state.id,
		};
		dispatch(updateVoucherInfo(state.id, JSON.stringify(sendData), token));
		setMode(!mode);
	};
	return (
		<div className="m-sm-30">
			<h4>Voucher List</h4>
			<SimpleCard
				title={mode ? 'All Voucher' : 'Edit Voucher'}
				controlGroup={false}
			>
				{mode ? (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Voucher No.</TableCell>
								<TableCell>Code</TableCell>
								<TableCell>Discount</TableCell>
								<TableCell>End Time</TableCell>
								<TableCell>Nội dung</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data && data?.length ? (
								data?.map((v, i) => (
									<TableRow key={v?.id}>
										<TableCell>#{i}</TableCell>
										<TableCell>{v?.voucher}</TableCell>
										<TableCell>{v?.discount_percent}%</TableCell>
										<TableCell>
											{v?.end
												? moment(v?.end).format(
														'YYYY-MM-DD HH:mm:SS'
												  )
												: moment().format('YYYY-MM-DD HH:mm:SS')}
										</TableCell>
										<TableCell>{v?.name}</TableCell>
										<TableCell className="px-0" align="right">
											<IconButton
												onClick={() => {
													setState(v);
													setMode(!mode);
												}}
											>
												<Icon>create</Icon>
											</IconButton>
											<IconButton
												onClick={() =>
													MyAlert.show(
														'Warning',
														`Do you want to delete this voucher ?`,
														true,
														() => _handleDeleteClick(v?.id),
														() => {}
													)
												}
											>
												<Icon color="error">close</Icon>
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<div
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										display: 'flex',
									}}
								>
									<CircularProgress size={30} />
								</div>
							)}
						</TableBody>
					</Table>
				) : (
					<ValidatorForm onSubmit={() => _handleSubmit()}>
						<Button
							color="primary"
							variant="contained"
							type="submit"
							style={{ marginRight: 10 }}
						>
							<span className="pl-8 capitalize">Save</span>
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={() => setMode(!mode)}
						>
							<span className="pl-8 capitalize">Cancel</span>
						</Button>
						<Grid container spacing={6} className="mt-16">
							<Grid item lg={6} md={6} sm={12} xs={12}>
								<TextValidator
									className="mb-16 w-100"
									label="Name"
									onChange={handleChange}
									type="text"
									name="name"
									value={state?.name}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Code"
									onChange={handleChange}
									type="text"
									name="voucher"
									value={state?.voucher}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Discount"
									onChange={handleChange}
									type="number"
									name="discount_percent"
									value={state?.discount_percent}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
							<Grid item lg={6} md={6} sm={12} xs={12}>
								<TextValidator
									className="mb-16 w-100"
									label="Start time"
									onChange={handleChange}
									type="date"
									name="start"
									value={moment(state?.start).format('YYYY-MM-DD')}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="End time"
									onChange={handleChange}
									type="date"
									name="end"
									value={moment(state?.end).format('YYYY-MM-DD')}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</Grid>
						</Grid>
					</ValidatorForm>
				)}
			</SimpleCard>
		</div>
	);
};

export default VoucherList;
