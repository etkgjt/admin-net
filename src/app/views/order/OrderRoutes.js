import { MatxLoadable } from 'matx';

const OrderList = MatxLoadable({
	loader: () => import('./OrderList'),
});
const ViewOrder = MatxLoadable({
	loader: () => import('./ViewOrder'),
});

const orderRoutes = [
	{
		path: '/order/order-list',
		component: OrderList,
	},
	{
		path: '/order/view-order',
		component: ViewOrder,
	},
];

export default orderRoutes;
