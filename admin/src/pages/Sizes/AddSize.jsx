import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSize, getASize, resetState, updateSize } from '../../features/size/sizeSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên size!'),
});

const AddSize = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const sizeId = location.pathname.split('/')[3];
    const sizeState = useSelector((state) => state.size);
    const aSizeState = useSelector((state) => state.size.getSize);
    useEffect(() => {
        if (sizeState.isSuccess && sizeState.createdSize) {
            toast.success('Thêm size thành công!');
        }
        if (sizeState.isSuccess && sizeState.updatedSize) {
            toast.success('Cập nhật size thành công!');
        }
        if (sizeState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [sizeState]);
    useEffect(() => {
        if (sizeId !== undefined) {
            dispatch(getASize(sizeId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, sizeId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: aSizeState?.name || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (sizeId !== undefined) {
                const data = {
                    id: sizeId,
                    sizeData: values,
                };
                dispatch(updateSize(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/sizes');
                }, 1000);
            } else {
                dispatch(createSize(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/sizes');
                }, 200);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{sizeId !== undefined ? 'Sửa' : 'Thêm'} size</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên size ..."
                        />
                        <label className="label-input" htmlFor="name">
                            Nhập tên size ...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {sizeId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSize;
