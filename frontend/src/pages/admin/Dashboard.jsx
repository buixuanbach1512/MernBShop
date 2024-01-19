import { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getCountOrderByMonth, getCountOrderByYear } from '../../features/order/orderSlice';
import { CgExport } from 'react-icons/cg';
import { getAllProduct } from '../../features/product/productSlice';
import handlePermission from '../../utils/permissionService';
import moment from 'moment';

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
        title: 'Ngày đặt',
        dataIndex: 'date',
    },
];

const columns1 = [
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

const columns2 = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        width: '45%',
        reponsive: ['md'],
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
        reponsive: ['md'],
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        reponsive: ['lg'],
    },
    {
        title: 'Lượt xem',
        dataIndex: 'viewer',
        reponsive: ['lg'],
    },
];

const Dashboard = () => {
    const permissions = handlePermission();
    const [dataIncome, setDataIncome] = useState([]);
    const [dataCount, setDataCount] = useState([]);
    const [topSold, setTopSold] = useState([]);
    const [topView, setTopView] = useState([]);
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
                type: orderMonthState[i]._id.month + '/' + orderMonthState[i]._id.year,
                income: orderMonthState[i].amount,
            });
            newDataCount.unshift({
                type: orderMonthState[i]._id.month + '/' + orderMonthState[i]._id.year,
                count: orderMonthState[i].count,
            });
        }
        setDataIncome(newDataIncome);
        setDataCount(newDataCount);
    }, [orderMonthState]);
    useEffect(() => {
        let newProduct = [];
        for (let i = 0; i < allProductState?.length; i++) {
            const element = allProductState[i];
            newProduct.push(element);
        }
        for (let i = 0; i < newProduct.length - 1; i++) {
            for (let j = i + 1; j < newProduct.length; j++) {
                if (newProduct[i].sold < newProduct[j].sold) {
                    let temp = newProduct[i];
                    newProduct[i] = newProduct[j];
                    newProduct[j] = temp;
                }
            }
        }
        setTopSold(newProduct);
    }, [allProductState]);

    useEffect(() => {
        let newProduct = [];
        for (let i = 0; i < allProductState?.length; i++) {
            const element = allProductState[i];
            newProduct.push(element);
        }
        for (let i = 0; i < newProduct.length - 1; i++) {
            for (let j = i + 1; j < newProduct.length; j++) {
                if (newProduct[i].viewer.length < newProduct[j].viewer.length) {
                    let temp = newProduct[i];
                    newProduct[i] = newProduct[j];
                    newProduct[j] = temp;
                }
            }
        }
        setTopView(newProduct);
    }, [allProductState]);

    let orderQuantity = 0;
    for (let i = 0; i < allOrderState.length; i++) {
        if (allOrderState[i].orderStatus == 4) {
            orderQuantity = orderQuantity + 1;
        }
    }

    const orders = allOrderState?.filter((value) => value.orderStatus == 0);
    const data1 = [];
    for (let i = 0; i < orders.length; i++) {
        data1.push({
            key: i + 1,
            name: orders[i].user.name,
            totalPrice: orders[i].totalPrice,
            totalPriceAfterDiscount: orders[i].totalPriceAfterDiscount,
            date: moment(orders[i].orderedAt).format('hh:mm:ss DD/MM/YYYY'),
        });
    }
    const data2 = [];
    if (topSold) {
        for (let i = 0; i < topSold.length; i++) {
            data2.push({
                key: i + 1,
                name: topSold[i]?.name,
                image: <img src={topSold[i].images[0]?.url} alt="" width={50} height={50} />,
                price: topSold[i]?.price,
                sold: topSold[i]?.sold,
            });
        }
    }
    const data3 = [];
    for (let i = 0; i < topView.length; i++) {
        data3.push({
            key: i + 1,
            name: topView[i]?.name,
            image: <img src={topView[i].images[0]?.url} alt="" width={50} height={50} />,
            price: topView[i]?.price,
            viewer: topView[i]?.viewer.length,
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
            <div className="container-xxl">
                <div className="row">
                    <h3 className="mb-4">Dash Board</h3>
                    <div className="col-xl-4 col-md-6 col-12">
                        <div className="content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 my-2 rounded-3">
                            <div>
                                <p>Doanh thu</p>
                                <h4 className="mb-0">
                                    {orderYearState && orderYearState[0]?.amount.toLocaleString('vi')}
                                    <sup>đ</sup>
                                </h4>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <p className="mb-0">
                                    Tính từ tháng {orderYearState && orderYearState[0]?._id?.compareDate}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-12">
                        <div className="content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 my-2 rounded-3">
                            <div>
                                <p>Bán hàng</p>
                                <h4 className="mb-0">{orderYearState && orderYearState[0]?.count} sản phẩm</h4>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <p className="mb-0">
                                    Tính từ tháng {orderYearState && orderYearState[0]?._id?.compareDate}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6 col-12">
                        <div className=" content-wrapper d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 my-2 rounded-3">
                            <div>
                                <p>Đơn hàng</p>
                                <h4 className="mb-0">{orderQuantity} đơn hàng đã xong</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-12 col-12">
                        <div className="content-wrapper my-3 p-4 bg-white">
                            <h4 className="mb-4">Thống kê doanh thu</h4>
                            <div>
                                <Column {...config} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12 col-12">
                        <div className="content-wrapper my-3 p-4 bg-white">
                            <h4 className="mb-4">Thống kê bán hàng</h4>
                            <div>
                                <Column {...config2} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="">
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
                                    <Table columns={columns} dataSource={data1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-xl-6 col-md-12 col-12">
                        <div className="content-wrapper  p-4 bg-white">
                            <div className=" d-flex justify-content-between mb-4 align-items-center">
                                <h4 className="mb-0">Sản phẩm bán chạy</h4>
                            </div>
                            <div>
                                <Table
                                    size="small"
                                    columns={columns1}
                                    dataSource={data2}
                                    pagination={{ pageSize: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12 col-12">
                        {' '}
                        <div className="content-wrapper p-4 bg-white">
                            <div className=" d-flex justify-content-between mb-4 align-items-center">
                                <h4 className="mb-0">Top lượt xem</h4>
                            </div>
                            <div>
                                <Table
                                    size="small"
                                    columns={columns2}
                                    dataSource={data3}
                                    pagination={{ pageSize: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Dashboard;
