import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiArrowsCounterClockwiseFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { addToWishList } from '../../features/product/productSlice';

const ProductCard = (props) => {
    const navigate = useNavigate();
    const { grid, item, type } = props;
    let location = useLocation();
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const addToWL = (id) => {
        if (authState.user !== null) {
            dispatch(addToWishList({ prodId: id }));
        } else {
            toast.warning('Chưa đăng nhập');
        }
    };

    const handleClick = (data) => {
        navigate(`/product/${data.slug}/${data._id}`);
    };
    const handleSubmit = (id) => {
        navigate(`/compare-product/${id}`);
    };
    return (
        <div
            className={`${
                location.pathname.split('/')[1] === 'store'
                    ? `col-xl-${grid} col-md-${grid} col-6 `
                    : 'col-xl-2 col-md-4 col-6'
            }`}
        >
            <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute d-flex flex-column gap-10">
                    <button
                        className="bg-transparent border-0"
                        onClick={() => {
                            addToWL(item._id);
                        }}
                    >
                        <IoIosHeartEmpty className="prod-icon heart-icon" />
                    </button>
                    <button className="bg-transparent border-0" onClick={() => handleSubmit(item._id)}>
                        <PiArrowsCounterClockwiseFill className="prod-icon" />
                    </button>
                </div>
                <div className="product-image py-3">
                    <button className="bg-transparent border-0" onClick={() => handleClick(item)}>
                        <img className="img-fluid" src={item.images[0].url} alt="productimage" />
                    </button>
                </div>
                <div className="product-details mt-2">
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <h6 className="brand mb-0">{item.brand.name}</h6>
                        {type == 'best-selling' ? <span className="span-prod">đã bán: {item.sold}</span> : ''}
                        {type == 'top-view' ? <span className="span-prod">lượt xem: {item.viewer.length}</span> : ''}
                    </div>
                    <h5 className="product-title cursor-poiner" onClick={() => handleClick(item)}>
                        {item.name}
                    </h5>
                    <div className="mb-2">
                        <StarRatings
                            rating={item.totalRating}
                            starRatedColor="#ffd700"
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="1px"
                            name="rating"
                        />
                    </div>
                    <p className="price">
                        {item.price.toLocaleString('vi')}
                        <sup>đ</sup>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
