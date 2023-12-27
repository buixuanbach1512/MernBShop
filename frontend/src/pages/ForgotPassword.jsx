import Meta from '../components/Meta';
import BreadScumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassToken } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    email: Yup.string().email('Không phải là email').required('Chưa nhập email'),
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(forgotPassToken(values));
        },
    });
    return (
        <>
            <Meta title={'Quên Mật Khẩu'} />
            <BreadScumb title={'Quên Mật Khẩu'} />
            <div className="forgotPass-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Đặt Lại Mật Khẩu</h3>
                            <p className="text-center mt-2 mb-3">Chúng tôi sẽ gửi mật khẩu mới của bạn qua email</p>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        onChange={formik.handleChange('email')}
                                        onBlur={formik.handleBlur('email')}
                                        value={formik.values.email}
                                    />
                                    <div className="input-err text-danger">
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                </div>
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-15">
                                        <button className="button border-0" type="submit">
                                            Gửi
                                        </button>
                                        <Link className="text-dark" to={'/login'}>
                                            Hủy
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

export default ForgotPassword;
