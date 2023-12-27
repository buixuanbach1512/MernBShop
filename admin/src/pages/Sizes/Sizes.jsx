import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteSize, getSize, resetState } from '../../features/size/sizeSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Size',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
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

const Sizes = () => {
    const [open, setOpen] = useState(false);
    const [sizeId, setSizeId] = useState(null);
    const [sizeName, setSizeName] = useState('')
    const dispatch = useDispatch();
    const allSizeState = useSelector((state) => state.size.sizes);
    useEffect(() => {
        dispatch(getSize());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setSizeId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allSizeState.length; i++) {
        data1.push({
            key: i + 1,
            name: allSizeState[i].name,
            createdAt: moment(allSizeState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allSizeState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editSize/${allSizeState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allSizeState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelBrand = (id) => {
        dispatch(deleteSize(id));
        setOpen(false);
        setSizeId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getSize());
        }, 100);
    };

    const handleChange = (e) => {
        setSizeName(e.target.value)
    }
    const handleSubmit = () => {
        dispatch(getSize(sizeName))
        setSizeName('')
    }
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Size sản phẩm</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên size"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e)=> handleChange(e)}
                        value={sizeName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addSize">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa size"
                    open={open}
                    onOk={() => handleDelBrand(sizeId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa size này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Sizes;
