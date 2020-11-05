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

import {
	addNewCustomer,
	updateCustomer,
} from '../../../redux/actions/CustomerAction';
import MySpinner from 'matx/components/MySpinner';

class UpdateCustomerForm extends Component {
	state = {
		username: this.props?.userInfo?.username || '',
		firstName: this.props?.userInfo?.first_name || '',
		lastName: this.props?.userInfo?.last_name || '',
		email: this.props?.userInfo?.username || '',
		date: new Date(),
		creditCard: '',
		mobile: this.props?.userInfo?.phone_number || '',
		confirmPassword: '',
		gender: this.props?.userInfo?.gender === 1 ? 'male' : 'female',
		newPassword: '',
		confirmNewPassword: '',
		address: this.props?.userInfo?.address,
	};

	componentDidMount() {
		// custom rule will have name 'isPasswordMatch'
		console.log('customer form render ne', this.props);
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
			MySpinner.show();
			console.log('submitted');
			let {
				firstName,
				lastName,
				creditCard,
				mobile,
				newPassword,
				gender,
				email,
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
				password: newPassword ? newPassword : null,
				address,
			});
			console.log('data', data);
			const res = await updateCustomer(
				this.props?.token,
				this.props?.userInfo?.id,
				data
			);
			console.log(res);
			MySpinner.hide(() => {}, {
				label: 'Update Customer Success !',
				value: 0,
			});
		} catch (err) {
			MySpinner.hide(() => {}, {
				label: 'Update customer failed !',
				value: 1,
			});
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
			firstName,
			lastName,
			creditCard,
			mobile,
			gender,
			date,
			email,
			newPassword,
			confirmNewPassword,
			address,
		} = this.state;

		return (
			<div>
				<SimpleCard>
					<h3>Edit Customer Information</h3>
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
								<TextValidator
									className="mb-32 w-100"
									label="Credit Card"
									onChange={this.handleChange}
									type="number"
									name="creditCard"
									value={creditCard}
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
									value={address ? address : ''}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="NewPassword"
									onChange={this.handleChange}
									name="newPassword"
									type="password"
									value={newPassword}
								/>
								<TextValidator
									className="mb-16 w-100"
									label="Confirm New Password"
									onChange={this.handleChange}
									name="confirmNewPassword"
									type="password"
									value={confirmNewPassword}
									// validators={['isPasswordMatch']}
									// errorMessages={["password didn't match"]}
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
							</Grid>
						</Grid>

						<Button color="primary" variant="contained" type="submit">
							<Icon>send</Icon>
							<span className="pl-8 capitalize">Update</span>
						</Button>
					</ValidatorForm>
				</SimpleCard>
			</div>
		);
	}
}

export default UpdateCustomerForm;
