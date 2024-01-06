import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs';

const Footer = () => {
    return (
        <>
            <footer className="footer-top py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <div className="d-flex gap-30 align-items-center">
                                <img src="images/newsletter.png" alt="newsletter" />
                                <h4 className="mb-0 text-white">Subscibe để nhận Thông báo</h4>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-1"
                                    placeholder="Địa chỉ email..."
                                    aria-label="Địa chỉ email..."
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text p-2" id="basic-addon2">
                                    Subcribe
                                </span>
                            </div>
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
                                <Link className="text-white py-2 mb-1">Chính sách bảo mật</Link>
                                <Link className="text-white py-2 mb-1">Chính sách hoàn trả</Link>
                                <Link className="text-white py-2 mb-1">Chính sách vận chuyển</Link>
                                <Link className="text-white py-2 mb-1">Các điều khoản và điều kiện</Link>
                                <Link className="text-white py-2 mb-1">Blogs</Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Tài Khoản</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">Về chúng tôi</Link>
                                <Link className="text-white py-2 mb-1">Câu hỏi thường gặp</Link>
                                <Link className="text-white py-2 mb-1">Tìm kiếm</Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className="text-white mb-4">Quick Links</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">Giày thể thao</Link>
                                <Link className="text-white py-2 mb-1">Áo thun</Link>
                                <Link className="text-white py-2 mb-1">Quần Jean</Link>
                                <Link className="text-white py-2 mb-1">Vest</Link>\
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
