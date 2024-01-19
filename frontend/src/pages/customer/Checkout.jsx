import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { applyCoupon, createOrder, emptyCart, getCart } from '../../features/auth/authSlice';
import Paypal from '../../components/customer/Paypal';
import Confetticp from '../../components/customer/Confetticp';
import { paymentVNPay } from '../../features/order/orderSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên !!'),
    address: Yup.string().required('Chưa nhập địa chỉ !!'),
    mobile: Yup.string().required('Chưa nhập số điện thoại !!'),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [payment, setPayment] = useState(false);
    const [checkedCOD, setCheckedCOD] = useState(false);
    const [couponData, setCouponData] = useState(null);
    const [apply, setApply] = useState(false);
    const [checkedPayPal, setCheckedPayPal] = useState(false);
    const [checkedVNPay, setCheckedVNPay] = useState(false);
    const cartState = useSelector((state) => state.auth.cart);
    const userState = useSelector((state) => state.auth.user);
    const couponState = useSelector((state) => state.auth.totalPriceAfterDiscount);
    const VNPayUrl = useSelector((state) => state.order.paymentVNPay);
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    useEffect(() => {
        let sum = 0;
        if (cartState) {
            for (let i = 0; i < cartState.length; i++) {
                sum = sum + Number(cartState[i].price * cartState[i].quantity);
                setTotalPrice(sum);
            }
        }
    }, [cartState]);
    useEffect(() => {
        let items = [];
        for (let i = 0; i < cartState.length; i++) {
            items.push({
                product: cartState[i].prodId._id,
                color: cartState[i].color._id,
                quantity: cartState[i].quantity,
                price: cartState[i].price * cartState[i].quantity,
            });
        }
        setOrderItems(items);
    }, [cartState]);
    const formik = useFormik({
        initialValues: {
            name: userState?.name || '',
            address: userState?.address || '',
            mobile: userState?.mobile || '',
            other: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setShippingInfo(values);
            setPayment(true);
        },
    });
    const handleCheckCOD = () => {
        setCheckedCOD(!checkedCOD);
    };
    const handleCheckPayPal = () => {
        setCheckedPayPal(!checkedPayPal);
    };
    const handleCheckVNPay = () => {
        setCheckedVNPay(!checkedVNPay);
    };
    const handleChange = (e) => {
        setCouponData(e.target.value);
    };
    const handleApply = () => {
        dispatch(applyCoupon(couponData));
        setApply(true);
    };
    const handleCancel = () => {
        setApply(false);
    };
    const placeOrder = () => {
        dispatch(
            createOrder({
                shippingInfo,
                orderItems,
                totalPrice,
                totalPriceAfterDiscount: couponState && apply ? Number(couponState) : totalPrice,
                payment: 'Thanh toán khi giao hàng',
            }),
        );
        setTimeout(() => {
            dispatch(emptyCart());
            navigate('/order');
        }, 1000);
    };
    const handleVNPay = () => {
        const orderId = Date.now();
        dispatch(
            createOrder({
                shippingInfo,
                orderItems,
                totalPrice,
                totalPriceAfterDiscount: couponState && apply ? Number(couponState) : totalPrice,
                orderId,
                payment: 'Thanh toán khi giao hàng',
            }),
        );
        setTimeout(() => {
            dispatch(emptyCart());
        }, 200);
        const data = {
            amount: couponState && apply ? Number(couponState) : totalPrice,
            orderId,
            bankCode: 'VNBANK',
        };
        dispatch(paymentVNPay(data));
    };
    useEffect(() => {
        if (VNPayUrl) {
            window.location.href = VNPayUrl;
        }
    }, [VNPayUrl]);
    return (
        <>
            <Meta title={'Check Out'} />
            <BreadCrumb title="Check Out" />
            <section className="checkout-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        {isSuccess && <Confetticp />}
                        <div className="col-7">
                            <h3 className="website-name">B-SHOP</h3>
                            <nav aria-label="breadcrumb" className="py-3">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className="ck-link" to="/">
                                            Giỏ hàng
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Check out
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Vận chuyển
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Thanh toán
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="title">Thông tin liên lạc</h4>
                            <p className="user-details">
                                {userState?.name} ({userState?.email})
                            </p>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-wrap gap-15 justify-content-between border-bottom py-3"
                            >
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Họ tên"
                                        className="form-control"
                                        onChange={formik.handleChange('name')}
                                        onBlur={formik.handleBlur('name')}
                                        value={formik.values.name}
                                    />
                                    <div className="input-err ms-2 my-1 text-danger">
                                        {formik.touched.name && formik.errors.name}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        className="form-control"
                                        onChange={formik.handleChange('address')}
                                        onBlur={formik.handleBlur('address')}
                                        value={formik.values.address}
                                    />
                                    <div className="input-err ms-2 my-1 text-danger">
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ khác (Nếu có)"
                                        className="form-control"
                                        onChange={formik.handleChange('other')}
                                        value={formik.values.other}
                                    />
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại liên lạc"
                                        className="form-control"
                                        onChange={formik.handleChange('mobile')}
                                        onBlur={formik.handleBlur('mobile')}
                                        value={formik.values.mobile}
                                    />
                                    <div className="input-err ms-2 my-1 text-danger">
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link className="ck-link d-flex gap-10 align-align-items-center" to="/cart">
                                            <IoMdArrowBack />
                                            Trở về giỏ hàng
                                        </Link>
                                        {!payment && (
                                            <button type="submit" className="button border-0">
                                                Tiếp tục mua sắm
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                            {payment && (
                                <div className="py-4">
                                    {apply ? (
                                        <div className=" d-flex gap-10 mb-3">
                                            <input
                                                type="text"
                                                className=" form-control"
                                                placeholder="Nhập mã giảm giá"
                                                value={couponData}
                                                readOnly
                                            />
                                            <button type="button" className="btn btn-success" onClick={handleCancel}>
                                                Hủy
                                            </button>
                                        </div>
                                    ) : (
                                        <div className=" d-flex gap-10 mb-3">
                                            <input
                                                type="text"
                                                className=" form-control"
                                                placeholder="Nhập mã giảm giá"
                                                onChange={handleChange}
                                            />
                                            <button type="button" className="btn btn-success" onClick={handleApply}>
                                                OK
                                            </button>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="title">Phương thức thanh toán</h4>
                                        <div className="row mt-5">
                                            <div className="col-12 mb-3 border-bottom">
                                                <div className=" d-flex align-items-center gap-5 mb-3 ">
                                                    <input
                                                        type="checkbox"
                                                        id="payment-checkbox1"
                                                        onClick={handleCheckCOD}
                                                    />
                                                    <label htmlFor="payment-checkbox1">
                                                        COD - Thanh toán khi giao hàng
                                                    </label>
                                                </div>

                                                {checkedCOD && (
                                                    <button
                                                        type="button"
                                                        className=" button w-100 p-4 rounded-3 border-0 mb-2"
                                                        onClick={() => placeOrder()}
                                                    >
                                                        Đặt hàng
                                                    </button>
                                                )}
                                            </div>
                                            <div className="col-12 border-bottom">
                                                <div className=" d-flex align-items-center gap-5 mb-3">
                                                    <input
                                                        type="checkbox"
                                                        id="payment-checkbox2"
                                                        onClick={handleCheckPayPal}
                                                    />
                                                    <label htmlFor="payment-checkbox2">Thanh toán qua PayPal</label>
                                                </div>
                                                {checkedPayPal && (
                                                    <Paypal
                                                        setIsSuccess={setIsSuccess}
                                                        payload={{
                                                            shippingInfo,
                                                            orderItems,
                                                            totalPrice,
                                                            totalPriceAfterDiscount: totalPrice,
                                                        }}
                                                        amount={Math.round(totalPrice / 23500)}
                                                    />
                                                )}
                                            </div>
                                            <div className="col-12 border-bottom">
                                                <div className=" d-flex align-items-center gap-5 my-3">
                                                    <input
                                                        type="checkbox"
                                                        id="payment-checkbox3"
                                                        onClick={handleCheckVNPay}
                                                    />
                                                    <label htmlFor="payment-checkbox3">Thanh toán qua VNPay</label>
                                                </div>
                                                {checkedVNPay && (
                                                    <button
                                                        type="button"
                                                        className=" button w-100 p-4 rounded-3 border-0 mb-2"
                                                        onClick={handleVNPay}
                                                    >
                                                        Thanh toán qua VNPay
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-5">
                            <div className="border-bottom py-4">
                                {cartState &&
                                    cartState.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex mb-4 gap-30 align-items-center justify-content-between"
                                        >
                                            <div className="d-flex gap-10">
                                                <div className=" position-relative">
                                                    <span
                                                        style={{ top: -5, right: 2 }}
                                                        className="badge bg-secondary text-white rounded-circle position-absolute"
                                                    >
                                                        {item?.quantity}
                                                    </span>
                                                    <img
                                                        className="img-fluid"
                                                        width={50}
                                                        src={item.prodId.images[0].url}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="title">{item.prodId.name}</h5>

                                                    <ul className="colors ps-0">
                                                        <li style={{ background: item.color.code }}></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="">
                                                <h5>
                                                    {(item.price * item.quantity).toLocaleString('vi')}
                                                    <sup>đ</sup>
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="border-bottom py-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>Tổng đơn hàng</p>
                                    <p>
                                        {totalPrice ? totalPrice.toLocaleString('vi') : 0}
                                        <sup>đ</sup>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0">Vận chuyển</p>
                                    <p className="mb-0">Miễn phí</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center py-4">
                                <h4>Tổng tiền</h4>
                                {apply ? (
                                    <h5 className="total-price">
                                        <del>{couponState ? totalPrice.toLocaleString('vi') : ''}</del>{' '}
                                        {couponState
                                            ? Number(couponState).toLocaleString('vi')
                                            : (totalPrice + 10000).toLocaleString('vi')}
                                        <sup>đ</sup>
                                    </h5>
                                ) : (
                                    <h5 className="total-price">
                                        {totalPrice ? totalPrice.toLocaleString('vi') : 0}
                                        <sup>đ</sup>
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
