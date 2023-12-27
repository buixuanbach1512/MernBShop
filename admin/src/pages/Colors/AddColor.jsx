import { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createColors, getAColor, resetState, updateColor } from '../../features/color/colorSlice';

const AddColor = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const colorId = location.pathname.split('/')[3];
    const colorState = useSelector((state) => state.color);
    const aColorState = useSelector((state) => state.color.getColor);
    useEffect(() => {
        if (colorState.isSuccess && colorState.createdColor) {
            toast.success('Thêm màu thành công!');
        }
        if (colorState.isSuccess && colorState.updatedColor) {
            toast.success('Cập nhật màu thành công!');
        }
        if (colorState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [colorState]);
    useEffect(() => {
        if (colorId !== undefined) {
            dispatch(getAColor(colorId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, colorId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: aColorState?.name || '',
            code: aColorState?.code || '#333'
        },
        onSubmit: (values) => {
            if (colorId !== undefined) {
                const data = {
                    id: colorId,
                    colorData: values,
                };
                dispatch(updateColor(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/colors');
                }, 1000);
            } else {
                dispatch(createColors(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/colors');
                }, 200);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{colorId !== undefined ? 'Sửa' : 'Thêm'} màu sắc</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mt-3'>
                        <input
                            type="text"
                            id="name1"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên màu ..."
                        />
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="mt-3 cp_wrapper">
                        <input
                            type="color"
                            className="form-control"
                            onChange={formik.handleChange('code')}
                            onBlur={formik.handleBlur('code')}
                            value={formik.values.code}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {colorId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddColor;
