import { BarChartOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

const APP_ROUTER = [
  {
    key: 'Dashboard',
    icon: <BarChartOutlined />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: 'User',
    icon: <UserOutlined />,
    label: 'User',
    path: '/user',
  },
  {
    key: 'Product',
    icon: <UnorderedListOutlined />,
    label: 'Product',
    path: '/product',
  },
];

export default APP_ROUTER;
