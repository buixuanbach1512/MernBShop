import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Login from './pages/Login';
import Categories from './pages/Categories/Categories';
import AddCategory from './pages/Categories/AddCategory';
import Products from './pages/Products/Products';
import AddProduct from './pages/Products/AddProduct';
import Brands from './pages/Brands/Brands';
import AddBrand from './pages/Brands/AddBrand';
import Colors from './pages/Colors/Colors';
import AddColor from './pages/Colors/AddColor';
import Sizes from './pages/Sizes/Sizes';
import AddSize from './pages/Sizes/AddSize';
import Coupons from './pages/Coupons/Coupons';
import AddCoupon from './pages/Coupons/AddCoupon';
import Orders from './pages/Orders/Orders';
import Register from './pages/Register';
import { OpenRoutes } from './routes/OpenRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import Staff from './pages/Staff/Staff';
import Roles from './pages/Roles/Roles';
import AddRole from './pages/Roles/AddRole';
import AddWareHouse from './pages/Products/AddWareHouse';
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <OpenRoutes>
                                <Login />
                            </OpenRoutes>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <OpenRoutes>
                                <Register />
                            </OpenRoutes>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoutes>
                                <MainLayout />
                            </PrivateRoutes>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="staff" element={<Staff />} />
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
                        <Route path="coupons" element={<Coupons />} />
                        <Route path="addCoupon" element={<AddCoupon />} />
                        <Route path="editCoupon/:id" element={<AddCoupon />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
