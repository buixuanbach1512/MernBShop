import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import { getUserCoupon } from '../features/auth/authSlice';

const MyCoupon = () => {
    const dispatch = useDispatch();
    const couponState = useSelector((state) => state?.auth?.coupons);
    useEffect(() => {
        dispatch(getUserCoupon());
    }, [dispatch]);
    return (
        <>
            <Meta title={'Phiếu mua hàng của bạn'} />
            <BreadCrumb title="Phiếu mua hàng của bạn" />
            <div className="order-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row py-3 table-title">
                                <div className="col-4">
                                    <h5>Phiếu mua hàng</h5>
                                </div>
                                <div className="col-4">
                                    <h5>Mã giảm giá</h5>
                                </div>
                                <div className="col-4">
                                    <h5>Ngày hết hạn</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            {couponState?.coupon?.length === 0 && (
                                <div className="py-5">
                                    <h2 className="text-center text-secondary">Chưa có phiếu nào!!</h2>
                                </div>
                            )}
                            {couponState &&
                                couponState?.coupon?.map((item, index) => (
                                    <div key={index} className="row table-data">
                                        <div className="col-4">
                                            <p className="order-data">{item?.name}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="order-data">{item?.code}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="order-data">{moment(item?.expiry).format('DD/MM/YYYY')}</p>
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

export default MyCoupon;
