import { useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CgExport } from 'react-icons/cg';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllProduct } from '../../../features/product/productSlice';
import handlePermission from '../../../utils/permissionService';
import { CSVLink } from 'react-csv';
import { IoReload } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        width: '60%',
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

const WarehouseStatistics = () => {
    const permissions = handlePermission();
    const [nameProd, setNameProd] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productState = useSelector((state) => state.product);
    const allProductState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const data1 = [];
    for (let i = 0; i < allProductState.length; i++) {
        data1.push({
            key: i + 1,
            name: allProductState[i].name,
            quantity: allProductState[i].quantity,
            price: allProductState[i].price,
        });
    }
    const handleChangeName = (e) => {
        setNameProd(e.target.value);
    };
    const handleChangeProd = (e) => {
        const data = {
            name: e.target.value,
        };
        dispatch(getAllProduct(data));
    };

    const handleSearch = () => {
        const data = {
            name: nameProd,
        };
        dispatch(getAllProduct(data));
        setNameProd('');
    };

    useEffect(() => {
        if (productState.updatedQuan) {
            toast.success('Nhập hàng thành công');
            navigate('/admin/products');
        }
        if (productState.isError) {
            toast.error('Đã có lỗi xảy ra');
        }
    }, [productState, navigate]);

    return permissions.indexOf('warehouse-statistics') !== -1 ? (
        <>
            <div className="content-wrapper bg-white p-4">
                <h3 className="mb-4 border-bottom">Thống kê kho hàng</h3>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div className=" d-flex align-items-center gap-15">
                        <div className=" input-group">
                            <select className="form-control" name="category" onChange={(e) => handleChangeProd(e)}>
                                <option value="">Chọn sản phẩm</option>
                                {allProductState.map((item, index) => {
                                    return (
                                        <option key={index} value={item.name}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className=" input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên sản phẩm"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                onChange={(e) => handleChangeName(e)}
                                value={nameProd}
                            />
                            <button
                                className="btn btn-secondary"
                                type="button"
                                id="button-addon2"
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className=" d-flex gap-10">
                        <CSVLink
                            data={data1}
                            onClick={() => {
                                console.log('exportCSV');
                            }}
                            className="btn btn-success d-flex align-items-center gap-2"
                        >
                            <CgExport /> CSV
                        </CSVLink>
                        <Link to={'/admin/addWarehouse'} className="btn btn-warning d-flex align-items-center gap-2">
                            <MdAdd /> Nhập hàng
                        </Link>
                        <button
                            className="btn btn-primary d-flex align-items-center gap-2"
                            onClick={() => dispatch(getAllProduct())}
                        >
                            <IoReload /> Làm mới
                        </button>
                    </div>
                </div>
                <div>
                    <Table columns={columns} dataSource={data1} />
                </div>
            </div>
        </>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default WarehouseStatistics;
