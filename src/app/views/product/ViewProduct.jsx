import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import SimpleForm from '../material-kit/forms/AppForm';
import UpdateProductForm from '../material-kit/forms/UpdateProductForm';

class ViewProducts extends Component {
	render() {
		return (
			<div className="m-sm-30">
				{/* <div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Customer', path: '/view-customer' },
							{ name: 'View Customer' },
						]}
					/>
				</div> */}
				<h6>ViewProducts</h6>
				<UpdateProductForm />
			</div>
		);
	}
}

export default ViewProducts;
