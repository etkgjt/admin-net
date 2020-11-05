import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
	Button,
	Icon,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import SimpleCard from 'matx/components/cards/SimpleCard';
import SimpleMenu from '../menu/SimpleMenu';

import { addNewCustomer } from '../../../redux/actions/CustomerAction';
import MySpinner from 'matx/components/MySpinner';

class AddCustomerForm extends Component {
	state = {
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		date: new Date(),
		creditCard: '',
		mobile: '',
		password: '',
		confirmPassword: '',
		gender: 'male',
		agreement: false,
		address: '',
	};

	componentDidMount() {
		// custom rule will have name 'isPasswordMatch'
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== this.state.password) {
				return false;
			}
			return true;
		});
	}

	componentWillUnmount() {
		// remove rule when it is not needed
		ValidatorForm.removeValidationRule('isPasswordMatch');
	}

	handleSubmit = async (event) => {
		try {
			console.log('submitted');
			MySpinner.show();
			let {
				username,
				firstName,
				lastName,
				creditCard,
				mobile,
				password,
				confirmPassword,
				gender,
				date,
				email,
				agreement,
				address,
			} = this.state;
			const data = JSON.stringify({
				username: email,
				first_name: firstName,
				last_name: lastName,
				address: null,
				phone_number: mobile,
				gender: gender === 'male' ? 1 : 2,
				role: 2,
				password,
				address,
			});
			console.log('data', data);
			const res = await addNewCustomer(data);
			console.log(res);
			MySpinner.hide(() => {}, {
				label: 'Add Customer Success !',
				value: 0,
			});
		} catch (err) {
			MySpinner.hide(() => {}, { label: 'Add Customer Failed', value: 1 });
			console.log('add customeer err', err);
		}
	};

	handleChange = (event) => {
		event.persist();
		this.setState({ [event.target.name]: event.target.value });
	};

	handleDateChange = (date) => {
		console.log(date);

		this.setState({ date });
	};

	render() {
		let {
			username,
			firstName,
			lastName,
			creditCard,
			mobile,
			password,
			confirmPassword,
			gender,
			date,
			email,
			agreement,
			address,
		} = this.state;
		return (
			<div>
				<SimpleCard>
					<h3>Add a New Customer</h3>
					<ValidatorForm
						ref="form"
						onSubmit={this.handleSubmit}
						onError={(errors) => null}
					>
						<Grid container spacing={6}>
							<Grid item lg={6} md={6} sm={12} xs={12}>
								{/* <TextValidator
									className="mb-16 w-100"
									label="Username (Min length 4, Max length 9)"
									onChange={this.handleChange}
									type="text"
									name="username"
									value={username}
									validators={[
										'required',
										'minStringLength: 4',
										'maxStringLength: 9',
									]}
									errorMessages={['this field is required']}
								/> */}
								<TextValidator
									className="mb-16 w-100"
									label="First Name"
									onChange={this.handleChange}
									type="text"
									name="firstName"
									value={firstName}
									validators={[
										'required',
										'minStringLength: 4',
										'maxStringLength: 20',
									]}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Last Name"
									onChange={this.handleChange}
									type="text"
									name="lastName"
									value={lastName}
									validators={[
										'required',
										'minStringLength: 4',
										'maxStringLength: 20',
									]}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Email"
									onChange={this.handleChange}
									type="email"
									name="email"
									value={email}
									validators={['required', 'isEmail']}
									errorMessages={[
										'this field is required',
										'email is not valid',
									]}
								/>

								{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									className="mb-16 w-100"
									margin="none"
									id="mui-pickers-date"
									label="Date picker"
									inputVariant="standard"
									type="text"
									autoOk={true}
									value={date}
									onChange={this.handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider> */}
								<TextValidator
									className="mb-32 w-100"
									label="Credit Card"
									onChange={this.handleChange}
									type="number"
									name="creditCard"
									value={creditCard}
									// validators={[
									// 	'minStringLength:16',
									// 	'maxStringLength: 16',
									// ]}
									// errorMessages={['this field is required']}
								/>
							</Grid>

							<Grid item lg={6} md={6} sm={12} xs={12}>
								<TextValidator
									className="mb-16 w-100"
									label="Phone Number"
									onChange={this.handleChange}
									type="text"
									name="mobile"
									value={mobile}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Address"
									onChange={this.handleChange}
									type="text"
									name="address"
									value={address}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Password"
									onChange={this.handleChange}
									name="password"
									type="password"
									value={password}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Confirm Password"
									onChange={this.handleChange}
									name="confirmPassword"
									type="password"
									value={confirmPassword}
									validators={['required', 'isPasswordMatch']}
									errorMessages={[
										'this field is required',
										"password didn't match",
									]}
								/>
								<RadioGroup
									className="mb-16"
									value={gender}
									name="gender"
									onChange={this.handleChange}
									row
								>
									<FormControlLabel
										value="male"
										control={<Radio color="secondary" />}
										label="Male"
										labelPlacement="end"
									/>
									<FormControlLabel
										value="female"
										control={<Radio color="secondary" />}
										label="Female"
										labelPlacement="end"
									/>
								</RadioGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={agreement === true}
											name="agreement"
											onChange={() =>
												this.setState({
													agreement: !this.state.agreement,
												})
											}
										/>
									}
									label="I have read and agree to the terms of service."
								/>
							</Grid>
						</Grid>

						<Button
							color="primary"
							variant="contained"
							type="submit"
							disabled={agreement === false}
						>
							<Icon>send</Icon>
							<span className="pl-8 capitalize">Add</span>
						</Button>
					</ValidatorForm>
				</SimpleCard>
			</div>
		);
	}
}

export default AddCustomerForm;
