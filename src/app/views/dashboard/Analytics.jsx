import React, { Component, Fragment, useEffect, useState } from 'react';
import { Grid, Card, Select, MenuItem } from '@material-ui/core';

import DoughnutChart from '../charts/echarts/Doughnut';

import ModifiedAreaChart from './shared/ModifiedAreaChart';
import StatCards from './shared/StatCards';
import TopProduct from './shared/TopProduct';
import TopCustomer from './shared/TopCustomer';
import StatCards2 from './shared/StatCards2';
import UpgradeCard from './shared/UpgradeCard';
import FeedBack from './shared/FeedBack';
import { withStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllStatistic,
	updateStatisticDataToRedux,
} from 'app/redux/actions/StatisticAction';

const mockData = {
	week: {
		'1-2020': 9012,
		'2-2020': 2330,
		'3-2020': 9023,
		'4-2020': 2222,
		'5-2020': 6662,
		'6-2020': 5230,
		'7-2020': 1000,
		'8-2020': 4400,
		'9-2020': 3301,
		'10-2020': 9000,
		'11-2020': 3400,
		'12-2020': 2389,
	},
	month: {
		'1-2020': 10,
		'2-2020': 100,
		'3-2020': 123,
		'4-2020': 12,
		'5-2020': 122,
		'6-2020': 500,
		'7-2020': 1000,
		'8-2020': 2,
		'9-2020': 21,
		'10-2020': 2000,
		'11-2020': 200,
		'12-2020': 489,
	},
	year: {
		2010: 101,
		2011: 1200,
		2012: 13,
		2013: 121,
		2014: 1222,
		2015: 50,
		2016: 1000,
		2017: 2,
		2018: 21,
		2019: 230,
		2020: 100200,
		2021: 4449,
	},
};
const Dashboard1 = (props) => {
	
	let { theme } = props;
	const { sale, product, customer, category } = useSelector(
		(state) => state?.statisticReducer
	);
	const { token } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			!sale ||
			!sale.length ||
			!product ||
			!product.length ||
			!customer ||
			!customer.length ||
			!category ||
			!category.length
		) {
			initialData();
		}
	}, []);

	const [state, setState] = useState({
		sale: sale ? sale : [],
		product: product ? product : [],
		category: category ? category : [],
		customer: customer ? customer : [],
	});
	useEffect(() => {
		// if (
		// 	sale &&
		// 	sale.length &&
		// 	product &&
		// 	product.length &&
		// 	customer &&
		// 	customer.length &&
		// 	category &&
		// 	category.length
		// )
		setState({ sale, product, customer, category });
	}, [sale, product, customer, category]);
	const initialData = async () => {
		try {
			const { sales, customers, circle, product } = await getAllStatistic(
				token
			);
			console.log('init data ne', sales, customers, circle, product);
			updateStatisticDataToRedux(
				dispatch,
				sales,
				product,
				customers,
				circle
			);
		} catch (err) {
			console.log('get statistics err', err);
		}
	};
	console.log('state analystics ne', state, state?.customer);

	return (
		<Fragment>
			<LineChart
				sale={state?.sale && state?.sale?.week ? state?.sale : mockData}
			/>

			<div className="analytics m-sm-30 mt--72">
				<Grid container spacing={3}>
					<Grid item lg={8} md={8} sm={12} xs={12}>
						{/* <StatCards theme={theme} /> */}

						{/* Top Selling Products */}
						<TopProduct productList={state?.product} />

						{/* <StatCards2 /> */}

						<h4 className="card-title text-muted mb-16">Top Customer</h4>
						<TopCustomer
							customerList={
								state?.customer && state?.customer.length
									? state?.customer
									: []
							}
						/>
					</Grid>

					<Grid item lg={4} md={4} sm={12} xs={12}>
						<Card className="px-24 py-16 mb-16">
							<div className="card-title">Sale by Category</div>
							<div className="card-subtitle">Last 30 days</div>
							<DoughnutChart
								height="350px"
								color={[
									theme.palette.primary.dark,
									theme.palette.primary.main,
									theme.palette.primary.light,
									theme.palette.primary.main,
								]}
								doughnutData={[...Object.values(category)]}
							/>
						</Card>

						{/* <UpgradeCard /> */}

						<FeedBack />
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};
const LineChart = ({ sale }) => {
	const [mode, setMode] = useState('Week'); // 0 = week, 1=month,2=year

	console.log('sale', sale);
	const parseStatisticsData = (data) => {
		let labels = Object.keys(data);
		let values = Object.values(data).map((v) => parseInt(v / 10000000));
		return {
			labels,
			values,
		};
	};
	const [state, setState] = useState(
		sale?.week ? parseStatisticsData(sale?.week) : {}
	);
	useEffect(() => {
		setState(
			mode === 'Week'
				? sale?.week
					? parseStatisticsData(sale?.week)
					: {}
				: mode === 'Month'
				? sale?.month
					? parseStatisticsData(sale?.month)
					: {}
				: sale?.year
				? parseStatisticsData(sale?.year)
				: {}
		);
	}, [mode]);
	return (
		<div className="pb-86 pt-30 px-30 bg-primary">
			<Select
				style={{
					width: 90,
					backgroundColor: '#6BA5F9',
					padding: 5,
					color: 'white',
				}}
				elevation={4}
				defaultValue={mode}
				onChange={(v) => setMode(v?.target?.value)}
			>
				<MenuItem
					value={'Week'}
					style={{ color: 'black', backgroundColor: '#fff' }}
				>
					Week
				</MenuItem>
				<MenuItem
					value={'Month'}
					style={{ color: 'black', backgroundColor: '#fff' }}
				>
					Month
				</MenuItem>
				<MenuItem
					value={'Year'}
					style={{ color: 'black', backgroundColor: '#fff' }}
				>
					Year
				</MenuItem>
			</Select>
			<ModifiedAreaChart
				height="280px"
				option={{
					series: [
						{
							data: [...state?.values],
							type: 'line',
						},
					],
					xAxis: {
						data: [...state?.labels],
					},
				}}
			></ModifiedAreaChart>
		</div>
	);
};

export default withStyles({}, { withTheme: true })(Dashboard1);
