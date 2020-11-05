import React, { Component, useState, useEffect } from 'react';
import { Breadcrumb } from 'matx';
import AppTable from '../material-kit/tables/AppTable';
import {
	getAllProducts,
	updateProductsRedux,
} from '../../redux/actions/ProductAction';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = React.memo(() => {
	console.log('Produclist render');

	const dispatch = useDispatch();
	const productRedux = useSelector((state) => state.productReducer.products);
	const [data, setData] = useState(
		productRedux && productRedux.length ? productRedux : []
	);
	useEffect(() => {
		if (!productRedux || (productRedux && productRedux.length === 0))
			initialData();
	}, []);
	useEffect(() => {
		if (productRedux && productRedux.length) setData(productRedux);
	}, [productRedux]);
	const initialData = async () => {
		try {
			console.log('Fetch Data ne');
			const data = await getAllProducts();
			console.log('Data ne', data);
			setData(data);
			updateProductsRedux(dispatch, data);
		} catch (err) {
			console.log('Get Product list err', err);
		}
	};
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
			<h4>ProductList</h4>
			<AppTable type="product" data={data} />
		</div>
	);
});

// class ProductList extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			data: [],
// 		};
// 		this.initialData = this.initialData.bind(this);
// 	}
// 	initialData = async () => {
// 		try {
// 			const data = await getAllProducts();
// 			console.log('Data ne', data);
// 			this.setState({ data });
// 		} catch (err) {
// 			console.log('Get Product list err', err);
// 		}
// 	};
// 	componentDidMount() {
// 		this.initialData();
// 	}
// 	render() {
// 		return (
// 			<div className="m-sm-30">
// 				{/* <div className="mb-sm-30">
// 					<Breadcrumb
// 						routeSegments={[
// 							{ name: 'Customer', path: '/customer-list' },
// 							{ name: 'Customer List' },
// 						]}
// 					/>
// 				</div> */}
// 				<h4>ProductList</h4>
// 				<AppTable type="product" data={this.state.data} />
// 			</div>
// 		);
// 	}
// }

export default ProductList;
