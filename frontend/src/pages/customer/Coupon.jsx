import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addCoupon, getAllCoupon } from '../../features/coupon/couponSlice';
import moment from 'moment';
import barcode from '../../assets/barcode.jpg';

const Coupon = () => {
    const dispatch = useDispatch();
    const allCouponState = useSelector((state) => state?.coupon?.coupons);
    useEffect(() => {
        dispatch(getAllCoupon());
    }, [dispatch]);
    const handleClick = (couponId) => {
        dispatch(addCoupon(couponId));
    };
    return (
        <>
            <Meta title={'Phiếu giảm giá'} />
            <BreadCrumb title="Phiếu giảm giá" />
            <div className="home-wrapper-2 py-5">
                <div className="row">
                    {allCouponState.map((item, index) => (
                        <div key={index} onClick={() => handleClick(item._id)} className=" col-4 mb-5">
                            <div className="coupon-wrapper">
                                <div className="left">
                                    <div>Enjoy your gift</div>
                                </div>
                                <div className="center">
                                    <div>
                                        <h2>{item.discount}% off</h2>
                                        <h3>Phiếu giảm giá</h3>
                                        <small>Hết hạn: {moment(item?.expiry).format('DD/MM/YYYY')}</small>
                                    </div>
                                </div>
                                <div className="right">
                                    <div>
                                        <img src={barcode} className=" img-fluid" alt="barcode" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Coupon;
