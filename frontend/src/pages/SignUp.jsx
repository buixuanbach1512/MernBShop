import Meta from '../components/Meta';
import BreadScumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập họ tên'),
    email: Yup.string().email('Không phải là email').required('Chưa nhập email'),
    password: Yup.string().required('Chưa nhập mật khẩu'),
    mobile: Yup.number().required('Chưa nhập số điện thoại'),
    address: Yup.string().required('Chưa nhập địa chỉ'),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            mobile: '',
            address: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(register(values));
            formik.resetForm();
        },
    });
    return (
        <>
            <Meta title={'Đăng ký'} />
            <BreadScumb title={'Đăng Ký'} />
            <div className="forgotPass-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Đăng Ký</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-10">
                                <div>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange('name')}
                                        onBlur={formik.handleBlur('name')}
                                        value={formik.values.name}
                                        placeholder="Họ và tên"
                                        className="form-control"
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.name && formik.errors.name}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        onChange={formik.handleChange('email')}
                                        onBlur={formik.handleBlur('email')}
                                        value={formik.values.email}
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        onChange={formik.handleChange('password')}
                                        onBlur={formik.handleBlur('password')}
                                        value={formik.values.password}
                                        placeholder="Password"
                                        className="form-control"
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.password && formik.errors.password}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        onChange={formik.handleChange('mobile')}
                                        onBlur={formik.handleBlur('mobile')}
                                        value={formik.values.mobile}
                                        placeholder="Số điện thoại"
                                        className="form-control sign-up"
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        onChange={formik.handleChange('address')}
                                        onBlur={formik.handleBlur('address')}
                                        value={formik.values.address}
                                        placeholder="Địa chỉ"
                                        className="form-control"
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">
                                            Đăng Ký
                                        </button>
                                        <Link to={'/login'} className="button">
                                            Đăng Nhập
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
