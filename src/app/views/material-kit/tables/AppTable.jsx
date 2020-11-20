import React, { useEffect, useState } from 'react';
import SimpleTable from './SimpleTable';
import PaginationTable from './PaginationTable';
import { Breadcrumb, SimpleCard } from 'matx';
import { useSelector } from 'react-redux';
import { CircularProgress, Icon, IconButton } from '@material-ui/core';
import { nonAccentVietnamese } from '../../../../utils';
import { CSVLink, CSVDownload } from 'react-csv';

// const headers = [
// 	{ label: 'First Name', key: 'firstname' },
// 	{ label: 'Last Name', key: 'lastname' },
// 	{ label: 'Email', key: 'email' },
// ];

// const data = [
// 	{ firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
// 	{ firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
// 	{ firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
// ];
const AppTable = ({ type, data }) => {
	const dataReverse = data?.reverse();
	const [state, setState] = useState(
		dataReverse && dataReverse.length ? dataReverse : []
	);

	useEffect(() => {
		console.log('set state');
		if (data && data.length) setState(data);
	}, [data]);
	const _handleToCSV = () => {};
	const _toCSVData = () => {
		switch (type) {
			case 'product': {
				let headers = [
					{ label: 'Name', key: 'name' },
					{ label: 'Brand', key: 'brand' },
					{ label: 'Date Arrive', key: 'dateArrive' },
					{ label: 'Price', key: 'price' },
					{ label: 'Buying Times', key: 'buyingTimes' },
					{ label: 'Screen Size', key: 'screenSize' },
					{ label: 'Rating', key: 'rating' },
					{ label: 'Battery', key: 'battery' },
					{ label: 'Color', key: 'color' },
					{ label: 'CPU', key: 'cpu' },
					{ label: 'Introduction', key: 'introduction' },
					{ label: 'Memory', key: 'memory' },
					{ label: 'OS', key: 'os' },
					{ label: 'RAM', key: 'ram' },
				];
				let productCSVData = [...data]?.map((v) => ({
					name: v?.name,
					brand: v?.brand?.name,
					buyingTimes: v?.buying_times,
					dateArrive: v?.date_arrive,
					battery: v?.description?.battery,
					color: v?.description?.color,
					cpu: v?.description?.cpu,
					introduction: v?.description?.introduction,
					memory: v?.description?.memory,
					os: v?.description?.battery,
					ram: v?.description?.ram,
					screenSize: v?.description?.screen_size,
					price: v?.price,
					rating: v?.rating,
					stock: v?.stock,
				}));
				return {
					headers,
					data: productCSVData,
				};
			}
			case 'customer': {
				let headers = [
					{ label: 'Customer ID', key: 'id' },
					{ label: 'First Name', key: 'firstName' },
					{ label: 'Last Name', key: 'lastName' },
					{ label: 'Phone Number', key: 'phoneNumber' },
					{ label: 'Email', key: 'email' },
					{ label: 'Address', key: 'address' },
					{ label: 'Gender', key: 'gender' },
				];
				let productCSVData = [...data]?.map((v) => ({
					id: v?.id,
					firstName: v?.first_name,
					lastName: v?.last_name,
					phoneNumber: v?.phone_number || 'none',
					gender: v?.gender === 1 ? 'Male' : 'Female',
					address: v?.address,
					email: v?.username,
				}));
				return {
					headers,
					data: productCSVData,
				};
			}
			case 'order': {
				let headers = [
					{ label: 'Order ID', key: 'id' },
					{ label: 'Customer', key: 'name' },
					{ label: 'Buying Date', key: 'date' },
					{ label: 'Total', key: 'total' },
					{ label: 'Product', key: 'product' },
					{ label: 'Payment Method', key: 'method' },
					{ label: 'Discount', key: 'discount' },
					{ label: 'Note', key: 'note' },
					{ label: 'Status', key: 'status' },
					{ label: 'Ship Address', key: 'address' },
				];
				let productCSVData = [...data]?.map((v) => ({
					id: v?.id,
					name: v?.customer?.first_name + '' + v?.customer?.last_name,
					date: v?.date,
					product:
						v?.details?.reduce(
							(x, y) => (x += `, ${y?.product?.name}`),
							''
						) || '',
					total: v?.total,
					discount: v?.discount,
					method: v?.payment_method?.name || 'none',
					note: v?.note,
					address: v?.shipping_address,
					status: v?.status?.value,
				}));
				return {
					headers,
					data: productCSVData,
				};
			}
			default: {
				break;
			}
		}
	};
	const _handleSearch = (keyword) => {
		switch (type) {
			case 'product': {
				let lowerKeyword = keyword.toLowerCase();
				let newState = [...data].filter((v) => {
					let arr = nonAccentVietnamese(v?.name).split(' ');
					let arr2 = keyword.split(' ');
					console.log('arr ne', arr, arr2);
					let flag = 0;
					for (let j = 0; j < arr2.length; j++) {
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].indexOf(arr2[j]) !== -1) {
								flag++;
								break;
							}
						}
					}
					if (flag === arr2.length) return true;
					return false;
				});
				setState(newState);
				break;
			}
			case 'order': {
				let lowerKeyword = keyword.toLowerCase();
				let newState = [...data].filter((v) => {
					let arr = nonAccentVietnamese(
						v?.customer?.first_name + v?.customer?.last_name
					).split(' ');
					let arr2 = keyword.split(' ');
					console.log('arr ne', arr, arr2);
					let flag = 0;
					for (let j = 0; j < arr2.length; j++) {
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].indexOf(arr2[j]) !== -1) {
								flag++;
								break;
							}
						}
					}
					if (flag === arr2.length) return true;
					return false;
				});
				setState(newState);
				break;
			}
			case 'customer': {
				let lowerKeyword = keyword.toLowerCase();
				let newState = [...data].filter((v) => {
					let arr = nonAccentVietnamese(
						v?.first_name + v?.last_name
					).split(' ');
					let arr2 = keyword.split(' ');
					console.log('arr ne', arr, arr2);
					let flag = 0;
					for (let j = 0; j < arr2.length; j++) {
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].indexOf(arr2[j]) !== -1) {
								flag++;
								break;
							}
						}
					}
					if (flag === arr2.length) return true;
					return false;
				});
				setState(newState);
				break;
			}
			default: {
				break;
			}
		}
	};
	console.log('dataaaaa simple table ne', data);
	return (
		<div className="m-sm-30">
			<div className="mb-sm-30">
				<Breadcrumb
					routeSegments={[
						{ name: 'Material', path: '/material' },
						{ name: 'Table' },
					]}
				/>
			</div>
			<SimpleCard
				title={
					type === 'contact'
						? 'All Message'
						: type === 'order'
						? 'All Orders'
						: type === 'product'
						? 'All Products'
						: 'All Customers'
				}
				controlGroup={type !== 'contact' ? true : false}
				onSearch={(v) => _handleSearch(v)}
				onCSVPress={_handleToCSV}
				csvData={_toCSVData()}
			>
				{state && state.length ? (
					<SimpleTable type={type} data={state ? state : []} />
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
			</SimpleCard>
		</div>
	);
};

export default AppTable;
