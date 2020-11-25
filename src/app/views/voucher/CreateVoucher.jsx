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
	createNewVoucher,
	getAllVoucherSync,
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
import { send } from 'emailjs-com';

import { useHistory } from 'react-router-dom';

const CreateVoucher = ({ location }) => {
	const dispatch = useDispatch();
	const [mode, setMode] = useState(true);
	const { token, vouchers } = useSelector((state) => state.user);
	const history = useHistory();

	const [state, setState] = useState({
		voucher: '',
		start: moment().format('YYYY-MM-DD'),
		end: moment().format('YYYY-MM-DD'),
		name: '',
		discount_percent: 0,
	});
	const handleChange = (event) => {
		event.persist();
		setState({ ...state, [event.target.name]: event.target.value });
	};
	console.log('state ne', state);
	const _handleSubmit = () => {
		const sendData = { ...state };
		console.log('SendData ne', sendData);
		dispatch(createNewVoucher(JSON.stringify(sendData)));
		history.push('/voucher/voucher-list');
	};

	return (
		<div className="m-sm-30">
			<h4>Create Voucher</h4>
			<SimpleCard title="All Voucher" controlGroup={false}>
				<ValidatorForm onSubmit={() => _handleSubmit()}>
					<Button color="primary" variant="contained" type="submit">
						<Icon>add</Icon>
						<span className="pl-8 capitalize">Create</span>
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
								className="mb-16 w-100 text-uppercase"
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
								value={state?.start}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
							<TextValidator
								className="mb-16 w-100"
								label="End time"
								onChange={handleChange}
								type="date"
								name="end"
								value={state?.end}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</Grid>
					</Grid>
				</ValidatorForm>
			</SimpleCard>
		</div>
	);
};

export default CreateVoucher;
