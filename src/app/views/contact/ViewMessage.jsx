import { Button, Icon, TextareaAutosize, TextField } from '@material-ui/core';
import { SimpleCard } from 'matx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MySpinner from 'matx/components/MySpinner';
import {
	getAllContactMessage,
	reply,
	updateContactMessageToRedux,
} from 'app/redux/actions/ContactAction';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from 'matx/components/MyAlert';
import { useHistory } from 'react-router-dom';

const ViewMessage = ({ location }) => {
	const history = useHistory();
	const [state, setState] = useState({});
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user);
	const listMessageRedux = useSelector(
		(state) => state.contactReducer.messages
	);
	useEffect(() => {
		if (!location || !location.state || !location.state.data) {
			if (!listMessageRedux || !listMessageRedux.length)
				_handleGetAllMessage();
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
			console.log('products ne', listMessageRedux);
			setState(listMessageRedux?.[0]);
		}
	}, [listMessageRedux]);
	const _handleGetAllMessage = async () => {
		try {
			const data = await getAllContactMessage(token);
			console.log('all products list', data);
			updateContactMessageToRedux(dispatch, data);
		} catch (err) {
			MyAlert.show('Lỗi', `${err.message}`, false);
			console.log('Get All product list err', err);
		}
	};

	const _handleSendEmail = async (userEmail) => {
		try {
			MySpinner.show();
			const data = {
				service_id: 'techworld123',
				template_id: 'template_jfuj2ma',
				user_id: 'user_4A8bWFc8sR8Tkb6AMKKdN',
				template_params: {
					user_email: userEmail?.toLowerCase(),
					our_message: message,
				},
			};
			const res = await axios
				.post(
					'https://api.emailjs.com/api/v1.0/email/send',
					JSON.stringify(data),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then((res) => res?.data);
			const rep = await reply(token, state?.id);
			console.log('send email success', res, rep, data);

			const temp = await getAllContactMessage(token);
			updateContactMessageToRedux(dispatch, temp);

			MySpinner.hide(() => {}, { label: 'Reply Success !', value: 0 });
			history.goBack();
		} catch (err) {
			MySpinner.hide(() => {}, { label: 'Reply Failed !', value: 1 });
			console.log('send email err', err);
		}
	};
	console.log('state ne', state);
	return (
		<div className="m-sm-30">
			<h6>View Message</h6>
			<SimpleCard title="Message">
				<div style={{ flexDirection: 'column', display: 'flex' }}>
					<h6>From:</h6>
					<small>Email: {state?.email}</small>
					<small className="mb-16">Phone: {state?.phone}</small>
					<TextField variant="outlined" value={state?.message} multiline />
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
					>
						<small style={{ color: '#91909F' }}>
							2020-12-23 23:12:02
						</small>
					</div>
				</div>
			</SimpleCard>
			<div className="my-16" />
			<SimpleCard title="Reply">
				<div className="d-flex flex-column">
					<TextareaAutosize
						onChange={(e) => setMessage(e?.target?.value)}
						variant="outlined"
						className="mb-16"
						style={{
							width: '99%',
							fontSize: 15,
							fontFamily: 'inherit',
							padding: 5,
							color: '#625E80',
							borderColor: '#C4C4C4',
							borderRadius: 4,
						}}
						rowsMin={10}
						autoFocus
					/>
					<Button
						onClick={() => _handleSendEmail(state?.email)}
						color="primary"
						variant="contained"
						style={{ width: 85, height: 35 }}
					>
						<span style={{ marginRight: 5 }}>Reply</span>
						<Icon>reply</Icon>
					</Button>
				</div>
			</SimpleCard>
		</div>
	);
};
export default ViewMessage;
