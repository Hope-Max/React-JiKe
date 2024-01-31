import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

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
  const dispatch = useDispatch()

  const onMenuClick = (route) => {
    console.log(route)
    const path = route.key
    navigate(path)
  }

  // Reverse Highligh Button - 反向高亮
  const location = useLocation()
  const selectedKey = location.pathname

  // User Information
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  const { userInfo } = useSelector(state => state.user)

  // Logout
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate("./login")
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="Confirm to exit?" okText="Exit" cancelText="Cancel" onConfirm={onConfirm}>
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
            selectedKeys={[selectedKey]}
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