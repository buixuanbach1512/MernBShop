import { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import StarRatings from 'react-star-ratings';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Color from '../components/ColorList';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct, getAllProduct, rating } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { addToCart, getCart } from '../features/auth/authSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ProductImages from '../components/ProductImages';

const schema = Yup.object().shape({
    comment: Yup.string().required('Chưa viết đánh giá!!'),
});

const Product = () => {
    const user = sessionStorage.getItem('customer');
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(null);
    const [added, setAdded] = useState(false);
    const [border, setBorder] = useState(null);
    const [star, setStar] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productId = location.state._id;
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
            if (productId === getCartState[i].prodId._id) {
                setAdded(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const addCart = () => {
        if (color === null) {
            toast.error('Chưa chọn màu sản phẩm');
            return false;
        } else {
            const data = {
                productId: prodState?._id,
                quantity,
                color,
                price: prodState?.price,
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
    return (
        <>
            <Meta title={'Product'} />
            <BreadCrumb title={prodState?.name} />
            <div className="product-wrapper py-5 home-wrapper-2">
                <div className="container p-3">
                    <div className="row">
                        <ProductImages item={location.state.images} />
                        <div className="col-12 col-xl-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className="title">{prodState?.name}</h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <p className="price">
                                        {prodState?.price.toLocaleString('vi')}
                                        <sup>đ</sup>
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
                                    <div className="d-flex gap-10 flex-column my-2">
                                        <h3 className="product-label">Size :</h3>
                                        <div className="d-flex flex-wrap gap-10">
                                            {prodState?.size?.map((item, index) => (
                                                <div key={index} className="span-size">
                                                    <p className="mb-0 text-center">{item.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {added === false && (
                                        <>
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
                                                        max={prodState && prodState?.quantity}
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
                                            <button to="" className="button border-0">
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="description-wrapper py-5 home-wrapper-2">
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
            <section className="blog-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Sản Phẩm Nổi Bật</h3>
                        </div>
                        {allProdState
                            ?.filter((item) => item.tags === 'Sản phẩm nổi bật')
                            ?.map((item) => (
                                <ProductCard key={item._id} item={item} />
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
