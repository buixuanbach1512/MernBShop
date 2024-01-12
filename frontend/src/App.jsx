import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/customer/Layout';
import Home from './pages/customer/Home';
import Contact from './pages/customer/Contact';
import Store from './pages/customer/Store';
import Login from './pages/customer/Login';
import ForgotPassword from './pages/customer/ForgotPassword';
import SignUp from './pages/customer/SignUp';
import WishList from './pages/customer/WishList';
import Product from './pages/customer/Product';
import ScrollToTop from './utils/ScrollToTop';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { OpenRoutes } from './routes/OpenRoutes';
import Order from './pages/customer/Order';
import Profile from './pages/customer/Profile';
import ResetPassword from './pages/customer/ResetPassword';
import ChangePassword from './pages/customer/ChangePassword';
import Blog from './pages/customer/Blog';
import SingleBlog from './pages/customer/SingleBlog';
import Coupon from './pages/customer/Coupon';
import MyCoupon from './pages/customer/MyCoupon';
import OrderHistory from './pages/customer/OrderHistory';
import InBoxShop from './pages/customer/InBoxShop';
import Compare from './pages/customer/Compare';

import MainLayout from './components/admin/MainLayout';
import Dashboard from './pages/admin/Dashboard';
import Customer from './pages/admin/Customers';
import ContactAdmin from './pages/admin/Contact';
import Rating from './pages/admin/Rating';
import Staff from './pages/admin/Staff/Staff';
import AddStaff from './pages/admin/Staff/AddStaff';
import Sizes from './pages/admin/Sizes/Sizes';
import AddSize from './pages/admin/Sizes/AddSize';
import Roles from './pages/admin/Roles/Roles';
import AddRole from './pages/admin/Roles/AddRole';
import Products from './pages/admin/Products/Products';
import AddProduct from './pages/admin/Products/AddProduct';
import AddWareHouse from './pages/admin/Statistics/AddWareHouse';
import Orders from './pages/admin/Orders/Orders';
import OrderDetail from './pages/admin/Orders/OrderDetail';
import Coupons from './pages/admin/Coupons/Coupons';
import AddCoupon from './pages/admin/Coupons/AddCoupon';
import Colors from './pages/admin/Colors/Colors';
import AddColor from './pages/admin/Colors/AddColor';
import Categories from './pages/admin/Categories/Categories';
import AddCategory from './pages/admin/Categories/AddCategory';
import Brands from './pages/admin/Brands/Brands';
import AddBrand from './pages/admin/Brands/AddBrand';
import AddBlog from './pages/admin/Blogs/AddBlog';
import Blogs from './pages/admin/Blogs/Blogs';
import ShopInbox from './pages/admin/ShopInbox';
import Permissions from './pages/admin/Permissions/Permissions';
import AddPermission from './pages/admin/Permissions/AddPermission';
import WarehouseStatistics from './pages/admin/Statistics/WarehouseStatistics';

function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop>
                    <Routes forceRefresh={true}>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route
                                path="signup"
                                element={
                                    <OpenRoutes>
                                        <SignUp />
                                    </OpenRoutes>
                                }
                            />
                            <Route
                                path="login"
                                element={
                                    <OpenRoutes>
                                        <Login />
                                    </OpenRoutes>
                                }
                            />
                            <Route
                                path="wishlist"
                                element={
                                    <PrivateRoutes>
                                        <WishList />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="get-coupon"
                                element={
                                    <PrivateRoutes>
                                        <Coupon />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="my-coupon"
                                element={
                                    <PrivateRoutes>
                                        <MyCoupon />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="inbox-shop"
                                element={
                                    <PrivateRoutes>
                                        <InBoxShop />
                                    </PrivateRoutes>
                                }
                            />
                            <Route path="store/:slug/:id" element={<Store />} />
                            <Route path="product/:slug/:id" element={<Product />} />
                            <Route
                                path="cart"
                                element={
                                    <PrivateRoutes>
                                        <Cart />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="checkout"
                                element={
                                    <PrivateRoutes>
                                        <Checkout />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="order"
                                element={
                                    <PrivateRoutes>
                                        <Order />
                                    </PrivateRoutes>
                                }
                            />
                            <Route
                                path="order-history"
                                element={
                                    <PrivateRoutes>
                                        <OrderHistory />
                                    </PrivateRoutes>
                                }
                            />
                            <Route path="contact" element={<Contact />} />
                            <Route path="blogs" element={<Blog />} />
                            <Route path="single-blog/:id" element={<SingleBlog />} />
                            <Route path="compare-product/:id" element={<Compare />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route
                                path="my-profile/:id"
                                element={
                                    <PrivateRoutes>
                                        <Profile />
                                    </PrivateRoutes>
                                }
                            />
                            <Route path="reset-password/:token" element={<ResetPassword />} />
                            <Route
                                path="change-password"
                                element={
                                    <PrivateRoutes>
                                        <ChangePassword />
                                    </PrivateRoutes>
                                }
                            />
                        </Route>
                        <Route
                            path="/admin"
                            element={
                                <PrivateRoutes>
                                    <MainLayout />
                                </PrivateRoutes>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            <Route path="customers" element={<Customer />} />
                            <Route path="staff" element={<Staff />} />
                            <Route path="addStaff" element={<AddStaff />} />
                            <Route path="editStaff/:id" element={<AddStaff />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="addCategory" element={<AddCategory />} />
                            <Route path="editCategory/:id" element={<AddCategory />} />
                            <Route path="products" element={<Products />} />
                            <Route path="addProduct" element={<AddProduct />} />
                            <Route path="addWareHouse" element={<AddWareHouse />} />
                            <Route path="editProduct" element={<AddProduct />} />
                            <Route path="brands" element={<Brands />} />
                            <Route path="addBrand" element={<AddBrand />} />
                            <Route path="editBrand/:id" element={<AddBrand />} />
                            <Route path="colors" element={<Colors />} />
                            <Route path="addColor" element={<AddColor />} />
                            <Route path="editColor/:id" element={<AddColor />} />
                            <Route path="sizes" element={<Sizes />} />
                            <Route path="addSize" element={<AddSize />} />
                            <Route path="editSize/:id" element={<AddSize />} />
                            <Route path="roles" element={<Roles />} />
                            <Route path="addRole" element={<AddRole />} />
                            <Route path="editRole" element={<AddRole />} />
                            <Route path="contact" element={<ContactAdmin />} />
                            <Route path="coupons" element={<Coupons />} />
                            <Route path="addCoupon" element={<AddCoupon />} />
                            <Route path="editCoupon/:id" element={<AddCoupon />} />
                            <Route path="rating" element={<Rating />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="order-detail/:id" element={<OrderDetail />} />
                            <Route path="inbox" element={<ShopInbox />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="addBlog" element={<AddBlog />} />
                            <Route path="blogs" element={<Blogs />} />
                            <Route path="warehouse-statistics" element={<WarehouseStatistics />} />
                            <Route path="permissions" element={<Permissions />} />
                            <Route path="addPermission" element={<AddPermission />} />
                            <Route path="editPermission/:id" element={<AddPermission />} />
                        </Route>
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
}

export default App;
