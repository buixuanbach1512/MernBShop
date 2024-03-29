import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import { blockUser, getAllUser, resetState, unBlockUser } from '../../features/auth/authSlice';
import handlePermission from '../../utils/permissionService';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
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
        width: '25%',
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

const Customer = () => {
    const permissions = handlePermission();
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);
    const authState = useSelector((state) => state.auth);
    const getUsersState = useSelector((state) => state.auth.allUser);
    console.log(getUsersState);
    const users = getUsersState.filter((item) => item.type == 'user');
    const data1 = [];
    for (let i = 0; i < users.length; i++) {
        data1.push({
            key: i + 1,
            name: users[i].name,
            email: users[i].email,
            mobile: users[i].mobile,
            address: users[i].address,
            status: users[i].isBlocked ? (
                <p className="bg-danger mb-0 text-center rounded-3 text-white">Đã khóa</p>
            ) : (
                <p className="bg-success mb-0 text-center rounded-3 text-white">Active</p>
            ),
            action: (
                <>
                    {users[i].isBlocked ? (
                        <button
                            type="button"
                            className="bg-transparent border-0"
                            onClick={() => handleUnBlock(users[i]._id)}
                        >
                            <TbLockOpen className="text-success icon-action" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-transparent border-0"
                            onClick={() => handleBlock(users[i]._id)}
                        >
                            <TbLock className="text-danger icon-action" />
                        </button>
                    )}
                </>
            ),
        });
    }
    useEffect(() => {
        if (authState.isSuccess && authState.blocked) {
            toast.success('Khóa tài khoản thành công');
        }
        if (authState.isSuccess && authState.unBlocked) {
            toast.success('Hủy khóa thành công');
        }
        if (authState.isError) {
            toast.error('Đã có lỗi xảy ra');
        }
    }, [authState]);
    const handleBlock = (id) => {
        dispatch(blockUser(id));
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllUser());
        }, 200);
    };
    const handleUnBlock = (id) => {
        dispatch(unBlockUser(id));
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllUser());
        }, 200);
    };

    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getAllUser(userName));
        setUserName('');
    };
    return permissions.indexOf('dashboard') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Khách Hàng</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên khách hàng"
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
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Customer;
