import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllOrders, updateOrder } from '../../features/auth/authSlice';
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
        title: 'Sản phẩm',
        dataIndex: 'products',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];
const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    const orderState = useSelector((state) => state.auth.orders);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].user.name,
            amount: orderState[i].totalPrice,
            date: moment(orderState[i].orderedAt).format('DD/MM/YYYY'),
            products: (
                <Link className=" fs-5" to={`/admin/order/${orderState[i]._id}`}>
                    Xem chi tiết
                </Link>
            ),
            action: (
                <>
                    <select
                        onChange={(e) => handleUpdate(orderState[i]._id, e.target.value)}
                        className=" form-control form-select"
                        id=""
                        defaultValue={orderState[i].orderStatus}
                    >
                        <option value="Đã đặt hàng" disabled>
                            Đã đặt hàng
                        </option>
                        <option value="Đã nhận đơn hàng">Đã nhận đơn hàng</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                    </select>
                </>
            ),
        });
    }

    const handleUpdate = (a, b) => {
        const data = {
            id: a,
            status: b,
        };
        dispatch(updateOrder(data));
        setTimeout(() => {
            dispatch(getAllOrders());
        }, 200);
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4">Đơn Hàng</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên người đặt"
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
        </div>
    );
};

export default Orders;
