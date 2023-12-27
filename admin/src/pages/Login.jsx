import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let schema = Yup.object().shape({
        email: Yup.string().email('Không phải là email!').required('Chưa nhập email!'),
        password: Yup.string().required('Chưa nhập mật khẩu!'),
    });
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
    const authState = useSelector((state) => state.auth);
    const { user, isLoading, isError, isSuccess, message } = authState;
    useEffect(() => {
        if (user !== null || isSuccess) {
            navigate('admin');
            navigate(0);
        } else {
            navigate('');
        }
    }, [user, isLoading, isError, isSuccess, navigate]);
    return (
        <div className="py-5" style={{ background: '#1677ff', minHeight: '100vh' }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Đăng Nhập</h3>
                <p className="text-center">Người dùng đăng nhập để tiếp tục</p>
                <div className="text-center text-danger error">
                    {message.message === 'Rejected' ? 'Bạn Không có quyền Admin' : ''}
                </div>
                <form onSubmit={formik.handleSubmit} action="">
                    <CustomInput
                        type="text"
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
                        label="Password"
                        id="password"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div className=" text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="mb-3 mt-3 text-end">
                        <Link to="/forgot-password" className="text-dark text-decoration-none">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100"
                        style={{ background: '#1677ff' }}
                        type="submit"
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
