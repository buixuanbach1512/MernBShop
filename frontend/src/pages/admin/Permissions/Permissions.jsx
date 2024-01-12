import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deletePermission, getAllPermission, resetState } from '../../../features/permission/permissionSlice';
import handlePermission from '../../../utils/permissionService';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên quyền',
        dataIndex: 'name',
    },
    {
        title: 'Mã quyền',
        dataIndex: 'code',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Permissions = () => {
    const permissions = handlePermission();
    const [open, setOpen] = useState(false);
    const [permissionId, setPermissionId] = useState(null);
    const [permissionName, setPermissionName] = useState('');
    const dispatch = useDispatch();
    const allPermissionState = useSelector((state) => state.permission.permissions);
    useEffect(() => {
        dispatch(getAllPermission());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setPermissionId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allPermissionState.length; i++) {
        data1.push({
            key: i + 1,
            name: allPermissionState[i].name,
            code: allPermissionState[i].code,
            createdAt: moment(allPermissionState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allPermissionState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editPermission/${allPermissionState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allPermissionState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelPermission = (id) => {
        dispatch(deletePermission(id));
        setOpen(false);
        setPermissionId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllPermission());
        }, 100);
    };

    const handleChange = (e) => {
        setPermissionName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getAllPermission(permissionName));
        setPermissionName('');
    };
    return permissions.indexOf('permissions') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Các quyền</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên quyền"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={permissionName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addPermission">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa quyền"
                    open={open}
                    onOk={() => handleDelPermission(permissionId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa quyền này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Permissions;
