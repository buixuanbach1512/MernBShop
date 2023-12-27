import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBrands, getABrand, resetState, updateBrand } from '../../features/brand/brandSlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên thương hiệu!'),
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const brandId = location.pathname.split('/')[3];
    const brandState = useSelector((state) => state.brand);
    const aBrandState = useSelector((state) => state.brand.getBrand);
    useEffect(() => {
        if (brandState.isSuccess && brandState.createdBrands) {
            toast.success('Thêm thương hiệu thành công!');
        }
        if (brandState.isSuccess && brandState.updatedBrand) {
            toast.success('Cập nhật thương hiệu thành công!');
        }
        if (brandState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [brandState]);
    useEffect(() => {
        if (brandId !== undefined) {
            dispatch(getABrand(brandId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, brandId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: aBrandState?.name || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (brandId !== undefined) {
                const data = {
                    id: brandId,
                    brandData: values,
                };
                dispatch(updateBrand(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/brands');
                }, 1000);
            } else {
                dispatch(createBrands(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/brands');
                }, 200);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{brandId !== undefined ? 'Sửa' : 'Thêm'} thương hiệu</h3>
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
                            placeholder="Nhập tên thương hiệu ..."
                        />
                        <label className="label-input" htmlFor="name">
                            Nhập tên thương hiệu ...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {brandId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
