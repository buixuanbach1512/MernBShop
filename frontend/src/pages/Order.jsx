import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userOrder } from '../features/auth/authSlice';
import moment from 'moment';

const Order = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state?.auth?.orders);
    useEffect(() => {
        dispatch(userOrder());
    }, [dispatch]);
    return (
        <>
            <Meta title={'Đơn hàng của bạn'} />
            <BreadCrumb title="Đơn hàng của bạn" />
            <div className="order-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row py-3 table-title">
                                <div className="col-3">
                                    <h5>Mã đơn hàng</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Ngày đặt</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Tổng tiền (đã giảm giá)</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Trạng thái đơn hàng</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            {orderState?.length === 0 && (
                                <div className="py-5">
                                    <h2 className="text-center text-secondary">Chưa có đơn hàng nào!!</h2>
                                </div>
                            )}
                            {orderState &&
                                orderState?.map((item, index) => (
                                    <div key={index} className="row table-data">
                                        <div className="col-3">
                                            <p className="order-data">{item?._id}</p>
                                        </div>
                                        <div className="col-3">
                                            <p className="order-data">{moment(item?.orderedAt).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="col-3">
                                            <p className="order-data">
                                                {item?.totalPriceAfterDiscount.toLocaleString('vi')}
                                                <sup>đ</sup>
                                            </p>
                                        </div>
                                        <div className="col-3">
                                            <p className="order-data">{item?.orderStatus}</p>
                                        </div>
                                        <div className="col-12">
                                            <div className="row table-prod p-3">
                                                <div className="col-3">
                                                    <h6>Sản phẩm</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Số lượng</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Màu sắc</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Giá tiền</h6>
                                                </div>
                                                <div className="col-12">
                                                    {item?.orderItems?.map((i, index) => (
                                                        <div key={index} className="row p-3">
                                                            <div className="col-3 d-flex align-items-center gap-10">
                                                                <div className="w-25">
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={i?.product?.images[0]?.url}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="w-75">
                                                                    <p className=" mb-0">{i?.product?.name}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-3 d-flex align-items-center">
                                                                <p className=" mb-0">{i?.quantity}</p>
                                                            </div>
                                                            <div className="col-3 d-flex align-items-center">
                                                                <ul className="colors ps-0 mb-0">
                                                                    <li style={{ background: i?.color?.code }}></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-3 d-flex align-items-center">
                                                                <p className=" mb-0">
                                                                    {i?.price.toLocaleString('vi')}
                                                                    <sup>đ</sup>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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

export default Order;
