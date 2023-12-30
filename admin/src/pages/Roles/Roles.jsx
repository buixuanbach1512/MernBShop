import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRole, getAllRole, resetState } from '../../features/role/roleSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên chức vụ',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Các quyền',
        dataIndex: 'permissions',
        sorter: (a, b) => a.name.length - b.name.length,
        width: '40%',
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

const Roles = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const [open, setOpen] = useState(false);
    const [roleId, setRoleId] = useState(null);
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allRoleState = useSelector((state) => state.role.roles);
    useEffect(() => {
        dispatch(getAllRole());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setRoleId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allRoleState.length; i++) {
        data1.push({
            key: i + 1,
            name: allRoleState[i].name,
            permissions: (
                <div className="d-flex gap-1 flex-wrap">
                    {allRoleState[i].permissions.map((item, index) => (
                        <p key={index} className=" bg-success-subtle mb-0 text-center rounded-3 p-2">
                            {item}
                        </p>
                    ))}
                </div>
            ),
            createdAt: moment(allRoleState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allRoleState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <button
                        className="text-warning border-0 bg-transparent"
                        onClick={() => handleEdit(allRoleState[i])}
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allRoleState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        const dataRole = {
            id: data._id,
            name: data.name,
            permissions: data.permissions,
        };
        navigate('/admin/editRole', { state: dataRole });
    };

    const handleDelSize = (id) => {
        dispatch(deleteRole(id));
        setOpen(false);
        setRoleId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllRole());
        }, 100);
    };

    const handleChange = (e) => {
        setRoleName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getAllRole(roleName));
        setRoleName('');
    };
    return permissions.indexOf('roles') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Chức vụ</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên chức vụ"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={roleName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addRole">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa chức vụ"
                    open={open}
                    onOk={() => handleDelSize(roleId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa chức vụ này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Roles;
