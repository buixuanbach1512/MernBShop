import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCategory } from '../../features/category/categorySlice';

const Footer = () => {
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);
    return (
        <>
            <footer className="footer-top py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h4 className="text-white text-center">B-SHOP - Miễn phí vận chuyển toàn quốc</h4>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="footer-pc py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-white mb-4">Liên Hệ Shop</h4>
                            <div>
                                <address className="text-white fs-6">
                                    B SHOP <br />
                                    Địa chỉ: 38 Phan Đình Giót - Thanh Xuân - HN <br />
                                    Việt Nam
                                </address>
                                <a href="tel: +84 981736892" className="mt-3 d-block mb-1 text-white">
                                    +84 981736892
                                </a>
                                <a href="mailto: buixuanbach102@gmail.com" className="mt-2 d-block mb-0 text-white">
                                    buixuanbach102@gmail.com
                                </a>
                                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                                    <a href="# " className="text-white">
                                        <BsLinkedin className="fs-4" />
                                    </a>
                                    <a href="# " className="text-white">
                                        <BsInstagram className="fs-4" />
                                    </a>
                                    <a href="# " className="text-white">
                                        <BsGithub className="fs-4" />
                                    </a>
                                    <a href="# " className="text-white">
                                        <BsYoutube className="fs-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Thông Tin Shop</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">Liên hệ</Link>
                                <Link className="text-white py-2 mb-1">Blogs</Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Tài Khoản</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">Phiếu mua hàng</Link>
                                <Link className="text-white py-2 mb-1">Danh sách yêu thích</Link>
                                <Link className="text-white py-2 mb-1">Giỏ hàng</Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className="text-white mb-4">Danh mục sản phẩm</h4>
                            <div className="footer-links d-flex flex-column">
                                {categoryState &&
                                    categoryState.map((item, index) => (
                                        <Link key={index} className="text-white py-2 mb-1">
                                            {item.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="footer-mobile py-3">
                <div className="d-flex align-items-center text-white">
                    <h1 style={{ margin: '0 auto' }}>B-SHOP</h1>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center text-white mb-0">
                                &copy; {new Date().getFullYear()}; Powered by Developer - Bach
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
