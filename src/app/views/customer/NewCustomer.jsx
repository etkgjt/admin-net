import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import AddCustomerForm from '../material-kit/forms/AddCustomerForm';

class NewCustomer extends Component {
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
				<AddCustomerForm />
			</div>
		);
	}
}

export default NewCustomer;
