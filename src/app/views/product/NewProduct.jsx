import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import AddProductForm from '../material-kit/forms/AddProductForm';

class NewProduct extends Component {
	render() {
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
				<AddProductForm />
			</div>
		);
	}
}

export default NewProduct;
