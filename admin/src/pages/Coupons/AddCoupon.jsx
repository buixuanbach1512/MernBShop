import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCoupons, getACoupon, resetState, updateCoupon } from '../../features/coupon/couponSlice';
import moment from 'moment';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên phiếu!'),
    expiry: Yup.date().required('Chưa nhập ngày hết hạn!'),
    discount: Yup.string().required('Chưa nhập giảm giá!'),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const couponId = location.pathname.split('/')[3];
    const couponState = useSelector((state) => state.coupon);
    const aCouponState = useSelector((state) => state.coupon.getCoupon);
    useEffect(() => {
        if (couponState.isSuccess && couponState.createdCoupon) {
            toast.success('Thêm phiếu mua hàng thành công!');
        }
        if (couponState.isSuccess && couponState.updatedCoupon) {
            toast.success('Cập nhật phiếu mua hàng thành công!');
        }
        if (couponState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [couponState]);
    useEffect(() => {
        if (couponId !== undefined) {
            dispatch(getACoupon(couponId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, couponId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: aCouponState?.name || '',
            expiry: moment(aCouponState?.expiry).format('YYYY-MM-DD') || '',
            discount: aCouponState?.discount || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (couponId !== undefined) {
                const data = {
                    id: couponId,
                    couponData: values,
                };
                dispatch(updateCoupon(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/coupons');
                }, 1000);
            } else {
                dispatch(createCoupons(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/coupons');
                }, 200);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{couponId !== undefined ? 'Sửa' : 'Thêm'} Phiếu mua hàng</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên phiếu ..."
                        />
                        <label className="label-input" htmlFor="name">
                            Nhập tên phiếu ...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="mt-3 form-floating">
                        <input
                            type="date"
                            id="expiry"
                            className="form-control"
                            onChange={formik.handleChange('expiry')}
                            onBlur={formik.handleBlur('expiry')}
                            value={formik.values.expiry}
                            placeholder="Nhập ngày hết hạn ..."
                        />
                        <label className="label-input" htmlFor="expiry">
                            Nhập ngày hết hạn ...
                        </label>
                        <div className="error">{formik.touched.expiry && formik.errors.expiry}</div>
                    </div>
                    <div className="mt-3 form-floating">
                        <input
                            type="number"
                            id="discount"
                            className="form-control"
                            onChange={formik.handleChange('discount')}
                            onBlur={formik.handleBlur('discount')}
                            value={formik.values.discount}
                            placeholder="Nhập giảm giá ..."
                        />
                        <label className="label-input" htmlFor="discount">
                            Nhập giảm giá ...
                        </label>
                        <div className="error">{formik.touched.discount && formik.errors.discount}</div>
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {couponId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
