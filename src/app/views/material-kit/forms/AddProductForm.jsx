import React, { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ImageUploader from 'react-images-upload';
import {
	Button,
	Icon,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	Checkbox,
	TableCell,
	Table,
	TableBody,
	TableRow,
	TableHead,
	Select,
	MenuItem,
	InputLabel,
	Input,
	CircularProgress,
} from '@material-ui/core';

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard } from 'matx';
import SimpleMenu from '../menu/SimpleMenu';
import { IconButton } from '@material-ui/core';
import Color from '../../utilities/Color';
import {
	addNewProduct,
	getAllProducts,
	updateProductsRedux,
} from 'app/redux/actions/ProductAction';
import MySpinner from 'matx/components/MySpinner';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from 'matx/components/MyAlert';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CATEGORY = {
	smartphone: 1,
	laptop: 2,
	tablet: 3,
	accessories: 4,
};
const BRAND_OBJECT = {
	Apple: 1,
	Acer: 2,
	Asus: 3,
	Dell: 4,
	HP: 5,
	Lenovo: 6,
	Samsung: 7,
	LG: 8,
	Huawei: 9,
	Oppo: 10,
	Xiaomi: 11,
	Vivo: 12,
	Nokia: 13,
	Sony: 14,
	Vsmart: 15,
	MSI: 16,
};
const BRAND_LIST = [
	'Apple',
	'Acer',
	'Asus',
	'Dell',
	'HP',
	'Lenovo',
	'Samsung',
	'LG',
	'Huawei',
	'Oppo',
	'Xiaomi',
	'Vivo',
	'Nokia',
	'Sony',
	'Vsmart',
	'MSI',
];

const AddProductForm = ({ token }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [state, setState] = useState({
		name: '',
		introduction: '',
		brand: 1,
		date: new Date(),
		category: 'smartphone',
		price: null,
		quantity: null,
		image: [],
		tempImg: '',
		cpu: '',
		ram: '',
		os: '',
		screen_size: '',
		battery: '',
		memory: '',
		color: '',
	});

	const [isLoadImage, setIsLoadImage] = useState(false);
	const { products } = useSelector((state) => state.productReducer);
	console.log('Product list ne', products);
	useEffect(() => {
		if (!products || !products.length) {
			_handleGetAllProduct();
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
	useEffect(() => {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== state.password) {
				return false;
			}
			return true;
		});
		return ValidatorForm.removeValidationRule('isPasswordMatch');
	}, []);

	const handleSubmit = async () => {
		console.log('submitted');
		console.log('data ne', state);
		const newData = convertData();
		const sendData = JSON.stringify(newData);
		console.log(sendData);
		try {
			MySpinner.show();
			const res = await addNewProduct(sendData, token);
			console.log('response', res);
			// updateProductsRedux(dispatch, [...products, newData]);
			await _handleGetAllProduct();
			history.replace('/product/product-list');
			MySpinner.hide(() => {}, {
				label: 'Add product successful !',
				value: 0,
			});
		} catch (err) {
			MySpinner.hide(() => {}, {
				label: `Add product failed !\n ${err?.message}`,
				value: 1,
			});
			console.log('send data err', err, err?.response);
		}
	};

	const handleChange = (event) => {
		event.persist();
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const addImage = () => {
		setState({
			...state,
			image: [...state.image, state.tempImg],
			tempImg: '',
		});
	};
	const _deleteImg = (img) => {
		let newList = state.image.filter((v) => v !== img);
		setState({ ...state, image: [...newList] });
	};
	const convertData = () => {
		let {
			name,
			introduction,
			brand,
			category,
			date,
			price,
			image,
			quantity,
			tempImg,
			cpu,
			ram,
			screen_size,
			color,
			battery,
			os,
			memory,
		} = state;
		return {
			Name: name,
			Price: price * 1,
			BrandId: brand * 1 + 1,
			CategoryId: CATEGORY[category] * 1,
			Stock: quantity * 1,
			images: image,
			description: {
				Cpu: cpu,
				Ram: ram,
				Color: color,
				ScreenSize: screen_size,
				Battery: battery,
				Os: os,
				Memory: memory,
				Introduction: introduction,
			},
		};
	};
	const onDrop = async (picture) => {
		setIsLoadImage(true);
		let formData = new FormData();
		console.log('picture list', picture);
		if (picture && picture.length) {
			for (let i = 0; i < picture.length; i++) {
				formData.append('files', picture[i]);
				console.log('form data list ne', formData);
			}
			console.log('form data list ne', formData);
		} else {
			formData.append('files', picture);
		}
		console.log('image ne', picture);
		// setState({
		// 	...state,
		// 	image: [...state.image, picture],
		// 	// tempImg: '',
		// });
		const { data } = await axios.post(
			'https://minhlnd.azurewebsites.net/images',
			formData
		);
		console.log('Image list ne', data);
		setState({ ...state, image: [...data] });
		setIsLoadImage(false);
	};

	let {
		name,
		introduction,
		brand,
		category,
		date,
		price,
		image,
		quantity,
		tempImg,
		cpu,
		ram,
		screen_size,
		color,
		battery,
		os,
		memory,
	} = state;

	return (
		<div>
			<SimpleCard>
				<h3>NewProduct</h3>

				<ValidatorForm
					// ref="form"
					onSubmit={handleSubmit}
					onError={(errors) => null}
				>
					<Grid container spacing={6}>
						<Grid item lg={6} md={6} sm={12} xs={12}>
							<TextValidator
								className="mb-16 w-100"
								label="ProductName"
								onChange={handleChange}
								type="text"
								name="name"
								value={name}
								validators={[
									'required',
									'minStringLength: 4',
									'maxStringLength: 1000',
								]}
								errorMessages={['this field is required']}
								variant="outlined"
							/>
							<InputLabel>Category</InputLabel>
							<RadioGroup
								className="mb-16"
								value={category}
								name="category"
								onChange={handleChange}
								row
								validators={['required']}
							>
								<FormControlLabel
									value="smartphone"
									control={<Radio color="secondary" />}
									label="Smart Phone"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="laptop"
									control={<Radio color="secondary" />}
									label="Laptop"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="tablet"
									control={<Radio color="secondary" />}
									label="Tablet"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="accessories"
									control={<Radio color="secondary" />}
									label="Accessories"
									labelPlacement="end"
								/>
							</RadioGroup>
							<InputLabel>Brand</InputLabel>
							<Select
								validators={['required']}
								style={{ width: '100px', height: '50px' }}
								className="mb-16 w-50"
								defaultValue={[brand]}
								onChange={(v) => {
									setState({ ...state, brand: v?.target?.value });
								}}
							>
								{BRAND_LIST.map((v, i) => (
									<MenuItem key={`${v}-${i}`} value={i}>
										{v}
									</MenuItem>
								))}
							</Select>
							{/* <TextValidator
									className="mb-16 w-100"
									label="Brand"
									onChange={handleChange}
									type="text"
									name="brand"
									value={brand}
									validators={['required']}
									errorMessages={[
										'this field is required',
										'email is not valid',
									]}
									variant="outlined"
								/> */}
							{category !== 'accessories' ? (
								<div>
									<TextValidator
										className="mb-16 w-100"
										label="CPU"
										onChange={handleChange}
										type="text"
										name="cpu"
										value={cpu}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Ram"
										onChange={handleChange}
										type="number"
										name="ram"
										value={ram}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="OS"
										onChange={handleChange}
										type="text"
										name="os"
										value={os}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Screen Size"
										onChange={handleChange}
										type="number"
										name="screen_size"
										value={screen_size}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Battery (mAh)"
										onChange={handleChange}
										type="number"
										name="battery"
										value={battery}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Memory (GB)"
										onChange={handleChange}
										type="number"
										name="memory"
										value={memory}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Color"
										onChange={handleChange}
										type="text"
										name="color"
										value={color}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
									<TextValidator
										className="mb-16 w-100"
										label="Introduction"
										onChange={handleChange}
										type="text"
										name="introduction"
										value={introduction}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
								</div>
							) : (
								<div>
									<TextValidator
										className="mb-16 w-100"
										label="Introduction"
										onChange={handleChange}
										type="text"
										name="introduction"
										value={introduction}
										validators={['required']}
										errorMessages={['this field is required']}
										variant="outlined"
									/>
								</div>
							)}
						</Grid>

						<Grid item lg={6} md={6} sm={12} xs={12}>
							<TextValidator
								className="mb-16 w-100"
								label="Price"
								onChange={handleChange}
								type="number"
								name="price"
								value={price}
								validators={[
									'required',
									// 'minStringLength:16',
									// 'maxStringLength: 16',
								]}
								errorMessages={['this field is required']}
								variant="outlined"
							/>
							<TextValidator
								className="mb-16 w-100"
								label="Quantity"
								onChange={handleChange}
								type="number"
								name="quantity"
								value={quantity}
								validators={[
									'required',
									// 'minStringLength:16',
									// 'maxStringLength: 16',
								]}
								errorMessages={['this field is required']}
								variant="outlined"
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<InputLabel>Image</InputLabel>

								<ImageUploader
									withIcon={true}
									onChange={onDrop}
									imgExtension={['.jpg', '.gif', '.png', '.gif']}
									maxFileSize={5242880}
								/>
								{/* <Grid className="w-100npm install --save react-images-upload mr-3 p-2">
									<TextValidator
										// className="mb-16 w-100"
										style={{ width: '95%' }}
										label="Image"
										onChange={handleChange}
										name="tempImg"
										type="text"
										value={tempImg}
										errorMessages={[
											'this field is required',
											"password didn't match",
										]}
										variant="outlined"
										type="file"
									/>
								</Grid> */}
								{/* <Button
									onClick={addImage}
									style={{ height: 50 }}
									color="primary"
									variant="contained"
								>
									<Icon>add</Icon>
									<span className="pl-8 capitalize">Add</span>
								</Button> */}
							</div>
							{state.image && !isLoadImage && state.image.length ? (
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>No.</TableCell>
											<TableCell>Image</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{state.image.map((v, i) => (
											<TableRow>
												<TableCell
													className="px-0 capitalize"
													align="left"
												>
													{i + 1}
												</TableCell>
												<TableCell
													className="px-0 capitalize"
													align="left"
												>
													<img src={v} width={50} height={50} />
												</TableCell>
												<TableCell
													className="px-0 capitalize"
													align="right"
												>
													<IconButton
														onClick={() => _deleteImg(v)}
													>
														<Icon color="error">close</Icon>
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							) : (state.image && isLoadImage && state.image.length) ||
							  (isLoadImage &&
									state.image &&
									state.image.length === 0) ? (
								<CircularProgress />
							) : (
								<div />
							)}
						</Grid>
					</Grid>
					<Button color="primary" variant="contained" type="submit">
						<Icon>send</Icon>
						<span className="pl-8 capitalize">Send</span>
					</Button>
				</ValidatorForm>
			</SimpleCard>
		</div>
	);
};

// class AddProductForm extends Component {

// 	render() {

// 	}
// }

export default AddProductForm;
