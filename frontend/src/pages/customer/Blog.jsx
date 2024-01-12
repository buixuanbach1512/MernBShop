import Meta from '../../components/customer/Meta';
import BreadCrumb from '../../components/customer/BreadCrumb';
import { Link } from 'react-router-dom';
import BlogCard from '../../components/customer/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBlog } from '../../features/blog/blogSlice';
import Pagination from '../../components/customer/Pagination';

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const dispatch = useDispatch();
    const allBlogState = useSelector((state) => state.blog.blogs);
    useEffect(() => {
        dispatch(getAllBlog());
    }, [dispatch]);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = allBlogState && allBlogState.slice(firstItemIndex, lastItemIndex);
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
                                    {currentItems?.map((item) => (
                                        <BlogCard key={item._id} item={item} />
                                    ))}
                                </div>
                                <Pagination
                                    totalItems={allBlogState?.length}
                                    itemsPerPage={itemsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;
