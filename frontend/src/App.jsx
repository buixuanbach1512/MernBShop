import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import WishList from './pages/WishList';
import Product from './pages/Product';
import ScrollToTop from './utils/ScrollToTop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { OpenRoutes } from './routes/OpenRoutes';
import Order from './pages/Order';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Blogs from './pages/Blogs';

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
                            <Route path="store" element={<Store />} />
                            <Route path="store/:slug" element={<Store />} />
                            <Route path="product/:slug" element={<Product />} />
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
                            <Route path="contact" element={<Contact />} />
                            <Route path="blogs" element={<Blogs />} />
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
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
}

export default App;
