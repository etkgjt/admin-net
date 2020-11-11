import React, { Component, Fragment, useEffect, useState } from 'react';
import { Grid, Card, Select, MenuItem } from '@material-ui/core';

import DoughnutChart from '../charts/echarts/Doughnut';

import ModifiedAreaChart from './shared/ModifiedAreaChart';
import StatCards from './shared/StatCards';
import TableCard from './shared/TableCard';
import RowCards from './shared/RowCards';
import StatCards2 from './shared/StatCards2';
import UpgradeCard from './shared/UpgradeCard';
import Campaigns from './shared/Campaigns';
import { withStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const Dashboard1 = (props) => {
	let { theme } = props;
	const { sale, product, customer, category } = useSelector(
		(state) => state?.statisticReducer
	);
	const [state, setState] = useState({
		sale: sale ? sale : [],
		product: product ? product : [],
		category: category ? category : [],
		customer: customer ? customer : [],
	});

	return (
		<Fragment>
			<LineChart />

			<div className="analytics m-sm-30 mt--72">
				<Grid container spacing={3}>
					<Grid item lg={8} md={8} sm={12} xs={12}>
						{/* <StatCards theme={theme} /> */}

						{/* Top Selling Products */}
						<TableCard />

						{/* <StatCards2 /> */}

						<h4 className="card-title text-muted mb-16">
							Ongoing Projects
						</h4>
						<RowCards />
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
								donutData={[...category]}
							/>
						</Card>

						{/* <UpgradeCard /> */}

						<Campaigns />
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};
const LineChart = () => {
	const [mode, setMode] = useState('Week'); // 0 = week, 1=month,2=year
	const { sale } = useSelector((state) => state?.statisticReducer);
	const parseStatisticsData = (data) => {
		let labels = Object.keys(data);
		let values = Object.values(data);
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
