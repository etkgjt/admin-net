import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import AddProductForm from '../material-kit/forms/AddProductForm';
import { useSelector } from 'react-redux';

// class NewProduct extends Component {
// 	render() {
// 		return (
// 			<div className="m-sm-30">
// 				{/* <div className="mb-sm-30">
// 					<Breadcrumb
// 						routeSegments={[
// 							{ name: 'Customer', path: '/customer/new-customer' },
// 							{ name: 'New Customer' },
// 						]}
// 					/>
// 				</div> */}
// 				<AddProductForm />
// 			</div>
// 		);
// 	}
// }
const NewProduct = () => {
	const data = useSelector((state) => state.user);
	const { token } = data;
	console.log('user ne', data);
	return (
		<div className="m-sm-30">
			{/* <div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Customer', path: '/customer/new-customer' },
							{ name: 'New Customer' },
						]}
					/>
				</div> */}
			<AddProductForm token={token} />
		</div>
	);
};
export default NewProduct;
