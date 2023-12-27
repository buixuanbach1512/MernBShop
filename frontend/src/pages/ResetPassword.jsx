import { useState } from 'react';
import Meta from '../components/Meta';
import BreadScumb from '../components/BreadCrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    password: Yup.string().required('Chưa nhập mật khẩu'),
});

const ResetPassword = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const showPassword = () => {
        setShow(!show);
    };

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const data = {
                token,
                password: values,
            };
            dispatch(resetPassword(data));
            setTimeout(() => {
                navigate('/login');
            }, 200);
        },
    });
    return (
        <>
            <Meta title={'Làm mới mật khẩu'} />
            <BreadScumb title={'Làm mới mật khẩu'} />
            <div className="forgotPass-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Làm mới Mật Khẩu</h3>
                            <p className="text-center mt-2 mb-3">Nhập mật khẩu mới của bạn </p>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <div className="input-password">
                                        {!show ? (
                                            <span className="icon-password">
                                                <IoMdEye onClick={showPassword} />
                                            </span>
                                        ) : (
                                            <span className="icon-password">
                                                <IoMdEyeOff onClick={showPassword} />
                                            </span>
                                        )}
                                        <input
                                            type={show ? 'text' : 'password'}
                                            placeholder="Mật khẩu mới"
                                            className="form-control"
                                            onChange={formik.handleChange('password')}
                                            onBlur={formik.handleBlur('password')}
                                            value={formik.values.password}
                                        />
                                    </div>
                                    <div className="input-err text-danger">
                                        {formik.touched.password && formik.errors.password}
                                    </div>
                                </div>
                                {/* <div>
                                    <input type="text" placeholder="Xác nhận lại mật khẩu" className="form-control" />
                                </div> */}
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center flex-column align-items-center gap-15">
                                        <button className="button border-0" type="submit">
                                            Xác nhận
                                        </button>
                                        <Link className="text-dark" to={'/'}>
                                            Trở lại
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

export default ResetPassword;
