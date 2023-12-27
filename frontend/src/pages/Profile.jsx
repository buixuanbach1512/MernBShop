import { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập họ và tên'),
    email: Yup.string().email('Không phải email').required('Chưa nhập email'),
    address: Yup.string().required('Chưa nhập địa chỉ'),
    mobile: Yup.number().required('Chưa nhập số điện thoại'),
});

const Profile = () => {
    const [editEmail, setEditEmail] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth.user);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userState.name || '',
            email: userState.email || '',
            address: userState.address || '',
            mobile: userState.mobile || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(updateUser(values));
        },
    });
    return (
        <>
            <Meta title={'Thông tin cá nhân'} />
            <BreadCrumb title="Thông tin cá nhân" />
            <div className="profile-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            <h3>Thông tin cá nhân</h3>
                            <div className="profile-content bg-white p-3">
                                <div className=" d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        <h6>Họ và tên: {userState.name}</h6>
                                    </div>
                                    <div>
                                        <h6>Số điện thoại: {userState.mobile}</h6>
                                    </div>
                                </div>
                                <div className=" d-flex justify-content-between align-items-center mt-3">
                                    <div>
                                        <h6>Email: {userState.email}</h6>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div>
                                        <h6>Địa chỉ: {userState.address}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-7">
                            <h3 className="mb-3">Chỉnh sửa thông tin cá nhân</h3>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="text-1" className=" form-label">
                                            Họ và tên <span className=" badge text-danger fs-5 p-0">*</span>:
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="text-1"
                                            className=" form-control"
                                            onChange={formik.handleChange('name')}
                                            onBlur={formik.handleBlur('name')}
                                            value={formik.values.name}
                                        />
                                        <div className="input-err text-danger">
                                            {formik.touched.name && formik.errors.name}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {editEmail ? (
                                            <div>
                                                <label htmlFor="text-2" className=" form-label">
                                                    Email: <span className=" badge text-danger fs-5 p-0">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name=""
                                                    id="text-2"
                                                    className=" form-control"
                                                    onChange={formik.handleChange('email')}
                                                    onBlur={formik.handleBlur('email')}
                                                    value={formik.values.email}
                                                />
                                                <div className="input-err text-danger">
                                                    {formik.touched.email && formik.errors.email}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className=" d-flex gap-10">
                                                <p className=" mb-0">
                                                    Email <span className=" badge text-danger fs-5 p-0">*</span> :
                                                    {userState.email}
                                                </p>
                                                <button
                                                    onClick={() => setEditEmail(true)}
                                                    className="bg-transparent border-0 text-primary text-decoration-underline"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text-3" className=" form-label">
                                            Địa chỉ:
                                        </label>
                                        <input
                                            type="text"
                                            name=""
                                            id="text-3"
                                            className=" form-control"
                                            onChange={formik.handleChange('address')}
                                            onBlur={formik.handleBlur('address')}
                                            value={formik.values.address}
                                        />
                                        <div className="input-err text-danger">
                                            {formik.touched.address && formik.errors.address}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text-4" className=" form-label">
                                            Số điện thoại:
                                        </label>
                                        <input
                                            type="text"
                                            name=""
                                            id="text-4"
                                            className=" form-control"
                                            onChange={formik.handleChange('mobile')}
                                            onBlur={formik.handleBlur('mobile')}
                                            value={formik.values.mobile}
                                        />
                                        <div className="input-err text-danger">
                                            {formik.touched.mobile && formik.errors.mobile}
                                        </div>
                                    </div>
                                    <div className=" mt-3 d-flex justify-content-end">
                                        <button type="submit" className="button border-0">
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
