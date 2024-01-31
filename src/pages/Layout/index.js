import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Article',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Publish',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {

  const navigate = useNavigate()

  const onMenuClick = (route) => {
    console.log(route)
    const path = route.key
    navigate(path)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">Username</span>
          <span className="user-logout">
            <Popconfirm title="Confirm to exit?" okText="Exit" cancelText="Cancel">
              <LogoutOutlined /> Logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout