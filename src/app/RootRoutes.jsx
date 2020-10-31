import React from 'react';
import { Redirect } from 'react-router-dom';

import dashboardRoutes from './views/dashboard/DashboardRoutes';
import utilitiesRoutes from './views/utilities/UtilitiesRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';

import materialRoutes from './views/material-kit/MaterialRoutes';
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute';

import formsRoutes from './views/forms/FormsRoutes';
import mapRoutes from './views/map/MapRoutes';

import CustomerRoutes from './views/customer/CustomerRoutes';
import OrderRoutes from './views/order/OrderRoutes';
import ProductRoutes from './views/product/ProductRoutes';
import OrderList from './views/order/OrderList';
import ViewOrder from './views/order/ViewOrder';

const redirectRoute = [
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/dashboard/analytics" />,
	},
];

const errorRoute = [
	{
		component: () => <Redirect to="/session/404" />,
	},
];

const routes = [
	...sessionRoutes,
	...dashboardRoutes,
	// ...materialRoutes,
	// ...utilitiesRoutes,
	// ...dragAndDropRoute,
	//...formsRoutes,
	// ...mapRoutes,
	//...redirectRoute,
	// ...errorRoute,
	...CustomerRoutes,
	...OrderRoutes,
	...ProductRoutes,
];

export default routes;
