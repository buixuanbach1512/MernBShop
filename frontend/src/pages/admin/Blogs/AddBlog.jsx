import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { createBlog, resetState, updateBlog } from '../../../features/blog/blogSlice';
import { deleteImg, resetStateUpload, uploadImg } from '../../../features/upload/uploadSlice';
import handlePermission from '../../../utils/permissionService';

let schema = Yup.object().shape({
    title: Yup.string().required('Chưa nhập tiêu đề!'),
    subTitle: Yup.string().required('Chưa nhập mô tả tiêu đề'),
    description: Yup.string().required('Chưa nhập mô tả!'),
});

const AddBlog = () => {
    const permissions = handlePermission();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const blogState = useSelector((state) => state.blog);
    const uploadImgState = useSelector((state) => state?.upload?.images);
    const uploadState = useSelector((state) => state?.upload);
    useEffect(() => {
        if (blogState.isSuccess && blogState.createdBlog) {
            toast.success('Thêm blog thành công!');
        }
        if (blogState.isSuccess && blogState.updatedBlog) {
            toast.success('Cập nhật blog thành công!');
        }
        if (blogState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [blogState]);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['image', 'code-block'],
                ],
            },
        }),
        [],
    );

    const img = [];
    uploadImgState.forEach((item) => {
        img.push({
            url: item.url,
            public_id: item.public_id,
        });
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: location.state?.title || '',
            description: location.state?.description || '',
            subTitle: location.state?.subTitle || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (location.state?.id !== undefined) {
                const blogData = {
                    data: {
                        ...values,
                        images: uploadState.isSuccess ? img : location.state.images,
                    },
                    id: location.state.id,
                };
                dispatch(updateBlog(blogData));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(resetStateUpload());
                    navigate('/admin/blogs');
                }, 300);
            } else {
                const data = {
                    ...values,
                    images: img,
                };
                dispatch(createBlog(data));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(resetStateUpload());
                    navigate('/admin/blogs');
                }, 300);
            }
        },
    });
    return permissions.indexOf('add-blog') !== -1 ? (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{location.state?.id !== undefined ? 'Sửa' : 'Thêm'} bài viết</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className="mt-3">
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            onChange={formik.handleChange('title')}
                            onBlur={formik.handleBlur('title')}
                            value={formik.values.title}
                            placeholder="Nhập tiêu đề ..."
                        />
                        <label className="label-input" htmlFor="title">
                            Nhập tiêu đề ...
                        </label>
                        <div className="error">{formik.touched.title && formik.errors.title}</div>
                    </div>
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="subTitle"
                            className="form-control"
                            onChange={formik.handleChange('subTitle')}
                            onBlur={formik.handleBlur('subTitle')}
                            value={formik.values.subTitle}
                            placeholder="Nhập mô tả tiêu đề ..."
                        />
                        <label className="label-input" htmlFor="subTitle">
                            Nhập mô tả tiêu đề ...
                        </label>
                        <div className="error">{formik.touched.subTitle && formik.errors.subTitle}</div>
                    </div>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        className="mt-3"
                        onChange={formik.handleChange('description')}
                        value={formik.values.description}
                    />
                    {location.state?.id && (
                        <div className="mt-3">
                            <p>Ảnh blog hiện tại:</p>
                            <div className="images d-flex flex-wrap gap-3 mt-3">
                                {location.state.images.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={item.url} alt="img-blogs" width={100} height={100} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="bg-primary border-1 p-3 text-white text-center mt-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="mb-0">Kéo thả một số file vào đây hoặc click để chọn file</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="images d-flex flex-wrap gap-3">
                        {img.map((item, index) => {
                            return (
                                <div className="position-relative" key={index}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(item.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: '2%', right: '2%' }}
                                    ></button>
                                    <img src={item.url} alt="img-product" width={100} height={100} />
                                </div>
                            );
                        })}
                    </div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {location.state?.id !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default AddBlog;
