import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userOrder } from '../../features/auth/authSlice';
import moment from 'moment';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.orders);
    useEffect(() => {
        dispatch(userOrder());
    }, [dispatch]);

    const orders =
        orderState &&
        orderState.filter(
            (value) =>
                value.orderStatus !== 'Chờ duyệt' &&
                value.orderStatus !== 'Đã duyệt đơn hàng' &&
                value.orderStatus !== 'Đang vận chuyển' &&
                value.orderStatus !== 'Đang giao hàng',
        );

    return (
        <>
            <Meta title={'Lịch sử mua hàng'} />
            <BreadCrumb title="Lịch sử mua hàng" />
            <div className="order-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {orders?.length === 0 && (
                                <div className="py-5">
                                    <h2 className="text-center text-secondary">Chưa có đơn hàng nào!!</h2>
                                </div>
                            )}
                            {orders &&
                                orders.map((item, index) => (
                                    <div key={index} className="bg-white rounded-3 mb-4">
                                        <div className="d-flex justify-content-between p-3 bg-gray">
                                            <div className="d-flex gap-30">
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
                                        <div className="mx-4 mb-3">
                                            <div className="py-3">
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
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderHistory;
