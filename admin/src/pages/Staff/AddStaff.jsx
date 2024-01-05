import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllRole } from '../../features/role/roleSlice';
import { getUser, resetState, updateUserById } from '../../features/customer/customerSlice';
import { register } from '../../features/auth/authSlice';
import { getDistrict, getProvince } from '../../features/province/provinceSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên danh mục!'),
    email: Yup.string().email('Không phải email').required('Chưa nhập tên danh mục!'),
    password: Yup.string().required('Chưa nhập mật khẩu!'),
    role: Yup.string().required('Chưa nhập chức vụ!'),
    mobile: Yup.string().required('Chưa nhập chức vụ!'),
});

const AddStaff = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [home, setHome] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.pathname.split('/')[3];
    const authState = useSelector((state) => state.auth);
    const allRoleState = useSelector((state) => state.role.roles);
    const getAUser = useSelector((state) => state.customer.getAUser);
    const provinceState = useSelector((state) => state.province.provinces);
    const districtState = useSelector((state) => state.province.districts);
    useEffect(() => {
        if (authState.isSuccess && authState.createdCategory) {
            toast.success('Thêm nhân viên thành công!');
        }
        if (authState.isSuccess && authState.updatedCat) {
            toast.success('Cập nhật nhân viên thành công!');
        }
        if (authState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [authState]);
    useEffect(() => {
        dispatch(getAllRole());
        dispatch(getProvince());
        if (userId) {
            dispatch(getUser(userId));
        }
        if (province !== null) {
            dispatch(getDistrict(province));
        }
    }, [dispatch, province, userId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: getAUser?.name || '',
            email: getAUser?.email || '',
            password: getAUser?.password || '',
            mobile: getAUser?.mobile || '',
            address: getAUser?.address || '',
            type: getAUser?.type || '',
            role: getAUser?.role || '',
            isBlocked: getAUser?.isBlocked || true,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (userId) {
                const data = {
                    id: userId,
                    userData: values,
                };
                dispatch(updateUserById(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/staff');
                }, 200);
            } else {
                dispatch(register(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/staff');
                }, 200);
            }
        },
    });
    useEffect(() => {
        if (province && district && home) {
            formik.values.address = `${home}, ${district}, ${
                province ? provinceState?.results?.find((item) => item.province_id === province)?.province_name : ''
            }`;
        }
    }, [formik, province, district, home, provinceState]);

    return permissions.indexOf('add-category') !== -1 ? (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{userId ? 'Sửa' : 'Thêm'} nhân viên</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mt-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Họ và tên..."
                            value={formik.values.name}
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                        />
                        <label className="label-input" htmlFor="name">
                            Họ và tên...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="form-floating mt-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email..."
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                        />
                        <label className="label-input" htmlFor="email">
                            Email...
                        </label>
                        <div className="error">{formik.touched.email && formik.errors.email}</div>
                    </div>
                    {userId ? (
                        ''
                    ) : (
                        <div className="form-floating mt-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Mật khẩu..."
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                            />
                            <label className="label-input" htmlFor="password">
                                Mật khẩu...
                            </label>
                            <div className="error">{formik.touched.password && formik.errors.password}</div>
                        </div>
                    )}
                    <div className="form-floating mt-3">
                        <input
                            type="number"
                            className="form-control"
                            name="mobile"
                            placeholder="Số điện thoại..."
                            id="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange('mobile')}
                            onBlur={formik.handleBlur('mobile')}
                        />
                        <label className="label-input" htmlFor="mobile">
                            Số điện thoại...
                        </label>
                        <div className="error">{formik.touched.mobile && formik.errors.mobile}</div>
                    </div>
                    <div className="mt-3">
                        <select
                            className="form-control py-3 mt-3"
                            name="role"
                            onChange={formik.handleChange('role')}
                            value={formik.values.role}
                        >
                            <option value="">Chọn chức vụ</option>
                            {allRoleState?.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {userId ? (
                        <div className="form-floating mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="Địa chỉ..."
                                id="address"
                                value={formik.values.address}
                                onChange={formik.handleChange('address')}
                                onBlur={formik.handleBlur('address')}
                            />
                            <label className="label-input" htmlFor="address">
                                Địa chỉ...
                            </label>
                            <div className="error">{formik.touched.address && formik.errors.address}</div>
                        </div>
                    ) : (
                        <div className="mt-3 d-flex gap-10">
                            <div className=" flex-grow-2">
                                <select
                                    className=" form-control form-select"
                                    onChange={(e) => setProvince(e.target.value)}
                                    value={province}
                                >
                                    <option value="">Tỉnh / Thành phố</option>
                                    {provinceState?.results?.map((item, index) => (
                                        <option key={index} value={item.province_id}>
                                            {item.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className=" flex-grow-2">
                                <select
                                    className=" form-control form-select"
                                    onChange={(e) => setDistrict(e.target.value)}
                                    value={district}
                                >
                                    <option value="">Quận / Huyện</option>
                                    {districtState?.results?.map((item, index) => (
                                        <option key={index} value={item.district_name}>
                                            {item.district_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className=" flex-grow-1">
                                <input
                                    type="text"
                                    onChange={(e) => setHome(e.target.value)}
                                    value={home}
                                    placeholder="Số nhà"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {userId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default AddStaff;
