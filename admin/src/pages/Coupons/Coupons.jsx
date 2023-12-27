import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteCoupon, getCoupons, resetState } from '../../features/coupon/couponSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Phiếu giảm giá',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Mã giảm giá',
        dataIndex: 'code',
    },
    {
        title: 'Ngày hết hạn',
        dataIndex: 'expiry',
    },
    {
        title: 'Giảm giá(%)',
        dataIndex: 'discount',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
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

const Coupons = () => {
    const [open, setOpen] = useState(false);
    const [couponId, setCouponId] = useState(null);
    const [couponName, setCouponName] = useState('');
    const dispatch = useDispatch();
    const allCouponState = useSelector((state) => state.coupon.coupons);
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setCouponId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const date = new Date();

    const data1 = [];
    for (let i = 0; i < allCouponState.length; i++) {
        data1.push({
            key: i + 1,
            name: allCouponState[i].name,
            code: allCouponState[i].code,
            discount: allCouponState[i].discount,
            expiry: moment(allCouponState[i].expiry).format('DD/MM/YYYY'),
            status:
                Date.parse(allCouponState[i].expiry) > date.getTime() ? (
                    <p className="bg-success mb-0 text-center rounded-3 text-white">Chưa hết hạn</p>
                ) : (
                    <p className="bg-danger mb-0 text-center rounded-3 text-white">Hết hạn</p>
                ),
            createdAt: moment(allCouponState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(allCouponState[i].updatedAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editCoupon/${allCouponState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allCouponState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelBrand = (id) => {
        dispatch(deleteCoupon(id));
        setOpen(false);
        setCouponId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getCoupons());
        }, 100);
    };

    const handleChange = (e) => {
        setCouponName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getCoupons(couponName));
        setCouponName('');
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Phiếu mua hàng</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên phiếu mua hàng"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={couponName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addCoupon">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa phiếu mua hàng"
                    open={open}
                    onOk={() => handleDelBrand(couponId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa phiếu mua hàng này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Coupons;
