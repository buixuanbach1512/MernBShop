import { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getCountOrderByMonth, getCountOrderByYear } from '../../features/order/orderSlice';
import { CgExport } from 'react-icons/cg';
import { getAllProduct } from '../../features/product/productSlice';
import handlePermission from '../../utils/permissionService';

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

const columns1 = [
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

const columns2 = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        width: '45%',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
    },
    {
        title: 'Đã bán',
        dataIndex: 'sold',
    },
];

const Dashboard = () => {
    const permissions = handlePermission();
    const [dataIncome, setDataIncome] = useState([]);
    const [dataCount, setDataCount] = useState([]);
    const dispatch = useDispatch();

    const orderMonthState = useSelector((state) => state.order.countOrderMonth);
    const orderYearState = useSelector((state) => state.order.countOrderYear);
    const allOrderState = useSelector((state) => state.order.orders);
    const allProductState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getCountOrderByMonth());
        dispatch(getCountOrderByYear());
        dispatch(getAllOrders());
        dispatch(getAllProduct());
    }, [dispatch]);

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

    const products = [];
    allProductState && allProductState.forEach((item) => products.push(item));

    for (let i = 0; i < products?.length - 1; i++) {
        for (let j = i + 1; j < products.length; j++) {
            if (products[i].sold < products[j].sold) {
                let temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
    }

    let orderQuantity = 0;
    for (let i = 0; i < allOrderState.length; i++) {
        if (allOrderState[i].orderStatus == 'Đã giao hàng') {
            orderQuantity = orderQuantity + 1;
        }
    }

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
    const data2 = [];
    for (let i = 0; i < products.length; i++) {
        data2.push({
            key: i + 1,
            name: products[i]?.name,
            image: <img src={products[i].images[0]?.url} alt="" width={50} height={50} />,
            price: products[i]?.price,
            sold: products[i]?.sold,
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
                        <p className="mb-0">Tính từ tháng {orderYearState && orderYearState[0]?._id?.compareDate}</p>
                    </div>
                </div>
                <div className="content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Bán hàng</p>
                        <h4 className="mb-0">{orderYearState && orderYearState[0]?.count} sản phẩm</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="mb-0">Tính từ tháng {orderYearState && orderYearState[0]?._id?.compareDate}</p>
                    </div>
                </div>
                <div className=" content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Đơn hàng</p>
                        <h4 className="mb-0">{orderQuantity} đơn hàng đã xong</h4>
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
            <div className="my-5">
                <div className="content-wrapper  p-4 bg-white">
                    <div className=" d-flex justify-content-between mb-4 align-items-center">
                        <h4 className="mb-0">Đơn hàng chờ duyệt</h4>
                        <CSVLink
                            data={data1}
                            onClick={() => {
                                console.log('exportCSV');
                            }}
                            className="btn btn-success d-flex align-items-center gap-2"
                        >
                            <CgExport /> CSV
                        </CSVLink>
                    </div>
                    <div>
                        <Table columns={columns1} dataSource={data1} />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between gap-10 my-5">
                <div className="content-wrapper  p-4 bg-white">
                    <div className=" d-flex justify-content-between mb-4 align-items-center">
                        <h4 className="mb-0">Sản phẩm bán chạy</h4>
                        <CSVLink
                            data={data2}
                            onClick={() => {
                                console.log('exportCSV');
                            }}
                            className="btn btn-success d-flex align-items-center gap-2"
                        >
                            <CgExport /> CSV
                        </CSVLink>
                    </div>
                    <div>
                        <Table size="small" columns={columns2} dataSource={data2} pagination={{ pageSize: 5 }} />
                    </div>
                </div>
                <div className="content-wrapper p-4 bg-white">
                    <div className=" d-flex justify-content-between mb-4 align-items-center">
                        <h4 className="mb-0">Đơn hàng chờ duyệt</h4>
                        <CSVLink
                            data={data1}
                            onClick={() => {
                                console.log('exportCSV');
                            }}
                            className="btn btn-success d-flex align-items-center gap-2"
                        >
                            <CgExport /> CSV
                        </CSVLink>
                    </div>
                    <div>
                        <Table columns={columns2} dataSource={data2} />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Dashboard;
