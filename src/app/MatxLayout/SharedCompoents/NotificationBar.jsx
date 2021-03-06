import React, { useEffect, useState } from 'react';
import {
	Icon,
	Badge,
	MuiThemeProvider,
	Card,
	Button,
	IconButton,
	Drawer,
	Fab,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { getTimeDifference } from 'utils.js';
import { PropTypes } from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
	getNotification,
	deleteAllNotification,
	deleteNotification,
	generateNotiObject,
} from '../../redux/actions/NotificationActions';
import socket from '../../views/socket/index';
import shortId from 'shortid';

import moment from 'moment';
function NotificationBar(props) {
	const dispatch = useDispatch();
	const listNotiRedux = useSelector((state) => state.notification);
	const data = useSelector((state) => state.user);
	const reverseList = listNotiRedux;
	useEffect(() => {
		setNotiList(
			reverseList?.map((v) =>
				generateNotiObject(v?.type, v?.id, v?.date, v?.email)
			)
		);
	}, [listNotiRedux]);
	const [notification, setNotiList] = useState(
		reverseList?.map((v) =>
			generateNotiObject(v?.type, v?.id, v?.date, v?.email)
		)
	);
	useEffect(() => {
		if (!listNotiRedux || !listNotiRedux.length)
			dispatch(getNotification(data.token));
	}, []);
	console.log('list noti', notification);
	const {
		container,
		theme,
		settings,
		// notification: notifcationList = [],
	} = props;
	socket.on('new-user-noti', () => {
		dispatch(getNotification(data.token));
	});
	socket.on('new-order-noti', () => {
		dispatch(getNotification(data.token));
	});
	socket.on('new-message-noti', () => {
		dispatch(getNotification(data.token));
	});
	const [panelOpen, setPanelOpen] = React.useState(false);

	function handleDrawerToggle(id) {
		// if (!panelOpen) {
		// 	dispatch(getNotification());
		// }
		setPanelOpen(!panelOpen);
		//if (id) dispatch(deleteNotification(id, listNotiRedux, data.token));
	}
	const parentThemePalette = theme.palette;
	// console.log(theme);

	return (
		<MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
			<IconButton
				onClick={handleDrawerToggle}
				style={{
					color:
						parentThemePalette.type === 'light'
							? parentThemePalette.text.secondary
							: parentThemePalette.text.primary,
				}}
			>
				<Badge color="secondary" badgeContent={listNotiRedux?.length}>
					<Icon style={{ color: 'white' }}>notifications</Icon>
				</Badge>
			</IconButton>

			<Drawer
				width={'100px'}
				container={container}
				variant="temporary"
				anchor={'right'}
				open={panelOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<div className="notification">
					<div className="notification__topbar flex flex-middle p-16 mb-24">
						<Icon color="primary">notifications</Icon>
						<h5 className="ml-8 my-0 font-weight-500">Notifications</h5>
					</div>

					{notification.map((v) => (
						<div
							key={v.id}
							className="notification__card position-relative"
						>
							<IconButton
								size="small"
								className="delete-button bg-light-gray mr-24"
								onClick={() =>
									dispatch(
										deleteNotification(
											v.id,
											listNotiRedux,
											data.token
										)
									)
								}
							>
								<Icon className="text-muted" fontSize="small">
									clear
								</Icon>
							</IconButton>
							<Link
								to={`${v.path}`}
								onClick={() => handleDrawerToggle(v?.id)}
							>
								<Card className="mx-16 mb-24" elevation={3}>
									<div className="card__topbar flex flex-middle flex-space-between p-8 bg-light-gray">
										<div className="flex">
											<div className="card__topbar__button">
												<Icon
													className="card__topbar__icon"
													fontSize="small"
													color={v?.icon?.color}
												>
													{v.icon.name}
												</Icon>
											</div>
											<span className="ml-4 font-weight-500 text-muted">
												{v.heading}
											</span>
										</div>
										<small className="card__topbar__time text-muted">
											{getTimeDifference(new Date(v.timestamp))} ago
										</small>
									</div>
									<div className="px-16 pt-8 pb-16">
										<p className="m-0">{v.title}</p>
										<small className="text-muted">{v.subtitle}</small>
									</div>
								</Card>
							</Link>
						</div>
					))}

					<div className="text-center">
						<Button
							onClick={() =>
								dispatch(
									deleteAllNotification(listNotiRedux, data.token)
								)
							}
						>
							Clear Notifications
						</Button>
					</div>
				</div>
			</Drawer>
		</MuiThemeProvider>
	);
}

NotificationBar.propTypes = {
	settings: PropTypes.object.isRequired,
	notification: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	getNotification: PropTypes.func.isRequired,
	deleteNotification: PropTypes.func.isRequired,
	deleteAllNotification: PropTypes.func.isRequired,
	notification: state.notification,
	settings: state.layout.settings,
});

export default withStyles(
	{},
	{ withTheme: true }
)(
	connect(mapStateToProps, {
		getNotification,
		deleteNotification,
		deleteAllNotification,
	})(NotificationBar)
);
