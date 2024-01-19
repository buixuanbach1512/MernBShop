import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import BlogCard from '../../components/customer/BlogCard';
import ProductCard from '../../components/customer/ProductCard';
import SpecialProduct from '../../components/customer/SpecialProduct';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../features/product/productSlice';
import { getProdCategory } from '../../features/category/categorySlice';
import mainBanner1 from '../../assets/main-banner-1.jpg';
import mainBanner2 from '../../assets/main-banner-2.jpg';
import mainBanner3 from '../../assets/main-banner-3.jpg';
import smallBanner1 from '../../assets/small-banner-1.jpg';
import smallBanner2 from '../../assets/small-banner-2.jpg';
import bannerVoucher from '../../assets/banner-voucher.jpg';
import service from '../../assets/service.png';
import service2 from '../../assets/service-02.png';
import service3 from '../../assets/service-03.png';
import service4 from '../../assets/service-04.png';
import service5 from '../../assets/service-05.png';
import gucci from '../../assets/gucci.png';
import adidas from '../../assets/adidas.png';
import nike from '../../assets/nike.png';
import chanel from '../../assets/chanel.png';
import supreme from '../../assets/supreme.png';
import lv from '../../assets/lv.png';
import Loading from '../../components/customer/Loading';
import { getAllBlog } from '../../features/blog/blogSlice';

const Home = () => {
    let [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.products);
    const prodCateState = useSelector((state) => state.category.prodCategories);
    const allBlogState = useSelector((state) => state.blog.blogs);
    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getProdCategory());
        dispatch(getAllBlog());
        setLoading(true);
    }, [dispatch]);
    useEffect(() => {
        let newListProduct = [];
        productState &&
            productState.forEach((item) => {
                newListProduct.push(item);
            });
        setListProduct(newListProduct);
    }, [productState]);
    // const handleSubmit = (data) => {
    //     navigate(`/store/${data.slug}/${data._id}`);
    // };
    return loading ? (
        <>
            <Meta title={'B-Shop'} />
            <section className="banner-wrapper home-wrapper-1 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-8 main-banner">
                            <div className="position-relative">
                                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={mainBanner1} className="d-block w-100" alt="..." />
                                            <div className="main-banner-content position-absolute">
                                                <div className=" d-flex flex-column gap-15 align-items-center">
                                                    <h1 className=" text-uppercase text-banner text-center">
                                                        Thời trang <br /> nữ
                                                    </h1>
                                                    <button className="button border-0">Xem ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={mainBanner2} className="d-block w-100" alt="..." />
                                            <div className="main-banner-content position-absolute">
                                                <div className=" d-flex flex-column gap-15 align-items-center">
                                                    <h1 className=" text-uppercase text-banner text-center">
                                                        Thời trang <br /> nam
                                                    </h1>
                                                    <button className="button border-0">Xem ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={mainBanner3} className="d-block w-100" alt="..." />
                                            <div className="main-banner-content position-absolute">
                                                <div className=" d-flex flex-column gap-15 align-items-center">
                                                    <h1 className=" text-uppercase text-banner text-center">
                                                        Túi xách <br /> Balo
                                                    </h1>
                                                    <button className="button border-0">Xem ngay</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleFade"
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleFade"
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="secondary-banner col-4">
                            <div className="row py-2">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <img src={smallBanner1} alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-6">
                                            <img src={smallBanner2} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-3">
                                    <img
                                        src={bannerVoucher}
                                        alt=""
                                        className="img-fluid"
                                        style={{ height: 200, width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services-wrapper home-wrapper-2 ">
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
            <section className="home-wrapper-2">
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
            <section className="featured-wrapper  home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Top sản phẩm bán chạy</h3>
                        </div>
                        {listProduct &&
                            listProduct
                                .sort((a, b) => b.sold - a.sold)
                                .slice(0, 6)
                                .map((item) => <ProductCard key={item._id} item={item} type="best-selling" />)}
                    </div>
                </div>
            </section>
            <section className="featured-wrapper  home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Top lượt xem</h3>
                        </div>
                        {listProduct &&
                            listProduct
                                .sort((a, b) => b.viewer.length - a.viewer.length)
                                .slice(0, 6)
                                ?.map((item) => <ProductCard key={item._id} item={item} type="top-view" />)}
                    </div>
                </div>
            </section>
            <section className="featured-wrapper  home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">sản phẩm nổi bật</h3>
                        </div>
                        {productState &&
                            productState
                                ?.filter((item) => item.tags == 'Sản phẩm nổi bật')
                                ?.slice(0, 6)
                                ?.map((item) => <ProductCard key={item._id} item={item} />)}
                    </div>
                </div>
            </section>
            <section className="special-wrapper  home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">sản phẩm đặc biệt</h3>
                        </div>
                    </div>
                    <div className="row">
                        {productState &&
                            productState
                                ?.filter((item) => item.tags == 'Sản phẩm đặc biệt')
                                ?.slice(0, 4)
                                ?.map((item) => <SpecialProduct key={item._id} item={item} />)}
                    </div>
                </div>
            </section>
            <section className="marquee-wrapper home-wrapper-2 ">
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
            <section className="blog-wrapper home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Blogs Mới Nhất</h3>
                        </div>
                        {allBlogState?.slice(0, 4)?.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    ) : (
        <Loading />
    );
};

export default Home;
