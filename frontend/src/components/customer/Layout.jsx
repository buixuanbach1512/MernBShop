import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <div className="app">
                <Header />
                <Outlet />
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
                <Footer />
            </div>
        </>
    );
};

export default Layout;
