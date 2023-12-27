import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
    return (
        <>
            <Meta title={'Blog'} />
            <BreadCrumb title="Blog" />
            <div className="blog-wrapper home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-xl-3 col-md-3 col-12">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Danh mục</h3>
                                <div>
                                    <ul className="ps-0">
                                        <li>
                                            <Link className="text-dark">Trang chủ</Link>
                                        </li>
                                        <li>
                                            <Link className="text-dark">Cửa hàng</Link>
                                        </li>
                                        <li>
                                            <Link className="text-dark">Blog</Link>
                                        </li>
                                        <li>
                                            <Link className="text-dark">Liên hệ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-md-9">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="mb-0 w-50">Sort by:</p>
                                        <select className="form-control form-select">
                                            <option value="feature">Nổi bật</option>
                                            <option value="bess-selling">Mua nhiều nhất</option>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list pb-5">
                                <div className="d-flex flex-wrap">
                                    <BlogCard />
                                </div>
                                {/* <Pagination
                                    totalItems={productState?.length}
                                    itemsPerPage={itemsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;
