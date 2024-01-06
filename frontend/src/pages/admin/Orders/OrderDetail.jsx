import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { getOrderById } from '../../../features/order/orderSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
    },
];

const OrderDetail = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.pathname.split('/')[3];
    const orderState = useSelector((state) => state.order.getOrder);
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    const data1 = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i]?.product?.name,
            image: (
                <>
                    <img
                        src={orderState?.orderItems[i]?.product?.images[0]?.url}
                        alt="image"
                        className=" img-fluid"
                        width={100}
                    />
                </>
            ),
            color: orderState?.orderItems[i]?.color?.code,
            quantity: orderState?.orderItems[i]?.quantity,
            price: orderState?.orderItems[i]?.price,
        });
    }

    return permissions.indexOf('order-detail') !== -1 ? (
        <div className="content-wrapper bg-white p-5">
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-4">Chi tiết đơn hàng</h3>
                    <button className="btn btn-success d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
                        <RiArrowGoBackFill /> Trở lại
                    </button>
                </div>
                <div>
                    <ul className="list-group">
                        <li className="list-group-item active">
                            <h5 className="mb-0">Thông tin khách hàng</h5>
                        </li>
                        <li className="list-group-item">
                            <p className="mb-0">Họ tên: {orderState?.shippingInfo?.name}</p>{' '}
                        </li>
                        <li className="list-group-item">
                            <p className="mb-0">Số điện thoại: {orderState?.shippingInfo?.mobile}</p>
                        </li>
                        <li className="list-group-item">
                            <p className="mb-0">Địa chỉ giao hàng: {orderState?.shippingInfo?.address}</p>
                        </li>
                        <li className="list-group-item">
                            <p className="mb-0">Địa chỉ giao hàng khác( nếu có ): {orderState?.shippingInfo?.other}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-5">
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default OrderDetail;
