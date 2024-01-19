import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBlogById } from '../../features/blog/blogSlice';
import moment from 'moment';
import parse from 'html-react-parser';

const SingleBlog = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const blogId = location.pathname.split('/')[2];
    const aBlogState = useSelector((state) => state.blog.aBlog);
    useEffect(() => {
        dispatch(getBlogById(blogId));
    }, [dispatch, blogId]);
    return (
        <>
            <Meta title={'Blog'} />
            <BreadCrumb title="Blog" />
            <div className="blog-wrapper home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-xl-8 col-md-8">
                            <div className="blog-content bg-white rounded-3 p-5">
                                <div className="my-4">
                                    <h2 className="mb-3">{aBlogState?.title}</h2>
                                    <div className="d-flex align-items-center gap-15">
                                        <h5 className="mb-0">Biên tập bởi: {aBlogState?.postedBy?.name}</h5>
                                        <p className="mb-0">
                                            {moment(aBlogState?.createdAt).format('DD')} Tháng{' '}
                                            {moment(aBlogState?.createdAt).format('MM')},{' '}
                                            {moment(aBlogState?.createdAt).format('YYYY')}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={aBlogState?.images[0]?.url}
                                        alt=""
                                        className="img-fluid"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <br />
                                <div>{aBlogState && parse(aBlogState?.description)}</div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog;
