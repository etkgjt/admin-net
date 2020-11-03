import { CircularProgress, Dialog, DialogTitle } from '@material-ui/core';
import React from 'react';

class MySpinner extends React.PureComponent {
	static instance = null;
	static show = (cb = () => {}) => {
		cb();
		if (MySpinner.instance) {
			console.log('Modal show ne');
			MySpinner.instance.setState({ visible: false }, () => {
				MySpinner.instance.setState({
					visible: true,
					status: { label: '', value: -1 },
				});
			});
		}
	};
	static hide = (
		beforeHideCallback = () => {},
		status = { label: '', value: -1 }
	) => {
		if (MySpinner.instance) {
			beforeHideCallback();
			if (status && status.label) {
				MySpinner.instance.setState({ status: status });
				setTimeout(() => {
					MySpinner.instance.setState({ visible: false });
				}, 2000);
			} else MySpinner.instance.setState({ visible: false });
			console.log('modal hide ne');
		}
	};

	constructor(props) {
		super(props);
		MySpinner.instance = this;
		this.state = {
			visible: false,
			children: {},
			status: -1,
		};
	}
	render() {
		console.log('Modal render');

		return (
			<Dialog
				onClose={() => MySpinner.hide()}
				aria-labelledby="simple-dialog-title"
				open={MySpinner.instance?.state?.visible || false}
				className="d-flex justify-content-center align-items-center"
			>
				<DialogTitle>
					{MySpinner.instance?.state?.status?.value === -1 ? (
						<CircularProgress size={60} />
					) : (
						<p
							style={{
								marginTop: 5,
								fontSize: 20,
								color:
									MySpinner?.instance?.state?.status?.value === 0
										? '#7467ef'
										: '#ff9e43',
							}}
						>
							{MySpinner?.instance?.state?.status?.label}
						</p>
					)}
				</DialogTitle>
			</Dialog>
		);
	}
}
export default MySpinner;
