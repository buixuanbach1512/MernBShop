import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToWishList } from '../features/product/productSlice';
import { IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';

const ProductCard = (props) => {
    const navigate = useNavigate();
    const { grid, item } = props;
    let location = useLocation();
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const addToWL = (id) => {
        if (authState.user !== null && authState.isError === false) {
            dispatch(addToWishList(id));
        } else {
            toast.warning('Chưa đăng nhập');
        }
    };

    const handleClick = (data) => {
        navigate(`/product/${data.slug}`, { state: data });
    };
    return (
        <div
            className={`${
                location.pathname.split('/')[1] === 'store'
                    ? `col-xl-${grid} col-md-${grid} col-6 `
                    : 'col-xl-2 col-md-4 col-6'
            }`}
            style={{ padding: 5 }}
        >
            <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <button
                        className="bg-transparent border-0"
                        onClick={() => {
                            addToWL(item._id);
                        }}
                    >
                        <IoIosHeartEmpty className="prod-icon heart-icon" />
                    </button>
                </div>
                <div className="product-image">
                    <button className="bg-transparent border-0" onClick={() => handleClick(item)}>
                        <img className="img-fluid" src={item.images[0].url} alt="productimage" />
                    </button>
                </div>
                <div className="product-details mt-2">
                    <h6 className="brand">{item.brand.name}</h6>
                    <h5 className="product-title">{item.name}</h5>
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
