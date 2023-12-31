import { useEffect, useState } from 'react';
import { PiArrowDownRight } from 'react-icons/pi';
import { PiArrowUpRight } from 'react-icons/pi';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getCountOrderByMonth, getCountOrderByYear } from '../../features/order/orderSlice';

const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

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
        dataIndex: 'totalPrice',
    },
    {
        title: 'Thành tiền (Sau giảm giá)',
        dataIndex: 'totalPriceAfterDiscount',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
];

const Dashboard = () => {
    const [dataIncome, setDataIncome] = useState([]);
    const [dataCount, setDataCount] = useState([]);
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountOrderByMonth());
        dispatch(getCountOrderByYear());
        dispatch(getAllOrders());
    }, [dispatch]);

    const orderMonthState = useSelector((state) => state.order.countOrderMonth);
    const orderYearState = useSelector((state) => state.order.countOrderYear);
    const allOrderState = useSelector((state) => state.order.orders);

    useEffect(() => {
        let newDataIncome = [];
        let newDataCount = [];
        for (let i = 0; i < orderMonthState?.length; i++) {
            newDataIncome.unshift({
                type: monthNames[orderMonthState[i]._id.month - 1],
                income: orderMonthState[i].amount,
            });
            newDataCount.unshift({
                type: monthNames[orderMonthState[i]._id.month - 1],
                count: orderMonthState[i].count,
            });
        }
        setDataIncome(newDataIncome);
        setDataCount(newDataCount);
    }, [orderMonthState]);

    const orders = allOrderState?.filter((value) => value.orderStatus == 'Chờ duyệt');
    const data1 = [];
    for (let i = 0; i < orders.length; i++) {
        data1.push({
            key: i + 1,
            name: orders[i].user.name,
            totalPrice: orders[i].totalPrice,
            totalPriceAfterDiscount: orders[i].totalPriceAfterDiscount,
            status: orders[i].orderStatus,
        });
    }
    const config = {
        data: dataIncome,
        xField: 'type',
        yField: 'income',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Tháng',
            },
            income: {
                alias: 'Doanh thu',
            },
        },
    };
    const config2 = {
        data: dataCount,
        xField: 'type',
        yField: 'count',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Tháng',
            },
            count: {
                alias: 'Số lượng',
            },
        },
    };
    return permissions.indexOf('dashboard') !== -1 ? (
        <>
            <h3 className="mb-4">Dash Board</h3>
            <div className="d-flex justify-content-between align-items-center gap-3 my-3">
                <div className="content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Doanh thu</p>
                        <h4 className="mb-0">
                            {orderYearState && orderYearState[0]?.amount}
                            <sup>đ</sup>
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <PiArrowDownRight />
                            32%
                        </h6>
                        <p className="mb-0">{orderYearState && orderYearState[0]?._id?.compareDate} đến hiện tại</p>
                    </div>
                </div>
                <div className="content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Bán hàng</p>
                        <h4 className="mb-0">{orderYearState && orderYearState[0]?.count} sản phẩm</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <PiArrowUpRight />
                            32%
                        </h6>
                        <p className="mb-0">{orderYearState && orderYearState[0]?._id?.compareDate} đến hiện tại</p>
                    </div>
                </div>
                <div className=" content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Total</p>
                        <h4 className="mb-0">
                            100000<sup>đ</sup>
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <PiArrowDownRight />
                            32%
                        </h6>
                        <p className="mb-0">Compared To April 2022</p>
                    </div>
                </div>
            </div>
            <div className=" d-flex justify-content-between gap-10">
                <div className="content-wrapper flex-grow-1 w-50 my-3 p-4 bg-white">
                    <h4 className="mb-4">Thống kê doanh thu</h4>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="content-wrapper flex-grow-1 w-50 my-3 p-4 bg-white">
                    <h4 className="mb-4">Thống kê bán hàng</h4>
                    <div>
                        <Column {...config2} />
                    </div>
                </div>
            </div>
            <div className="content-wrapper my-5 p-4 bg-white">
                <h4 className="mb-4">Đơn hàng chờ duyệt</h4>
                <div>
                    <Table columns={columns} dataSource={data1} />
                </div>
            </div>
        </>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Dashboard;
