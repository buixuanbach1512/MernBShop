import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadScumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    password: Yup.string().required('Chưa nhập mật khẩu'),
});

const ChangePassword = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const showPassword = () => {
        setShow(!show);
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (values) {
                dispatch(changePassword(values));
                formik.resetForm();
            }
        },
    });
    useEffect(() => {
        if (authState.changedPassword && authState.isSuccess) {
            navigate('/');
        }
    }, [authState, navigate]);
    return (
        <>
            <Meta title={'Đổi mật khẩu'} />
            <BreadScumb title={'Đổi mật khẩu'} />
            <div className="forgotPass-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Đổi Mật Khẩu</h3>
                            <p className="text-center mt-2 mb-3">Nhập mật khẩu mới của bạn </p>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <div className="input-password mb-3">
                                        {!show ? (
                                            <span className="icon-password">
                                                <IoMdEyeOff onClick={showPassword} />
                                            </span>
                                        ) : (
                                            <span className="icon-password">
                                                <IoMdEye onClick={showPassword} />
                                            </span>
                                        )}
                                        <input
                                            type={show ? 'text' : 'password'}
                                            placeholder="Mật khẩu cũ"
                                            className="form-control"
                                            onChange={formik.handleChange('password')}
                                            onBlur={formik.handleBlur('password')}
                                            value={formik.values.password}
                                        />
                                        <div className="input-err text-danger">
                                            {formik.touched.password && formik.errors.password}
                                        </div>
                                    </div>
                                    <div className="input-password">
                                        {!show ? (
                                            <span className="icon-password">
                                                <IoMdEyeOff onClick={showPassword} />
                                            </span>
                                        ) : (
                                            <span className="icon-password">
                                                <IoMdEye onClick={showPassword} />
                                            </span>
                                        )}
                                        <input
                                            type={show ? 'text' : 'password'}
                                            placeholder="Mật khẩu mới"
                                            className="form-control"
                                            onChange={formik.handleChange('newPassword')}
                                            onBlur={formik.handleBlur('newPassword')}
                                            value={formik.values.newPassword}
                                        />
                                        <div className="input-err text-danger">
                                            {formik.touched.newPassword && formik.errors.newPassword}
                                        </div>
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

export default ChangePassword;
