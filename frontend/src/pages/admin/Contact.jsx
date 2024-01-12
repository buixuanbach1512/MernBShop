import { useEffect } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FiDelete } from 'react-icons/fi';
import { useState } from 'react';
import { deleteContact, getAllContact, resetState } from '../../features/contact/contactSlice';
import handlePermission from '../../utils/permissionService';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Lời nhắn',
        dataIndex: 'message',
        width: '30%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'mobile',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Contact = () => {
    const permissions = handlePermission();
    const [open, setOpen] = useState(false);
    const [contactId, setContactId] = useState(null);
    const dispatch = useDispatch();
    const allContactState = useSelector((state) => state.contact.contacts);
    useEffect(() => {
        dispatch(getAllContact());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setContactId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allContactState.length; i++) {
        data1.push({
            key: i + 1,
            name: allContactState[i].name,
            message: allContactState[i].message,
            email: allContactState[i].email,
            mobile: allContactState[i].mobile,
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allContactState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelContact = (id) => {
        dispatch(deleteContact(id));
        setOpen(false);
        setContactId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllContact());
        }, 100);
    };

    return permissions.indexOf('contact') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Liên hệ</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên khách hàng"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2">
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa liên hệ"
                    open={open}
                    onOk={() => handleDelContact(contactId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa liên hệ này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Contact;
