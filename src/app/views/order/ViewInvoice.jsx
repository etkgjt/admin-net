import React, { Component, useEffect, useRef, useState } from 'react';
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
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import easyinvoice from 'easyinvoice';
import logo from '../../../styles/newLogo6.png';

const ViewInvoice = ({ data, onEditPress = () => {} }) => {
	console.log('data ne viewInvoice', data);
	const history = useHistory();
	const {
		id = '',
		shipping_address,
		date,
		note,
		payment_method,
		status,
		customer,
		details,
	} = data;
	const _handleGoback = () => history.goBack();

	const downloadInvoice = async () => {	
		const data = getInvoiceData();
		const result = await easyinvoice.createInvoice(data);
		const invoiceBase64 = result.pdf;
		var winparams =
			'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,' +
			'resizable,screenX=50,screenY=50,width=850,height=1050';
		var htmlPop =
			'<embed width=100% height=100%' +
			' type="application/pdf"' +
			' src="data:application/pdf;base64,' +
			escape(invoiceBase64) +
			'"></embed>';

		var printWindow = window.open('', 'PDF', winparams);
		printWindow.document.write(htmlPop);
		printWindow.print();
	};
	const getInvoiceData = () => {
		return {
			documentTitle: 'HOÁ ĐƠN', //Defaults to INVOICE
			currency: 'VND',
			taxNotation: 'VAT', //or gst
			marginTop: 25,
			marginRight: 25,
			marginLeft: 25,
			marginBottom: 25,
			logo:
				'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/122777157_1082296078887629_6303201876958470713_n.png?_nc_cat=101&ccb=2&_nc_sid=ae9488&_nc_ohc=BD3pRGSxcuUAX-J9vZ1&_nc_ht=scontent.fsgn2-4.fna&oh=0e588fb2a7b17e612222274ba13ce7e3&oe=5FCCF02A', //or base64
			sender: {
				company: 'Tech World',
				address: 'Đại học sư phạm TP Hồ Chí Minh',
				zip: '1234',
				city: 'Hồ Chí Minh',
				country: 'Việt Nam',
			},
			client: {
				company: 'TechWorld Corp',
				address: '456 An Dương Vương',
				zip: '4567',
				city: 'Hồ Chí Minh',
				country: 'Việt Nam',
			},
			invoiceNumber: `#${id}`,
			invoiceDate: moment().format('YYYY-MM-DD'),
			products: [...getInvoiceProducts()],
			bottomNotice:
				'Cảm ơn quý khách đã tin tưởng sủ dụng dịch vụ của chúng tôi.',
		};
	};
	const getInvoiceProducts = () => {
		let tmp = [...details].map((v) => ({
			quantity: v?.quantity + '',
			description: v?.product?.name,
			tax: 2,
			price: v?.product?.price,
		}));
		return [...tmp];
	};
	return (
		<div>
			<h3>View Invoice</h3>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',

					width: '100%',
					marginBottom: 10,
				}}
			>
				<IconButton onClick={_handleGoback}>
					<Icon>arrow_back</Icon>
				</IconButton>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button
						color="primary"
						variant="contained"
						onClick={() => onEditPress()}
					>
						<span className="pl-8 capitalize">Edit Invoice</span>
					</Button>

					<Button
						onClick={() => {
							downloadInvoice();
						}}
						color="secondary"
						variant="contained"
						className="ml-12"
					>
						<span className="pl-8 capitalize text-center">
							Print Invoice
						</span>
					</Button>
				</div>
			</div>
			<Grid container spacing={6}>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<SimpleCard>
						<h5 className="mb-16">Customer Info</h5>
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
						<h5 className="mb-16">Invoice Info</h5>
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
						<DetailsTable type="view" data={details ? details : []} />
					</SimpleCard>
				</Grid>
			</Grid>
		</div>
	);
};
export default ViewInvoice;
