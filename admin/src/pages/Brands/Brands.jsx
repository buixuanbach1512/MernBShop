import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteBrand, getBrands, resetState } from '../../features/brand/brandSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Thương hiệu',
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

const Brands = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState(null);
    const [brandName, setBrandName] = useState('')
    const dispatch = useDispatch();
    const allBrandState = useSelector((state) => state.brand.brands);
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setBrandId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allBrandState.length; i++) {
        data1.push({
            key: i + 1,
            name: allBrandState[i].name,
            createdAt: moment(allBrandState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allBrandState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editBrand/${allBrandState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allBrandState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelBrand = (id) => {
        dispatch(deleteBrand(id));
        setOpen(false);
        setBrandId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getBrands());
        }, 100);
    };

    const handleChange = (e) => {
        setBrandName(e.target.value)
    }
    const handleSubmit = () => {
        dispatch(getBrands(brandName))
        setBrandName('')
    }
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Thương hiệu</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên thương hiệu"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e)=> handleChange(e)}
                        value={brandName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addBrand">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa thương hiệu"
                    open={open}
                    onOk={() => handleDelBrand(brandId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa thương hiệu này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Brands;
