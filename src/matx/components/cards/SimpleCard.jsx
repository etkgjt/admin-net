import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, IconButton, TextField } from '@material-ui/core';
import { CSVLink, CSVDownload } from 'react-csv';
import moment from 'moment';

const SimpleCard = ({
	children,
	title,
	subtitle,
	icon,
	controlGroup = false,
	onSearch = () => {},
	csvData = {},
}) => {
	const [showSearchBar, setShow] = useState(false);
	return (
		<Card elevation={6} className="px-24 py-20 h-100">
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					height: 50,
				}}
			>
				<div className="card-title">{title}</div>

				{controlGroup ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						{showSearchBar ? (
							<TextField
								disableAnimation={false}
								autoFocus
								variant="outlined"
								style={{ width: 600 }}
								placeholder="Search"
								onBlur={() => setShow(false)}
								onChange={(e) => onSearch(e.target.value)}
							/>
						) : (
							<IconButton onClick={() => setShow(!showSearchBar)}>
								<Icon>search</Icon>
							</IconButton>
						)}

						{/* <IconButton>
							<Icon>print</Icon>
						</IconButton> */}
						<CSVLink
							data={csvData?.data}
							headers={csvData?.headers}
							filename={`TECH_WORLD_${moment().format('YYYY-MM-DD')}`}
						>
							<IconButton>
								<Icon>cloud_download</Icon>
							</IconButton>
						</CSVLink>
					</div>
				) : null}
			</div>
			<div className="card-subtitle mb-24">{subtitle}</div>
			{children}
		</Card>
	);
};

export default SimpleCard;
