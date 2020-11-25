import React, { Component } from 'react';

import { getNumberWithDot } from '../../../../utils';
import {
	Card,
	Icon,
	IconButton,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core';

const TopProduct = ({ productList }) => {
	// const productList = [
	// 	{
	// 		name: 'Iphone 7 plus',
	// 		buying_times: 20,
	// 		price: 100,
	// 		rating: 4.9,
	// 		image: '/assets/images/products/headphone-3.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 9 plus',
	// 		buying_times: 19,
	// 		price: 99,
	// 		rating: 4.2,
	// 		image: '/assets/images/products/headphone-2.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 8 plus',
	// 		buying_times: 18,
	// 		price: 98,
	// 		rating: 4.3,
	// 		image: '/assets/images/products/headphone-3.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 10 plus',
	// 		buying_times: 17,
	// 		price: 97,
	// 		rating: 4.4,
	// 		image: '/assets/images/products/iphone-2.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 11 plus',
	// 		buying_times: 16,
	// 		price: 96,
	// 		rating: 4.1,
	// 		image: '/assets/images/products/headphone-3.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 23 plus',
	// 		buying_times: 15,
	// 		price: 95,
	// 		rating: 4.5,
	// 		image: '/assets/images/products/iphone-1.jpg',
	// 	},
	// 	{
	// 		name: 'Iphone 1 plus',
	// 		buying_times: 14,
	// 		price: 94,
	// 		rating: 4.8,
	// 		image: '/assets/images/products/headphone-3.jpg',
	// 	},
	// ];

	return (
		<Card elevation={3} className="pt-20 mb-24">
			<div className="card-title px-24 mb-12">top selling products</div>
			<div className="overflow-auto">
				<Table className="product-table">
					<TableHead>
						<TableRow>
							<TableCell className="px-24" colSpan={4}>
								Name
							</TableCell>
							<TableCell className="px-0" colSpan={2} align="center">
								Buying Times
							</TableCell>
							<TableCell className="px-0" colSpan={2} align="center">
								Revenue
							</TableCell>
							<TableCell className="px-0" colSpan={1} align="center">
								Rating
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productList.map((product, index) => (
							<TableRow key={index}>
								<TableCell
									className="px-0 capitalize"
									colSpan={4}
									align="left"
								>
									<div className="flex flex-middle">
										<img
											style={{
												width: 'auto',
												height: 40,

												backgroundRepeat: 'no-repeat',
											}}
											src={product.image}
											alt="user"
										/>
										<p className="m-0 ml-8">{product.name}</p>
									</div>
								</TableCell>
								<TableCell
									className="px-0 capitalize"
									colSpan={2}
									align="center"
								>
									{product?.buying_time}
								</TableCell>
								<TableCell
									className="px-0 capitalize"
									align="center"
									colSpan={2}
								>
									{product.price * product.buying_times > 999
										? getNumberWithDot(
												(
													(product.price * product.buying_time) /
													1000
												).toFixed(1)
										  ) + 'k'
										: getNumberWithDot(
												product.price * product.buying_time
										  )}
								</TableCell>
								<TableCell
									className="px-0 capitalize"
									align="center"
									colSpan={1}
								>
									{Math.round(product?.rate * 100) / 100}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
};

export default TopProduct;
