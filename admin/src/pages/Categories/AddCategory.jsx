import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    createCategories,
    getACategory,
    getCategories,
    resetState,
    updateCategory,
} from '../../features/category/categorySlice';

const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên danh mục!'),
});

const AddCategory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const cateId = location.pathname.split('/')[3];
    const categoryState = useSelector((state) => state.category);
    const allCategoryState = useSelector((state) => state.category.categories);
    const getACatState = useSelector((state) => state.category.getACat);
    useEffect(() => {
        if (categoryState.isSuccess && categoryState.createdCategory) {
            toast.success('Thêm danh mục thành công!');
        }
        if (categoryState.isSuccess && categoryState.updatedCat) {
            toast.success('Cập nhật danh mục thành công!');
        }
        if (categoryState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [categoryState]);
    useEffect(() => {
        dispatch(getCategories());
        if (cateId !== undefined) {
            dispatch(getACategory(cateId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, cateId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: getACatState?.name || '',
            parentId: getACatState?.parentId || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (cateId !== undefined) {
                const data = {
                    id: cateId,
                    catData: values,
                };
                dispatch(updateCategory(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/categories');
                }, 1000);
            } else {
                dispatch(createCategories(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/categories');
                }, 200);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{cateId !== undefined ? 'Sửa' : 'Thêm'} danh mục</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className="mt-3">
                    <div className="mt-3">
                        <input
                            type="text"
                            id="name1"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên danh mục ..."
                        />
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="mt-3">
                        <select
                            className="form-control py-3 mt-3"
                            name="parentId"
                            onChange={formik.handleChange('parentId')}
                            value={formik.values.parentId}
                        >
                            <option value="">Chọn danh mục</option>
                            {allCategoryState.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="error">{formik.touched.parentId && formik.errors.parentId}</div>
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {cateId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
