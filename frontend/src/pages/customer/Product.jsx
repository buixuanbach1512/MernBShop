import { useEffect } from 'react';
import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import ProductCard from '../../components/customer/ProductCard';
import StarRatings from 'react-star-ratings';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Color from '../../components/customer/ColorList';
import Size from '../../components/customer/SizeList';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct, getAllProduct, rating, resetState, updateView } from '../../features/product/productSlice';
import { toast } from 'react-toastify';
import { addToCart, getCart } from '../../features/auth/authSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ProductImages from '../../components/customer/ProductImages';
import { createConversation } from '../../features/conversation/consversationSlice';

const schema = Yup.object().shape({
    comment: Yup.string().required('Chưa viết đánh giá!!'),
});

const Product = () => {
    const user = sessionStorage.getItem('user');
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [added, setAdded] = useState(false);
    const [border, setBorder] = useState(null);
    const [sizeStyle, setSizeStyle] = useState(null);
    const [star, setStar] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productId = location.pathname.split('/')[3];
    const prodState = useSelector((state) => state.product.getAProd);
    const allProdState = useSelector((state) => state?.product?.products);
    const getCartState = useSelector((state) => state?.auth?.cart);
    useEffect(() => {
        dispatch(getAProduct(productId));
        dispatch(getAllProduct({}));
        if (user) {
            dispatch(getCart());
        }
    }, [dispatch, productId, user]);
    useEffect(() => {
        for (let i = 0; i < getCartState.length; i++) {
            if (productId === getCartState[i].prodId?._id) {
                setAdded(true);
            }
        }
    }, [getCartState, productId]);
    const addCart = () => {
        if (size === null) {
            toast.error('Chưa chọn size sản phẩm');
            return false;
        } else if (color === null) {
            toast.error('Chưa chọn màu sản phẩm');
            return false;
        } else {
            const data = {
                productId: prodState?._id,
                quantity,
                stock: prodState?.quantity,
                color,
                size,
                price: prodState?.price,
                salePrice: prodState?.salePrice != 0 ? prodState?.salePrice : 0,
            };
            if (user) {
                if (prodState?.quantity > 0) {
                    if (prodState?.quantity - quantity < 0) {
                        toast.warning('Không dủ hàng trong kho');
                    } else {
                        dispatch(addToCart(data));
                        setTimeout(() => {
                            navigate('/cart');
                        }, 1000);
                    }
                } else {
                    toast.error('Sản phẩm đã hết hàng');
                }
            } else {
                toast.warning('Chưa đăng nhập');
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const data = {
                star: star,
                prodId: productId,
                comment: values.comment,
            };
            if (user) {
                dispatch(rating(data));
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(getAProduct(productId));
                    dispatch(getAllProduct());
                    formik.resetForm();
                }, 200);
            } else {
                toast.warning('Chưa đăng nhập');
            }
        },
    });
    const ratingChanged = (newRating) => {
        setStar(newRating);
    };
    const handleMessageSubmit = () => {
        if (user) {
            if (user._id !== prodState?.postedBy) {
                const data = {
                    groupTitle: user._id + prodState?._id,
                    groupName: prodState?.brand?.name,
                    userId: user._id,
                    sellerId: prodState?.postedBy,
                };
                dispatch(createConversation(data));
                setTimeout(() => {
                    navigate('/inbox-shop');
                }, 200);
            } else {
                toast.error('Không thể tự chat với bản thân');
            }
        } else {
            toast.warning('Chưa đăng nhập');
        }
    };
    useEffect(() => {
        if (user) {
            dispatch(updateView({ prodId: productId }));
        }
    }, [dispatch, productId, user]);
    console.log(1);
    return (
        <>
            <Meta title={'Product'} />
            <BreadCrumb title={prodState?.name} />
            <div className="product-wrapper home-wrapper-2">
                <div className="container p-3">
                    <div className="row">
                        <ProductImages item={prodState?.images} />
                        <div className="col-12 col-xl-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className="title">{prodState?.name}</h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <p className="price">
                                        {prodState?.tags == 'Sản phẩm đặc biệt' ? (
                                            <>
                                                <span>
                                                    {prodState?.salePrice.toLocaleString('vi')}
                                                    <sup>đ</sup>
                                                </span>
                                                &nbsp;&nbsp;
                                                <strike className="text-danger">
                                                    {prodState?.price.toLocaleString('vi')}
                                                    <sup>đ</sup>
                                                </strike>
                                            </>
                                        ) : (
                                            <span>
                                                {prodState?.price.toLocaleString('vi')}
                                                <sup>đ</sup>
                                            </span>
                                        )}
                                    </p>
                                    <div className="d-flex align-items-center gap-10">
                                        <StarRatings
                                            rating={prodState?.totalRating}
                                            starRatedColor="#ffd700"
                                            numberOfStars={5}
                                            starDimension="20px"
                                            starSpacing="1px"
                                            name="rating"
                                        />
                                        <p className="text-review mb-0">( {prodState?.ratings.length} đánh giá )</p>
                                    </div>
                                    <a className="review-btn" href="#review">
                                        Đánh giá sản phẩm
                                    </a>
                                </div>
                                <div className="border-bottom py-3">
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-label">Thương hiệu :</h3>
                                        <p className=" product-data">{prodState?.brand.name}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-label">Danh mục :</h3>
                                        <p className=" product-data">{prodState?.category.name}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-label">Tags :</h3>
                                        <p className=" product-data">{prodState?.tags}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-label">Kho hàng :</h3>
                                        <p className=" product-data">{prodState?.quantity}</p>
                                    </div>
                                    {added === false && (
                                        <>
                                            <div className="d-flex gap-10 flex-column my-2">
                                                <h3 className="product-label">Size :</h3>
                                                <Size
                                                    sizeData={prodState?.size}
                                                    setSize={setSize}
                                                    setSizeStyle={setSizeStyle}
                                                    sizeStyle={sizeStyle}
                                                />
                                            </div>
                                            <div className="d-flex gap-10 flex-column my-2">
                                                <h3 className="product-label">Màu sắc :</h3>
                                                <Color
                                                    colorData={prodState?.color}
                                                    setColor={setColor}
                                                    setBorder={setBorder}
                                                    border={border}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="d-flex gap-15 flex-row align-items-center mt-2 mb-3">
                                        {added === false && (
                                            <>
                                                <h3 className="product-label">Số lượng :</h3>
                                                <div>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={prodState && prodState.quantity}
                                                        className="form-control"
                                                        style={{ width: 70 }}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        value={quantity}
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <div
                                            className={
                                                added
                                                    ? 'mt-3 d-flex gap-10 align-items-center'
                                                    : 'mt-0 d-flex gap-10 align-items-center'
                                            }
                                        >
                                            <button
                                                onClick={() => {
                                                    added ? navigate('/cart') : addCart();
                                                }}
                                                type="submit"
                                                className="button border-0"
                                            >
                                                {added ? 'Đến giỏ hàng' : 'Thêm vào giỏ hàng'}
                                            </button>
                                            <button onClick={handleMessageSubmit} className="button border-0">
                                                Chat với Shop
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="description-wrapper home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="mb-3">Mô tả sản phẩm</h3>
                            <div className="bg-white p-3">
                                <div>{prodState && parse(prodState?.description)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="review-wrapper home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 id="review" className="mb-3">
                                Đánh giá sản phẩm
                            </h3>
                            <div className="review-content">
                                <div className="review-head d-flex justify-content-between align-items-end">
                                    <div>
                                        <h4 className="mb-2">Khách hàng đánh giá</h4>
                                        <div className="d-flex gap-10 align-items-center">
                                            <StarRatings
                                                rating={prodState?.totalRating}
                                                starRatedColor="#ffd700"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="1px"
                                                name="rating"
                                            />
                                            <p className="mb-0">Dựa trên {prodState?.ratings.length} đánh giá</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="# " className="text-decoration-underline">
                                            Viết đánh giá
                                        </Link>
                                    </div>
                                </div>
                                <div className="review-form py-4">
                                    <h4>Viết đánh giá của bạn</h4>
                                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                        <div>
                                            <StarRatings
                                                rating={star}
                                                changeRating={ratingChanged}
                                                starRatedColor="#ffd700"
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="1px"
                                                name="rating"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                className="w-10 form-control"
                                                cols="30"
                                                rows="4"
                                                placeholder="Nhận xét"
                                                onChange={formik.handleChange('comment')}
                                                onBlur={formik.handleBlur('comment')}
                                                value={formik.values.comment}
                                            ></textarea>
                                            <div className="input-err text-danger">
                                                {formik.touched.comment && formik.errors.comment}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="button border-0">
                                                Đánh Giá
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="reviews">
                                    <div className="review">
                                        {prodState &&
                                            prodState?.ratings?.map((item, index) => (
                                                <div key={index} className="border-bottom mt-3">
                                                    <div className="d-flex gap-10 align-items-center">
                                                        <h6 className="mb-0">{item?.postedBy?.name}</h6>
                                                        <StarRatings
                                                            rating={item?.star}
                                                            starRatedColor="#ffd700"
                                                            numberOfStars={5}
                                                            starDimension="20px"
                                                            starSpacing="1px"
                                                            name="rating"
                                                        />
                                                    </div>
                                                    <p className="mt-3">{item?.comment}</p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-wrapper home-wrapper-2">
                <div className="container">
                    <div className="row my-3">
                        <div className="col-12">
                            <h3 className="section-heading">Sản phẩm cùng danh mục</h3>
                        </div>
                        {allProdState &&
                            allProdState
                                .filter((item) => item.category._id === prodState?.category?._id)
                                .slice(0, 6)
                                .map((item) => <ProductCard key={item?._id} item={item} />)}
                    </div>
                    <div className="row my-3">
                        <div className="col-12">
                            <h3 className="section-heading">Sản phẩm cùng thương hiệu</h3>
                        </div>
                        {allProdState &&
                            allProdState
                                .filter((item) => item.brand._id === prodState?.brand?._id)
                                .slice(0, 6)
                                .map((item) => <ProductCard key={item?._id} item={item} />)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
