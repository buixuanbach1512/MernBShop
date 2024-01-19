import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const BlogCard = (props) => {
    let location = useLocation();
    const navigate = useNavigate();
    const { item } = props;
    const handleClick = (data) => {
        navigate(`/single-blog/${data._id}`);
    };
    return (
        <div className={`${location.pathname === '/blogs' ? `col-xl-4 col-md-4 col-12 ` : 'col-xl-3 col-md-4 col-12'}`}>
            <div className="blog-card">
                <div className="card-image">
                    <img src={item.images[0].url} className="img-fluid" alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">
                        {moment(item.createdAt).format('DD')} Tháng {moment(item.createdAt).format('MM')},{' '}
                        {moment(item.createdAt).format('YYYY')}
                    </p>
                    <h5 className="title">{item.title}</h5>
                    <p className="desc mb-3">{item.subTitle}</p>
                    <button className="button text-uppercase border-0" onClick={() => handleClick(item)}>
                        Xem thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
