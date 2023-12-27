import { Link, useLocation } from 'react-router-dom';

const BlogCard = () => {
    let location = useLocation();
    return (
        <div className={`${location.pathname === '/blogs' ? `col-xl-4 col-md-4 col-12 ` : 'col-xl-3 col-md-3 col-4'}`}>
            <div className="blog-card">
                <div className="card-image">
                    <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">7 Tháng 11, 2023</p>
                    <h5 className="title">Một buổi sáng chủ nhật đẹp trời</h5>
                    <p className="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <Link className="button text-uppercase">Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
