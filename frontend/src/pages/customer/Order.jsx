import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userOrder } from '../../features/auth/authSlice';
import moment from 'moment';
import { getAllProduct } from '../../features/product/productSlice';
import { resetState, updateOrder } from '../../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderState = useSelector((state) => state?.auth?.orders);
    const productState = useSelector((state) => state?.product?.products);
    useEffect(() => {
        dispatch(userOrder());
        dispatch(getAllProduct());
    }, [dispatch]);
    const handleUpdate = (id) => {
        const data = {
            id,
            status: 'Hủy',
        };
        dispatch(updateOrder(data));
        setTimeout(() => {
            dispatch(resetState());
            dispatch(userOrder());
        }, 200);
    };
    const handleClick = (data) => {
        navigate(`/product/${data.slug}/${data._id}`);
    };
    const orders = orderState && orderState.filter((value) => value.orderStatus !== 'Hủy');
    return (
        <>
            <Meta title={'Đơn hàng của bạn'} />
            <BreadCrumb title="Đơn hàng của bạn" />
            <div className="order-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            {orders?.length === 0 && (
                                <div className="py-5">
                                    <h2 className="text-center text-secondary">Chưa có đơn hàng nào!!</h2>
                                </div>
                            )}
                            {orders &&
                                orders.map((item, index) => (
                                    <div key={index} className="bg-white rounded-3 mb-4">
                                        <div className="d-flex justify-content-between p-3 bg-gray">
                                            <div className="d-flex gap-15">
                                                <div>
                                                    <h5>Ngày đặt hàng</h5>
                                                    <p className="mb-0">
                                                        {moment(item.orderedAt).format('hh:mm:ss DD-MM-YYYY')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h5>Tổng tiền</h5>
                                                    <div>
                                                        {item.totalPriceAfterDiscount.toLocaleString('vi')}
                                                        <sup>đ</sup>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5>Địa chỉ giao hàng</h5>
                                                    <p className="mb-0">{item.shippingInfo.address}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h6>Mã đơn hàng: {item._id}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mx-4 mb-3">
                                            <div>
                                                <div className="my-4">
                                                    <h5>Trạng thái: {item.orderStatus}</h5>
                                                </div>
                                                {item.orderItems.map((i, key) => (
                                                    <div key={key} className="d-flex gap-15 mb-3">
                                                        <img
                                                            src={i.product.images[0].url}
                                                            className="img-fluid"
                                                            width={100}
                                                            alt="img"
                                                        />
                                                        <div>
                                                            <h5>{i.product.name}</h5>
                                                            <p>Số lượng: {i.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex flex-column gap-5 my-4">
                                                <button
                                                    onClick={() => handleUpdate(item._id)}
                                                    className="border-0 px-5 py-3"
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                                <button className="border-0 px-5 py-3">Trả hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="col-3">
                            <div className="bg-white border p-3 rounded-3">
                                <div>
                                    <h5>Sản phẩm nổi bật</h5>
                                </div>
                                {productState &&
                                    productState
                                        .filter((value) => value.tags === 'Sản phẩm nổi bật')
                                        .slice(0, 10)
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="my-4 cursor-poiner"
                                                onClick={() => handleClick(item)}
                                            >
                                                <div className="d-flex gap-10 align-items-center">
                                                    <img
                                                        src={item.images[0].url}
                                                        alt=""
                                                        className="img-fluid"
                                                        width={70}
                                                    />
                                                    <div className="prodOrder">
                                                        <h5 className="title">{item.name}</h5>
                                                        <h6 className="text-danger">
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
                </div>
            </div>
        </>
    );
};

export default Order;
