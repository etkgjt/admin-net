import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import SimpleForm from '../material-kit/forms/AppForm';
import UpdateProductForm from '../material-kit/forms/UpdateProductForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllProducts,
	updateProductsRedux,
} from 'app/redux/actions/ProductAction';
import { CircularProgress } from '@material-ui/core';
import MyAlert from 'matx/components/MyAlert';

const ViewProducts = ({ location }) => {
	const [state, setState] = useState({});
	const data = useSelector((state) => state.user);

	const { products } = useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(data.token);
		if (!location || !location.state || !location.state.data) {
			if (!products || !products.length) _handleGetAllProduct();
		} else {
			console.log('Location ne', location);
			setState(location?.state?.data);
		}
	}, []);
	useEffect(() => {
		console.log('location state', location?.state?.data);
		if (location || location.state || location.state.data) {
			setState(location?.state?.data);
		}
	}, [location]);
	useEffect(() => {
		if (!location || !location.state || !location.state.data) {
			console.log('products ne', products);
			setState(products?.[0]);
		}
	}, [products]);

	const _handleGetAllProduct = async () => {
		try {
			const data = await getAllProducts();
			console.log('all products list', data);
			updateProductsRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get All product list err', err);
		}
	};
	console.log('state ne', state);
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
			<h4>Product</h4>
			{!state || !state.name ? (
				<CircularProgress />
			) : (
				<UpdateProductForm
					productInfo={state}
					token={data?.token ? data?.token : ''}
				/>
			)}
		</div>
	);
};

export default ViewProducts;
