import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { createRole, resetState, updateRole } from '../../../features/role/roleSlice';
import { getAllPermission } from '../../../features/permission/permissionSlice';
import handlePermission from '../../../utils/permissionService';

let schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên chức vụ!'),
});

const AddRole = () => {
    const permission = handlePermission();
    const location = useLocation();
    const [permissions, setPermissions] = useState(location.state?.permissions || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleState = useSelector((state) => state.role);
    const allPermissionState = useSelector((state) => state.permission.permissions);
    useEffect(() => {
        dispatch(getAllPermission());
    }, [dispatch]);
    useEffect(() => {
        if (roleState.isSuccess && roleState.createdRole) {
            toast.success('Thêm chức vụ thành công!');
        }
        if (roleState.isSuccess && roleState.updatedRole) {
            toast.success('Cập nhật chức vụ thành công!');
        }
        if (roleState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [roleState]);

    const permissionsOpt = [];
    allPermissionState &&
        allPermissionState.forEach((item) => permissionsOpt.push({ label: item.name, value: item._id }));
    const handlepermissions = (e) => {
        setPermissions(e);
    };
    console.log(permissions);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: location.state?.name || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (location.state?.id !== undefined) {
                const data = {
                    data: {
                        ...values,
                        permissions: permissions,
                    },
                    id: location.state.id,
                };
                dispatch(updateRole(data));
                formik.resetForm();
                setPermissions([]);
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/roles');
                }, 300);
            } else {
                const data = {
                    ...values,
                    permissions: permissions,
                };
                dispatch(createRole(data));
                formik.resetForm();
                setPermissions([]);
                setTimeout(() => {
                    dispatch(resetState());
                    navigate('/admin/roles');
                }, 300);
            }
        },
    });
    return permission.indexOf('add-role') !== -1 ? (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{location.state?.id !== undefined ? 'Sửa' : 'Thêm'} chức vụ</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className="mt-3">
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên chức vụ ..."
                        />
                        <label className="label-input" htmlFor="name">
                            Nhập tên chức vụ ...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-3 fs-6"
                        placeholder="Chọn quyền"
                        defaultValue={permissions}
                        onChange={(i) => handlepermissions(i)}
                        options={permissionsOpt}
                    />
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

export default AddRole;
