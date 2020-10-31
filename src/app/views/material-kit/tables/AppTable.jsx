import React, { useEffect, useState } from 'react';
import SimpleTable from './SimpleTable';
import PaginationTable from './PaginationTable';
import { Breadcrumb, SimpleCard } from 'matx';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const AppTable = ({ type, data }) => {
	const [state, setState] = useState(data && data.length ? data : []);

	useEffect(() => {
		console.log('set state');
		if (data && data.length) setState(data);
	}, [data]);
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
					type === 'order'
						? 'All Orders'
						: type === 'product'
						? 'All Products'
						: 'All Customers'
				}
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
			{/* <div className="py-12" />
      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard> */}
		</div>
	);
};

export default AppTable;
