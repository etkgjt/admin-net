import {
	Icon,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getNumberWithDot } from 'utils';

const tableHeader = [
	{
		label: '#',
		props: {
			size: 'small',
			align: 'left',
		},
	},
	{
		label: 'Item Name',
		props: {
			align: 'left',
		},
	},
	{
		label: 'Unit Price',
		props: {
			align: 'right',
		},
	},
	{
		label: 'Unit',
		props: {
			align: 'right',
		},
	},
	{
		label: 'Cost',
		props: {
			align: 'right',
		},
	},
];
const editTableHeader = [
	{
		label: '#',
		props: {
			size: 'small',
			align: 'left',
		},
	},
	{
		label: 'Item Name',
		props: {
			align: 'left',
		},
	},
	{
		label: 'Unit Price',
		props: {
			align: 'right',
		},
	},
	{
		label: 'Unit',
		props: {
			align: 'right',
		},
	},
	{
		label: 'Cost',
		props: {
			align: 'right',
		},
	},
	{
		label: 'Action',
		props: {
			align: 'right',
		},
	},
];

const DetailsTable = ({
	discount = 0,
	type = 'view',
	data = [],
	onChangeData = () => {},
}) => {
	const [state, setState] = useState(data ?? data);
	useEffect(() => {
		onChangeData(state);
		// console.log('state change');
	}, [state]);
	const _handleChange = (val, idx) => {
		if (val >= 1) {
			let newItem = [...state]?.[idx];
			newItem = { ...newItem, quantity: val };
			let tmpArr = [...state];
			tmpArr.splice(idx, 1, newItem);
			setState(tmpArr);
		}
	};
	const _handleDelete = (idx) => {
		let tmpArr = [...state].filter((v, i) => i !== idx);
		setState(tmpArr);
	};
	return type === 'view' ? (
		<Table>
			<TableHead>
				<TableRow>
					{tableHeader.map((v, i) => (
						<TableCell {...v?.props}>{v?.label}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{state?.map((v, i) => (
					<TableRow>
						<TableCell size="small">{i + 1}</TableCell>
						<TableCell align="left">{v?.product?.name}</TableCell>
						<TableCell align="right">
							{getNumberWithDot(v?.product?.price)}
						</TableCell>
						<TableCell align="right">{v?.quantity}</TableCell>
						<TableCell align="right">
							{getNumberWithDot(v?.product?.price * 1 * v?.quantity)} vnđ
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableHead>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>VAT (%)</TableCell>
					<TableCell>Discount</TableCell>
					<TableCell>Grant total</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>{`${getNumberWithDot(
						state?.reduce(
							(x, y) => (x += y?.product?.price * 1 * y?.quantity),
							0
						)
					)} vnđ`}</TableCell>
					<TableCell>2%</TableCell>
					<TableCell>- {discount}%</TableCell>
					<TableCell>{`${getNumberWithDot(
						state?.reduce(
							(x, y) => (x += y?.product?.price * 1 * y?.quantity),
							0
						) -
							(state?.reduce(
								(x, y) => (x += y?.product?.price * 1 * y?.quantity),
								0
							) *
								discount) /
								100 +
							state?.reduce(
								(x, y) => (x += y?.product?.price * 1 * y?.quantity),
								0
							) *
								0.02
					)} vnđ`}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	) : (
		<Table>
			<TableHead>
				<TableRow>
					{editTableHeader.map((v, i) => (
						<TableCell {...v?.props}>{v?.label}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{state?.map((v, i) => (
					<TableRow>
						<TableCell size="small">{i + 1}</TableCell>
						<TableCell align="left">{v?.product?.name}</TableCell>
						<TableCell align="right">
							{getNumberWithDot(v?.product?.price)}
						</TableCell>
						<TableCell align="right">
							<TextField
								style={{ width: 50 }}
								value={v?.quantity}
								type="number"
								onChange={(e) => _handleChange(e?.target?.value, i)}
							/>
						</TableCell>
						<TableCell align="right">
							{getNumberWithDot(v?.product?.price * 1 * v?.quantity)} vnđ
						</TableCell>
						<TableCell align="right">
							<IconButton onClick={() => _handleDelete(i)}>
								<Icon color="error">close</Icon>
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableHead>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>VAT (%)</TableCell>
					<TableCell>Discount</TableCell>
					<TableCell>Grant total</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>{`${getNumberWithDot(
						state?.reduce(
							(x, y) => (x += y?.product?.price * 1 * y?.quantity),
							0
						)
					)} vnđ`}</TableCell>
					<TableCell>2%</TableCell>
					<TableCell>{`${getNumberWithDot(
						state?.reduce(
							(x, y) => (x += y?.product?.price * 1 * y?.quantity),
							0
						) -
							(state?.reduce(
								(x, y) => (x += y?.product?.price * 1 * y?.quantity),
								0
							) *
								discount) /
								100 +
							state?.reduce(
								(x, y) => (x += y?.product?.price * 1 * y?.quantity),
								0
							) *
								0.02
					)} vnđ`}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default DetailsTable;
