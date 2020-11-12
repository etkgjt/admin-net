import React, { Component, Fragment } from 'react';
import { format } from 'date-fns';
import {
	Grid,
	Card,
	Icon,
	IconButton,
	Checkbox,
	Fab,
	Avatar,
	Hidden,
	CircularProgress,
} from '@material-ui/core';
import moment from 'moment';

const TopCustomer = ({ customerList = [] }) => {
	console.log('customer list ne', customerList);
	return customerList && customerList.length ? (
		customerList?.map((v, id) => (
			<Fragment key={id}>
				<Card className="py-8 px-4 project-card">
					<Grid container alignItems="center">
						<Grid item md={5} xs={7}>
							<div className="flex flex-middle">
								<span
									style={{
										marginRight: 5,
										marginLeft: 5,
										fontSize: 16,
									}}
								>
									#{id}
								</span>
								<Hidden smDown>
									{id < 2 ? (
										<Fab
											className="ml-4 box-shadow-none"
											style={{ backgroundColor: '#FFAF38' }}
											size="small"
										>
											<Icon>star_outline</Icon>
										</Fab>
									) : (
										<Fab
											className="ml-4 box-shadow-none bg-white text-black"
											size="small"
										>
											<Icon>star_outline</Icon>
										</Fab>
									)}
								</Hidden>
								<span className="card__roject-name font-weight-500">
									{v?.name}
								</span>
							</div>
						</Grid>

						<Grid item md={3} xs={4}>
							<div className="text-muted">
								{moment(v?.last_buy).format('YYYY-MM-DD HH:mm:SS')}
							</div>
						</Grid>

						<Hidden smDown>
							<Grid item xs={3}>
								<div className="text-muted">{v?.buying_time} times</div>
							</Grid>
						</Hidden>

						<Grid item xs={1}>
							<div className="flex flex-end">
								<IconButton>
									<Icon>more_vert</Icon>
								</IconButton>
							</div>
						</Grid>
					</Grid>
				</Card>
				<div className="py-8" />
			</Fragment>
		))
	) : (
		<CircularProgress />
	);
};

export default TopCustomer;
