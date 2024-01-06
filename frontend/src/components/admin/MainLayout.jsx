import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

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
import { FaUsersCog } from 'react-icons/fa';
import { CgSize } from 'react-icons/cg';
import { TfiControlEject } from 'react-icons/tfi';
import { MdContactPhone } from 'react-icons/md';

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
    const handleLogout = () => {
        sessionStorage.clear();
        window.location.reload();
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                }}
            >
                <div className="logo d-flex align-items-center justify-content-center py-5">
                    <Link to="/">
                        <h2 className="text-white fs-5 py-3">
                            <span className="sm-logo">BS</span>
                            <span className="lg-logo">B SHOP</span>
                        </h2>
                    </Link>
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
                            key: 'staff',
                            icon: <FaUsersCog className="fs-3" />,
                            label: 'Nhân Viên',
                        },

                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart className="fs-3" />,
                            label: 'Quản lý bán hàng',
                            children: [
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
                                    icon: <CgSize className="fs-3" />,
                                    label: 'Size',
                                },
                                {
                                    key: 'categories',
                                    icon: <BiCategory className="fs-3" />,
                                    label: 'Danh Mục',
                                },
                            ],
                        },

                        {
                            key: 'roles',
                            icon: <TfiControlEject className="fs-3" />,
                            label: 'Chức vụ',
                        },
                        {
                            key: 'coupons',
                            icon: <RiCoupon3Fill className="fs-3" />,
                            label: 'Phiếu mua hàng',
                        },
                        {
                            key: 'rating',
                            icon: <FaClipboardList className="fs-3" />,
                            label: 'Đánh giá',
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-3" />,
                            label: 'Đơn Hàng',
                        },
                        {
                            key: 'contact',
                            icon: <MdContactPhone className="fs-3" />,
                            label: 'Liên hệ',
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
                        type="button"
                        className="btn-lr"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 60,
                            height: 60,
                        }}
                    />
                    <div className="d-flex align-items-center">
                        <button
                            style={{
                                width: '50px',
                                height: '20px',
                                fontSize: '1rem',
                            }}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </div>
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
