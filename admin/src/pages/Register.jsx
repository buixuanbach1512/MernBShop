import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRole } from '../features/role/roleSlice';
import { register, resetState } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập họ và tên!'),
    email: Yup.string().email('Không phải là email!').required('Chưa nhập email!'),
    password: Yup.string().required('Chưa nhập mật khẩu!'),
    mobile: Yup.string().required('Chưa nhập số điện thoại!'),
    address: Yup.string().required('Chưa nhập địa chỉ!'),
});

const Register = () => {
    const dispatch = useDispatch();
    const allRole = useSelector((state) => state.role.roles);
    useEffect(() => {
        dispatch(getAllRole());
    }, [dispatch]);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            mobile: '',
            address: '',
            type: '',
            role: '',
            isBlocked: true,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(register(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 200);
        },
    });
    return (
        <div className="py-5" style={{ background: '#1677ff', minHeight: '100vh' }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Tạo tài khoản quản trị</h3>
                <p className="text-center">Người dùng tạo tài khoản theo vị trí của mình</p>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="name"
                        label="Họ và tên"
                        val={formik.values.name}
                        onCh={formik.handleChange('name')}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name ? (
                            <div className=" text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="email"
                        name="email"
                        label="Email"
                        id="email"
                        val={formik.values.email}
                        onCh={formik.handleChange('email')}
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div className=" text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        name="password"
                        label="Mật khẩu"
                        id="password"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div className=" text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mt-3">
                        <select
                            className="form-control py-3 mt-3"
                            name="role"
                            onChange={formik.handleChange('role')}
                            value={formik.values.role}
                        >
                            <option value="">Chọn chức vụ</option>
                            {allRole?.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <CustomInput
                        type="number"
                        name="mobile"
                        label="Số điện thoại"
                        id="mobile"
                        val={formik.values.mobile}
                        onCh={formik.handleChange('mobile')}
                    />
                    <div className="error">
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div className=" text-danger">{formik.errors.mobile}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="text"
                        name="address"
                        label="Địa chỉ"
                        id="address"
                        val={formik.values.address}
                        onCh={formik.handleChange('address')}
                    />
                    <div className="error">
                        {formik.touched.address && formik.errors.address ? (
                            <div className=" text-danger">{formik.errors.address}</div>
                        ) : null}
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
                        style={{ background: '#1677ff' }}
                        type="submit"
                    >
                        Tạo tài khoản
                    </button>
                    <Link className="w-100 d-flex justify-content-end mt-3" to={'/register'}>
                        Trở lại
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
