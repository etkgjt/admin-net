import { MatxLoadable } from 'matx';

const VoucherList = MatxLoadable({
	loader: () => import('./VoucherList'),
});
const CreateVoucher = MatxLoadable({
	loader: () => import('./CreateVoucher'),
});

const voucherRoutes = [
	{
		path: '/voucher/voucher-list',
		component: VoucherList,
	},
	{
		path: '/voucher/create-voucher',
		component: CreateVoucher,
	},
];

export default voucherRoutes;
