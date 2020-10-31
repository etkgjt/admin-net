import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import SimpleForm from '../material-kit/forms/AppForm';
import SimpleMenu from '../material-kit/menu/SimpleMenu';
import AppExpansionPanel from '../material-kit/expansion-panel/AppExpansionPanel';

class ViewOrder extends Component {
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
				<h6>ViewOrder</h6>
				{/* <SimpleForm />
				<SimpleMenu /> */}
				<AppExpansionPanel />
			</div>
		);
	}
}

export default ViewOrder;
