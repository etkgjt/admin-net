import React, { Component, useState, useEffect } from 'react';

import { SimpleCard, MatxProgressBar } from 'matx';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllContactMessage,
	updateContactMessageToRedux,
} from 'app/redux/actions/ContactAction';
import { CircularProgress } from '@material-ui/core';

const FeedBack = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state) => state?.contactReducer);
	const { token } = useSelector((state) => state.user);
	const [state, setState] = useState(
		messages && messages.length ? [...messages] : []
	);
	useEffect(() => {
		if (messages && messages.length) setState(messages);
	}, [messages]);
	useEffect(() => {
		if (!messages || !messages.length) {
			initialData();
		}
	}, []);
	const initialData = async () => {
		try {
			const res = await getAllContactMessage(token);
			console.log('get message list success', res);
			updateContactMessageToRedux(dispatch, res);
		} catch (err) {
			console.log('get message list err', err);
		}
	};
	return (
		<div>
			<SimpleCard title="Lasted Feedback">
				{state && state?.length ? (
					state?.map((v, i) =>
						i < 4 ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 20,
								}}
							>
								<div className="px-5 mb-16 d-flex flex-column border-bottom-1 w-100">
									<small
										style={{
											color: '#08AD6C',
											margin: 0,
											padding: 0,
										}}
									>
										{v?.email}
									</small>
									<p
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											maxHeight: 50,
											display: 'block',
											lineHeight: '1.8em',
											wordWrap: 'break-word',
										}}
									>
										{v?.message}
									</p>
									<small
										style={{
											color: '#9D9BB0',
											fontSize: 10,
											margin: 0,
											padding: 0,
										}}
									>
										{v?.date}
									</small>
								</div>
								<small
									style={{
										color: v?.reply ? '#08AD6C' : '#FFAF38',
										margin: 0,
										padding: 0,
										marginLeft: 20,
									}}
								>
									{v?.reply ? 'Replied' : 'Waiting'}
								</small>
							</div>
						) : null
					)
				) : (
					<CircularProgress />
				)}

				<div className="py-4" />
			</SimpleCard>
		</div>
	);
};

export default FeedBack;
