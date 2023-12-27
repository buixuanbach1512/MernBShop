import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCart, removeProdCart, updateCart } from '../features/auth/authSlice';
const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.auth.cart);
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    useEffect(() => {
        if (cartData !== null) {
            if (cartData.quantity !== '' && cartData.quantity <= 10) {
                dispatch(updateCart(cartData));
                setTimeout(() => {
                    dispatch(getCart());
                }, 200);
            }
        }
    }, [cartData, dispatch]);
    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartState.length; i++) {
            sum = sum + Number(cartState[i].price * cartState[i].quantity);
            setTotalPrice(sum);
        }
        if (cartState.length === 0) {
            setTotalPrice(0);
        }
    }, [cartState]);
    const removePCart = (id) => {
        dispatch(removeProdCart(id));
        setTimeout(() => {
            dispatch(getCart());
        }, 200);
    };

    return (
        <>
            <Meta title={'Giỏ hàng'} />
            <BreadCrumb title="Giỏ hàng" />
            <section className="cart-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-head py-3 d-flex justify-content-between align-items-center">
                                <h4 className="cart-col-1">Sản phẩm</h4>
                                <h4 className="cart-col-2">Giá</h4>
                                <h4 className="cart-col-3">Số lượng</h4>
                                <h4 className="cart-col-4">Tổng tiền</h4>
                            </div>
                            {cartState?.length === 0 && (
                                <div className="py-5">
                                    <h2 className="text-center text-secondary">Giỏ hàng trống!!</h2>
                                </div>
                            )}
                            {cartState &&
                                cartState?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                                    >
                                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                                            <div className="w-25">
                                                <img
                                                    className="img-fluid"
                                                    src={item?.prodId.images[0].url}
                                                    alt="imageProd"
                                                />
                                            </div>
                                            <div className="w-75">
                                                <p>{item?.prodId.name}</p>
                                                <p>Size: M</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <p>Màu sắc: </p>
                                                    <ul className="colors ps-0">
                                                        <li style={{ background: item?.color.code }}></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-col-2">
                                            <h5 className="price">
                                                {item?.price.toLocaleString('vi')}
                                                <sup>đ</sup>
                                            </h5>
                                        </div>
                                        <div className="cart-col-3 d-flex align-items-center gap-15">
                                            <div className="">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min={1}
                                                    max={10}
                                                    maxLength={2}
                                                    value={item?.quantity}
                                                    onChange={(e) =>
                                                        setCartData({ id: item?._id, quantity: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => removePCart(item._id)}
                                                    className="bg-transparent border-0"
                                                >
                                                    <FaRegTrashCan className="text-danger fs-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-col-4">
                                            <h5 className="price">
                                                {(item?.price * item?.quantity).toLocaleString('vi')}
                                                <sup>đ</sup>
                                            </h5>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="col-12 py-2 mt-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Link to="/store" className="button">
                                        Tiếp tục mua hàng
                                    </Link>
                                </div>
                                <div className="d-flex flex-column align-items-end">
                                    <h4>
                                        Tổng tiền giỏ hàng: {totalPrice.toLocaleString('vi')}
                                        <sup>đ</sup>
                                    </h4>
                                    <p>Thuế và phí vận chuyển được tính khi thanh toán</p>
                                    <Link to="/checkout" className="button">
                                        Check out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
