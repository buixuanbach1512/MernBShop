import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// icon
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from 'react-icons/ai';
import { BiCategory, BiSolidColorFill } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { FaClipboardList } from 'react-icons/fa';
import { RiCoupon3Fill } from 'react-icons/ri';

// antd
import { Layout, Menu, Button, theme } from 'antd';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (width <= 740) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [width]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo d-flex align-items-center justify-content-center py-5">
                    <h2 className="text-white fs-5 py-3">
                        <span className="sm-logo">BS</span>
                        <span className="lg-logo">B SHOP</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {
                            navigate('/');
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-3" />,
                            label: 'Dash Board',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className="fs-3" />,
                            label: 'Khách Hàng',
                        },
                        {
                            key: 'categories',
                            icon: <BiCategory className="fs-3" />,
                            label: 'Danh Mục',
                        },
                        {
                            key: 'products',
                            icon: <AiOutlineShoppingCart className="fs-3" />,
                            label: 'Sản Phẩm',
                        },
                        {
                            key: 'brands',
                            icon: <SiBrandfolder className="fs-3" />,
                            label: 'Thương Hiệu',
                        },
                        {
                            key: 'colors',
                            icon: <BiSolidColorFill className="fs-3" />,
                            label: 'Màu Sắc',
                        },
                        {
                            key: 'sizes',
                            icon: <BiSolidColorFill className="fs-3" />,
                            label: 'Size',
                        },
                        {
                            key: 'coupons',
                            icon: <RiCoupon3Fill className="fs-3" />,
                            label: 'Phiếu mua hàng',
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-3" />,
                            label: 'Đơn Hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-2 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        className="btn-lr"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 60,
                            height: 60,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
