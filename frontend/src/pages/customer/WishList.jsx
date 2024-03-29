import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserWishList } from '../../features/auth/authSlice';
import { addToWishList } from '../../features/product/productSlice';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishListState = useSelector((state) => state.auth?.wishList?.wishlist);
    useEffect(() => {
        dispatch(getUserWishList());
    }, [dispatch]);
    const removeProdWishList = (id) => {
        dispatch(addToWishList({ prodId: id }));
        setTimeout(() => {
            dispatch(getUserWishList());
        }, 300);
    };
    return (
        <>
            <Meta title={'Wish List'} />
            <BreadCrumb title="Wish List" />
            <div className="widhlist-wrapper home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        {wishListState?.length === 0 && (
                            <div className="py-5">
                                <h2 className="text-center text-secondary">Chưa có sản phẩm yêu thích!!</h2>
                            </div>
                        )}
                        {wishListState?.map((item) => (
                            <div key={item._id} className="col-xl-2 col-md-4 col-12 mb-3">
                                <div className="wishlist-card position-relative">
                                    <IoMdClose
                                        onClick={() => removeProdWishList(item._id)}
                                        className="position-absolute cross"
                                    />
                                    <div
                                        className="wishlist-card-img cursor-poiner"
                                        onClick={() => navigate(`/product/${item.slug}/${item._id}`)}
                                    >
                                        <img src={item.images[0].url} className="img-fluid w-100" alt="product" />
                                    </div>
                                    <div className="wishlist-detail bg-white">
                                        <h5
                                            className="title cursor-poiner"
                                            onClick={() => navigate(`/product/${item.slug}/${item._id}`)}
                                        >
                                            {item.name}
                                        </h5>
                                        <h6 className="price">
                                            {item.price.toLocaleString('vi')}
                                            <sup>đ</sup>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishList;
