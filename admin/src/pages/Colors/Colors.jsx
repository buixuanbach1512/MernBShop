import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteColor, getColors, resetState } from '../../features/color/colorSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên màu',
        dataIndex: 'name',
    },
    {
        title: 'Mã màu',
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

const Colors = () => {
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState(null);
    const [colorName, setColorName] = useState('')
    const dispatch = useDispatch();
    const allColorState = useSelector((state) => state.color.colors);
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setColorId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allColorState.length; i++) {
        data1.push({
            key: i + 1,
            name: allColorState[i].name,
            code: allColorState[i].code,
            createdAt: moment(allColorState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allColorState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editColor/${allColorState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allColorState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelColor = (id) => {
        dispatch(deleteColor(id));
        setOpen(false);
        setColorId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getColors());
        }, 100);
    };

    const handleChange = (e) => {
        setColorName(e.target.value)
    }
    const handleSubmit = () => {
        dispatch(getColors(colorName))
        setColorName('')
    }
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Màu sắc</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mã màu"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e)=> handleChange(e)}
                        value={colorName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addColor">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa màu"
                    open={open}
                    onOk={() => handleDelColor(colorId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa màu này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Colors;
