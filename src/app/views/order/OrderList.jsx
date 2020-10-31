import React, { Component } from 'react';
import { Breadcrumb } from 'matx';
import AppTable from '../material-kit/tables/AppTable';

class OrderList extends Component {
	render() {
		return (
			<div className="m-sm-30">
				{/* <div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Customer', path: '/customer-list' },
							{ name: 'Customer List' },
						]}
					/>
				</div> */}
				<h4>OrderList</h4>
				<AppTable type="order" />
			</div>
		);
	}
}

export default OrderList;
