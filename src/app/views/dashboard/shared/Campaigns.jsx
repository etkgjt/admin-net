import React, { Component, useState } from 'react';

import { SimpleCard, MatxProgressBar } from 'matx';
import { useSelector } from 'react-redux';

const FeedBack = () => {
	const { messages } = useSelector((state) => state?.contactReducer);
	const [state, setState] = useState(
		messages && messages.length ? [...messages] : []
	);
	return (
		<div>
			<SimpleCard title="Lasted Feedback">
				{state?.map((v, i) =>
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
									style={{ color: '#08AD6C', margin: 0, padding: 0 }}
								>
									{v?.email}
								</small>
								<p
									style={{
										display: 'inline-block',
										color: '#625E80',
										margin: 0,
										padding: 0,
										fontSize: 16,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										maxHeight: 70,
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
									color: v?.is_reply ? '#08AD6C' : '#FFAF38',
									margin: 0,
									padding: 0,
									marginLeft: 20,
								}}
							>
								{v?.is_reply ? 'Replied' : 'Waiting'}
							</small>
						</div>
					) : null
				)}
				<div className="py-4" />
			</SimpleCard>
		</div>
	);
};

export default FeedBack;
