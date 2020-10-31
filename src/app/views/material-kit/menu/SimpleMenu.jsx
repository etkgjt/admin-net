import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function SimpleMenu({ items, onSelected = () => {} }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [data, setData] = React.useState(items ? items : []);
	const [isShow, setShow] = React.useState(false);
	function handleClick(event) {
		setShow(true);
	}

	function handleClose(v) {
		setShow(() => {
			v ?? onSelected(v);
			return false;
		});
	}

	return (
		<div>
			<Button
				variant="outlined"
				aria-owns={anchorEl ? 'simple-menu' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				Open Menu
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={isShow}
				onClose={handleClose}
			>
				{data && data.length
					? data.map((v, i) => (
							<MenuItem onClick={() => handleClose(v?.value)}>
								{v?.label}
							</MenuItem>
					  ))
					: null}
			</Menu>
		</div>
	);
}

export default SimpleMenu;
