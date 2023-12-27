import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/product/productSlice';
import { getProdCategory } from '../features/category/categorySlice';
import mainBanner from '../assets/main-banner-1.jpg';
import smallBanner1 from '../assets/small-banner-1.jpg';
import service from '../assets/service.png';
import service2 from '../assets/service-02.png';
import service3 from '../assets/service-03.png';
import service4 from '../assets/service-04.png';
import service5 from '../assets/service-05.png';
import gucci from '../assets/gucci.png';
import adidas from '../assets/adidas.png';
import nike from '../assets/nike.png';
import chanel from '../assets/chanel.png';
import supreme from '../assets/supreme.png';
import lv from '../assets/lv.png';

const Home = () => {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.products);
    const prodCateState = useSelector((state) => state.category.prodCategories);
    useEffect(() => {
        dispatch(getAllProduct({}));
        dispatch(getProdCategory());
    }, [dispatch]);
    return (
        <>
            <Meta title={'B-Shop'} />
            <section className="banner-wrapper home-wrapper-1 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6 main-banner">
                            <div className="position-relative">
                                <img
                                    src={mainBanner}
                                    className="img-fluid w-100 rounded-3 main-img-banner"
                                    alt="main-banner"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>Giảm giá cho sản phẩm</h4>
                                    <h5>Áo Thun </h5>
                                    <p>
                                        Chỉ từ 99.000<sup>đ</sup>/cái | 190.000<sup>đ</sup>/cặp
                                    </p>
                                    <Link className="button">Mua Ngay</Link>
                                </div>
                            </div>
                        </div>
                        <div className="secondary-banner col-6">
                            <div className="d-flex flex-wrap gap-5 justify-content-between align-items-center">
                                <div className="small-banner position-relative">
                                    <img
                                        src={smallBanner1}
                                        className="img-fluid rounded-3 small-banner-img"
                                        alt="main-banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Giảm giá cho sản phẩm</h4>
                                        <h5>Áo Thun </h5>
                                        <p>
                                            Chỉ từ 99.000<sup>đ</sup>/cái <br /> 190.000<sup>đ</sup>/cặp
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img
                                        src={smallBanner1}
                                        className="img-fluid rounded-3 small-banner-img"
                                        alt="main-banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Hàng Mới Về</h4>
                                        <h5>Quần Jean </h5>
                                        <p>
                                            Chỉ từ 89.000<sup>đ</sup>/cái <br /> 180.000<sup>đ</sup>/cặp
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-5 justify-content-between align-items-center mt-3">
                                <div className="small-banner position-relative">
                                    <img
                                        src={smallBanner1}
                                        className="img-fluid rounded-3 small-banner-img"
                                        alt="main-banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Giảm giá cho sản phẩm</h4>
                                        <h5>Áo Thun </h5>
                                        <p>
                                            Chỉ từ 99.000<sup>đ</sup>/cái <br /> 190.000<sup>đ</sup>/cặp
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img
                                        src={smallBanner1}
                                        className="img-fluid rounded-3 small-banner-img"
                                        alt="main-banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Hàng Mới Về</h4>
                                        <h5>Quần Jean </h5>
                                        <p>
                                            Chỉ từ 89.000<sup>đ</sup>/cái <br /> 180.000<sup>đ</sup>/cặp
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services-wrapper home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="services d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-10">
                                    <img src={service} alt="" />
                                    <div>
                                        <h6>Miễn Phí Giao Hàng</h6>
                                        <p className="mb-0">
                                            Đơn hàng từ 100.000<sup>đ</sup>
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src={service2} alt="service" />
                                    <div>
                                        <h6>Ưu đãi hàng ngày</h6>
                                        <p className="mb-0">Tiết kiệm tới 25%</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src={service3} alt="service" />
                                    <div>
                                        <h6>Hỗ trợ 24/7</h6>
                                        <p className="mb-0">Mọi lúc, mọi nơi</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src={service4} alt="service" />
                                    <div>
                                        <h6>Giá cả phải chăng</h6>
                                        <p className="mb-0">Giá gốc từ nhà máy</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src={service5} alt="service" />
                                    <div>
                                        <h6>Thanh toán an toàn</h6>
                                        <p className="mb-0">Được bảo vệ 100%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="categories d-flex flex-wrap align-items-center">
                                {prodCateState &&
                                    prodCateState?.map((item, index) => (
                                        <div key={index} className="category-card">
                                            <img
                                                src={item.productList[0]?.images[0]?.url}
                                                className=" img-fluid"
                                                alt="img"
                                                style={{ width: 70, height: 70 }}
                                            />
                                            <h6 className="category-title">{item.name}</h6>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="featured-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">sản phẩm nổi bật</h3>
                        </div>
                        {productState &&
                            productState
                                ?.slice(0, 12)
                                ?.filter((item) => item.tags === 'Sản phẩm nổi bật')
                                ?.map((item) => <ProductCard key={item._id} item={item} />)}
                    </div>
                </div>
            </section>
            <section className="special-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">sản phẩm đặc biệt</h3>
                        </div>
                    </div>
                    <div className="row">
                        {productState &&
                            productState
                                ?.slice(0, 4)
                                ?.filter((item) => item.tags === 'Sản phẩm đặc biệt')
                                ?.map((item) => <SpecialProduct key={item._id} item={item} />)}
                    </div>
                </div>
            </section>
            <section className="marquee-wrapper home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="marquee-inner-wrapper card-wrapper">
                                <Marquee className="d-flex">
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={gucci} alt="brand" />
                                    </div>
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={nike} alt="brand" />
                                    </div>
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={adidas} alt="brand" />
                                    </div>
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={supreme} alt="brand" />
                                    </div>
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={chanel} alt="brand" />
                                    </div>
                                    <div className="mx-5 w-25">
                                        <img className="brand-logo" src={lv} alt="brand" />
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Blogs Mới Nhất</h3>
                        </div>
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
