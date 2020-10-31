import React from 'react';
import {
	Table,
	TableHead,
	TableCell,
	TableBody,
	IconButton,
	Icon,
	TableRow,
} from '@material-ui/core';

const subscribarList = [
	{
		name: 'john doe',
		date: '18 january, 2019',
		amount: 1000,
		status: 'close',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'james cassegne',
		date: '8 january, 2019',
		amount: 5000,
		status: 'close',
		company: 'Collboy Tech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'john doe',
		date: '18 january, 2019',
		amount: 1000,
		status: 'close',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'kessy bryan',
		date: '10 january, 2019',
		amount: 9000,
		status: 'open',
		company: 'My Fintech LTD.',
	},
	{
		name: 'james cassegne',
		date: '8 january, 2019',
		amount: 5000,
		status: 'close',
		company: 'Collboy Tech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
	{
		name: 'lucy brown',
		date: '1 january, 2019',
		amount: 89000,
		status: 'open',
		company: 'ABC Fintech LTD.',
	},
];
const tableHeading = {
	customer: ['Name', 'Email', 'Address', 'Phone Number', ''],
	product: ['Name', 'Description', 'Inventory', 'Price', ''],
	order: ['Order No.', 'Customer', 'Date', 'Status', 'Method', 'Total', ''],
};

const SimpleTable = ({ type, data }) => {
	return (
		<div className="w-100 overflow-auto">
			<Table style={{ whiteSpace: 'pre' }}>
				<TableHead>
					<TableRow>
						{type === 'customer'
							? tableHeading?.customer?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))
							: type === 'product'
							? tableHeading?.product?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))
							: tableHeading?.order?.map((v, i) => (
									<TableCell className="px-0" key={`${i}-${v}`}>
										{v}
									</TableCell>
							  ))}
					</TableRow>
				</TableHead>
				<TableBody>
					{type === 'customer'
						? data.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.first_name} ${item?.last_name}`}
									</TableCell>
									<TableCell className="px-0 capitalize">
										{`${item?.username}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.address}`}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{`${item?.phone_number}`}
									</TableCell>

									<TableCell className="px-0" align="right">
										<IconButton>
											<Icon>create</Icon>
										</IconButton>
										<IconButton>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))
						: type === 'product'
						? data.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{item?.name}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{item?.description?.introduction
											? item?.description?.introduction
											: 'Hello'}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{item?.stock}
									</TableCell>
									<TableCell className="px-0 capitalize">
										{item?.price}
									</TableCell>
									<TableCell className="px-0" align="right">
										<IconButton>
											<Icon>create</Icon>
										</IconButton>
										<IconButton>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))
						: subscribarList.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										Order No.
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										Customer
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										Date
									</TableCell>
									<TableCell className="px-0 capitalize">
										Status
									</TableCell>
									<TableCell className="px-0 capitalize">
										Method
									</TableCell>
									<TableCell className="px-0 capitalize">
										Total
									</TableCell>
									<TableCell className="px-0" align="right">
										<IconButton>
											<Icon>create</Icon>
										</IconButton>
										<IconButton>
											<Icon color="error">close</Icon>
										</IconButton>
									</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</div>
	);
};

export default SimpleTable;
