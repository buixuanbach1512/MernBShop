import { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    createPermission,
    getAPermission,
    resetState,
    updatePermission,
} from '../../../features/permission/permissionSlice';
import handlePermission from '../../../utils/permissionService';

const AddPermission = () => {
    const permissions = handlePermission();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const permissionId = location.pathname.split('/')[3];
    const permissionState = useSelector((state) => state.permission);
    const aPermissionState = useSelector((state) => state.permission.getPermission);
    useEffect(() => {
        if (permissionState.isSuccess && permissionState.createdPermission) {
            toast.success('Thêm quyền thành công!');
        }
        if (permissionState.isSuccess && permissionState.updatedPermission) {
            toast.success('Cập nhật quyền thành công!');
        }
        if (permissionState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [permissionState]);
    useEffect(() => {
        if (permissionId !== undefined) {
            dispatch(getAPermission(permissionId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, permissionId]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: aPermissionState?.name || '',
            code: aPermissionState?.code || '',
        },
        onSubmit: (values) => {
            if (permissionId !== undefined) {
                const data = {
                    id: permissionId,
                    permissionData: values,
                };
                dispatch(updatePermission(data));
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/permissions');
                }, 1000);
            } else {
                dispatch(createPermission(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/permissions');
                }, 200);
            }
        },
    });
    return permissions.indexOf('add-permission') !== -1 ? (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{permissionId !== undefined ? 'Sửa' : 'Thêm'} quyền</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-3">
                        <input
                            type="text"
                            id="name1"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên quyền ..."
                        />
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange('code')}
                            onBlur={formik.handleBlur('code')}
                            value={formik.values.code}
                            placeholder="Nhập mã quyền ..."
                        />
                    </div>
                    <div className="error">{formik.touched.code && formik.errors.code}</div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {permissionId !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default AddPermission;
