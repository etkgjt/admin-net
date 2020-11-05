import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';

class MyAlert extends React.PureComponent {
	static instance = null;
	static show = (
		alertTitle = '',
		alertContent = '',
		isYesNo = true,
		onYesClick = () => {},
		onNoClick = () => {}
	) => {
		if (MyAlert.instance) {
			console.log('Modal show ne');
			MyAlert.instance.setState({ visible: false }, () => {
				MyAlert.instance.setState({
					visible: true,
					alertTitle,
					alertContent,
					isYesNo,
					onYesClick,
					onNoClick,
				});
			});
		}
	};
	static hide = (beforeHideCallback = () => {}) => {
		if (MyAlert.instance) {
			MyAlert.instance.setState(
				{
					visible: false,
				},
				() => beforeHideCallback()
			);
			console.log('modal hide ne');
		}
	};

	constructor(props) {
		super(props);
		MyAlert.instance = this;
		this.state = {
			visible: false,
			children: {},
			status: -1,
			alertTitle: '',
			alertContent: '',
			onYesClick: () => {},
			onNoClick: () => {},
			isYesNo: true,
		};
	}
	render() {
		console.log('Modal render');

		return (
			<Dialog
				open={MyAlert?.instance?.state?.visible || false}
				onClose={() => MyAlert.hide()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{MyAlert.instance?.state?.alertTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{MyAlert.instance?.state?.alertContent}
					</DialogContentText>
				</DialogContent>
				{MyAlert.instance?.state?.isYesNo ? (
					<DialogActions>
						<Button
							onClick={() =>
								MyAlert.hide(() => MyAlert.instance?.state?.onNoClick())
							}
							color="primary"
						>
							No
						</Button>
						<Button
							onClick={() =>
								MyAlert.hide(() => MyAlert.instance.state.onYesClick())
							}
							color="primary"
							autoFocus
						>
							Yes
						</Button>
					</DialogActions>
				) : (
					<DialogActions>
						<Button
							onClick={MyAlert.hide(
								() => MyAlert.instance?.state?.onYesClick
							)}
							color="primary"
							autoFocus
						>
							Ok
						</Button>
					</DialogActions>
				)}
			</Dialog>
		);
	}
}
export default MyAlert;
