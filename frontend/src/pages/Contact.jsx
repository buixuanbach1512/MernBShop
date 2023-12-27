import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { FaHome } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { FaInfo } from 'react-icons/fa';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { postContact, resetState } from '../features/contact/contactSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên người gửi'),
    email: Yup.string().email('Không phải email').required('Chưa nhập email người gửi'),
    mobile: Yup.number().required('Chưa nhập số điện thoại'),
    message: Yup.string().required('Chưa nhập lời nhắn'),
});

const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            message: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(postContact(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 200);
        },
    });
    return (
        <>
            <Meta title={'Liên Hệ'} />
            <BreadCrumb title="Liên Hệ" />
            <div className="contact-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <iframe
                                title="B-Shop"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14900.863225388688!2d105.8308609816679!3d20.9839847404624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac43b9df7159%3A0xedf6f428a5bc9fd5!2zR2nDoXAgQsOhdCwgSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1701185071640!5m2!1svi!2s"
                                width="600"
                                height="450"
                                className="border-0 w-100"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="contact-content">
                                <div>
                                    <h3 className="contact-title mb-4">Phản hồi</h3>
                                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                        <div>
                                            <input
                                                type="text"
                                                onChange={formik.handleChange('name')}
                                                onBlur={formik.handleBlur('name')}
                                                value={formik.values.name}
                                                className="form-control"
                                                placeholder="Tên"
                                            />
                                            <div className="input-err text-danger">
                                                {formik.touched.name && formik.errors.name}
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                onChange={formik.handleChange('email')}
                                                onBlur={formik.handleBlur('email')}
                                                value={formik.values.email}
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                            <div className="input-err text-danger">
                                                {formik.touched.email && formik.errors.email}
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                onChange={formik.handleChange('mobile')}
                                                onBlur={formik.handleBlur('mobile')}
                                                value={formik.values.mobile}
                                                className="form-control"
                                                placeholder="Số điện thoại"
                                            />
                                            <div className="input-err text-danger">
                                                {formik.touched.mobile && formik.errors.mobile}
                                            </div>
                                        </div>
                                        <div>
                                            <textarea
                                                className="w-10 form-control"
                                                onChange={formik.handleChange('message')}
                                                onBlur={formik.handleBlur('message')}
                                                value={formik.values.message}
                                                cols="30"
                                                rows="4"
                                                placeholder="Lời nhắn"
                                            ></textarea>
                                            <div className="input-err text-danger">
                                                {formik.touched.message && formik.errors.message}
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className="button border-0">
                                                Gửi yêu cầu
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h3 className="contact-title mb-4">Liên hệ với chúng tôi</h3>
                                    <div>
                                        <ul className="ps-0">
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <FaHome className="fs-5" />
                                                <address className="mb-0">
                                                    38 Phan Đình Giót, Phương Liệt, Thanh Xuân, Hà Nội
                                                </address>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <FaPhoneAlt className="fs-5" />
                                                <a href="tel: +84 981736892">+84 981736892</a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <IoIosMail className="fs-5" />
                                                <a href="mailto: buixuanbach102@gmail.com">buixuanbach102@gmail.com</a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <FaInfo className="fs-5" />
                                                <p className="mb-0"> 10 giờ sáng - 9 giờ tối từ T2 - CN</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
