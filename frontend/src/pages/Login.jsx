import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    email: Yup.string().email('Không phải là email').required('Chưa nhập email'),
    password: Yup.string().required('Chưa nhập mật khẩu'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.auth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });
    useEffect(() => {
        if (userState.user !== null && userState.isError === false) {
            navigate('/');
        }
    }, [navigate, userState]);
    return (
        <>
            <div className="login-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Đăng Nhập</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-10">
                                <div>
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
                                <div>
                                    <Link className="text-dark" to={'/forgot-password'}>
                                        Quên mật khẩu?
                                    </Link>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">
                                            Đăng Nhập
                                        </button>
                                        <Link to='/signup' className="button">
                                            Đăng Ký
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

export default Login;
