import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal } from 'antd';
import moment from 'moment';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';
import { deleteOrder, getAllOrders, updateOrder } from '../../../features/order/orderSlice';
import handlePermission from '../../../utils/permissionService';
const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Người đặt',
        dataIndex: 'name',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'amount',
    },
    {
        title: 'Ngày đặt',
        dataIndex: 'date',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Thanh toán',
        dataIndex: 'payment',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];
const stateOpt = [
    {
        value: 0,
        label: 'Chờ duyệt',
    },
    {
        value: 1,
        label: 'Duyệt đơn hàng',
    },
    {
        value: 2,
        label: 'Đang vận chuyển',
    },
    {
        value: 3,
        label: 'Đang giao hàng',
    },
    {
        value: 4,
        label: 'Đã giao hàng',
    },
    {
        value: 5,
        label: 'Hủy',
    },
];
const Orders = () => {
    const permissions = handlePermission();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const showModal = (data) => {
        setOpen(true);
        setOrderId(data._id);
        setOrderStatus(data.orderStatus);
    };
    const showModal1 = (id) => {
        setOpen1(true);
        setOrderId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const hideModal1 = () => {
        setOpen1(false);
    };
    const orderState = useSelector((state) => state.order.orders);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].user.name,
            amount: orderState[i].totalPrice,
            date: moment(orderState[i].orderedAt).format('DD/MM/YYYY'),
            status: stateOpt.find((item) => item.value == orderState[i].orderStatus).label,
            payment: orderState[i].payment,
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-info" to={`/admin/order-detail/${orderState[i]._id}`}>
                        <IoInformationCircleSharp className="icon-action" />
                    </Link>
                    {orderState[i].orderStatus >= 4 ? (
                        <button
                            className=" fs-5 text-danger bg-transparent border-0"
                            onClick={() => showModal1(orderState[i]._id)}
                        >
                            <FiDelete className="icon-action" />
                        </button>
                    ) : (
                        <button
                            className=" fs-5 text-warning bg-transparent border-0"
                            onClick={() => showModal(orderState[i])}
                        >
                            <BiEdit className="icon-action" />
                        </button>
                    )}
                </div>
            ),
        });
    }

    const handleChange = (data) => {
        setOrderStatus(data);
    };

    const handleFilter = (data) => {
        dispatch(getAllOrders(data));
    };

    const handleOrder = () => {
        const data = {
            id: orderId,
            status: orderStatus,
        };
        dispatch(updateOrder(data));
        setOpen(false);
        setOrderId(null);
        setTimeout(() => {
            dispatch(getAllOrders());
        }, 200);
    };

    const handleDelOrder = (id) => {
        dispatch(deleteOrder(id));
        setOpen1(false);
        setOrderId(null);
        setTimeout(() => {
            dispatch(getAllOrders());
        }, 100);
    };

    return permissions.indexOf('orders') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Đơn hàng</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <select onChange={(e) => handleFilter(e.target.value)} className=" form-control form-select">
                        <option value="">-- Chọn trạng thái --</option>
                        {stateOpt.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Cập nhật trạng thái đơn hàng"
                    open={open}
                    onOk={() => handleOrder()}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <div className="py-3">
                        <select
                            onChange={(e) => handleChange(e.target.value)}
                            className=" form-control form-select"
                            value={orderStatus}
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            {stateOpt.map((item, index) => (
                                <option
                                    key={index}
                                    value={item.value}
                                    disabled={orderStatus >= item.value ? true : false}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    title="Xóa đơn hàng"
                    open={open1}
                    onOk={() => handleDelOrder(orderId)}
                    onCancel={hideModal1}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa đơn hàng này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Orders;
