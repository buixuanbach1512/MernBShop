import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser, getUsers, resetState, unBlockUser } from '../../features/customer/customerSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { deleteUser } from '../../features/auth/authSlice';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'role',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Staff = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const [userName, setUserName] = useState('');
    const [open, setOpen] = useState(false);
    const [staffId, setStaffId] = useState('');
    const dispatch = useDispatch();
    const customerState = useSelector((state) => state.customer);
    const getCustomersState = useSelector((state) => state.customer.customers);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const showModal = (id) => {
        setOpen(true);
        setStaffId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < getCustomersState.length; i++) {
        if (getCustomersState[i].type == 'admin') {
            data1.push({
                key: i + 1,
                name: getCustomersState[i].name,
                email: getCustomersState[i].email,
                mobile: getCustomersState[i].mobile,
                address: getCustomersState[i].address,
                role: getCustomersState[i].role.name,
                status: (
                    <>
                        {getCustomersState[i].isBlocked ? (
                            <p
                                className="bg-danger mb-0 text-center rounded-3 text-white py-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleUnBlock(getCustomersState[i]._id)}
                            >
                                Chưa kích hoạt
                            </p>
                        ) : (
                            <p
                                className="bg-success mb-0 text-center rounded-3 text-white py-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleBlock(getCustomersState[i]._id)}
                            >
                                Đã kích hoạt
                            </p>
                        )}
                    </>
                ),
                action: (
                    <div className="d-flex gap-10 align-items-center">
                        <Link className="text-warning mb-0" to={`/admin/editSize/${getCustomersState[i]._id}`}>
                            <BiEdit className="icon-action" />
                        </Link>
                        <button
                            className=" fs-5 text-danger bg-transparent border-0"
                            onClick={() => showModal(getCustomersState[i]._id)}
                        >
                            <FiDelete className="icon-action" />
                        </button>
                    </div>
                ),
            });
        }
    }
    useEffect(() => {
        if (customerState.isSuccess && customerState.blocked) {
            toast.success('Hủy kích hoạt thành công');
        }
        if (customerState.isSuccess && customerState.unBlocked) {
            toast.success('Kích hoạt thành công');
        }
        if (customerState.isError) {
            toast.error('Đã có lỗi xảy ra');
        }
    }, [customerState]);
    const handleBlock = (id) => {
        dispatch(blockUser(id));
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getUsers());
        }, 200);
    };
    const handleUnBlock = (id) => {
        dispatch(unBlockUser(id));
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getUsers());
        }, 200);
    };

    const handleDelStaff = (id) => {
        dispatch(deleteUser(id));
        setOpen(false);
        setStaffId('null');
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getUsers());
        }, 100);
    };

    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getUsers(userName));
        setUserName('');
    };
    return permissions.indexOf('staffs') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Nhân viên</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên nhân viên"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={userName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa nhân viên"
                    open={open}
                    onOk={() => handleDelStaff(staffId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa nhân viên này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Staff;
