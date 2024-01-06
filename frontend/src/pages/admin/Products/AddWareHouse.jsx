import { useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllProduct, getProduct, updateQuantity } from '../../../features/product/productSlice';

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        width: '20%',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const AddWareHouse = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const [nameProd, setNameProd] = useState('');
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productState = useSelector((state) => state.product);
    const aProductState = useSelector((state) => state.product.getProduct);
    const allaProductState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);
    const data1 = [];
    aProductState &&
        data1.push({
            name: <div className="prod-name">{aProductState.name}</div>,
            image: <img src={aProductState.images[0]?.url} alt="" width={100} height={100} />,
            quantity: edit ? (
                <div>
                    {aProductState.quantity} +{' '}
                    <input
                        type="number"
                        min={1}
                        max={20}
                        value={quantity?.quantity}
                        onChange={(e) => setQuantity({ id: aProductState._id, quantity: e.target.value })}
                    />
                </div>
            ) : (
                aProductState.quantity
            ),
            price: (
                <p className="mb-0">
                    {aProductState.price.toLocaleString('vi')} <sup>đ</sup>
                </p>
            ),
            action: edit ? (
                <div className="d-flex gap-10">
                    <button onClick={() => handleSubmit()} className="btn btn-success">
                        Nhập hàng
                    </button>
                    <button onClick={() => setEdit(false)} className="btn btn-danger">
                        Hủy
                    </button>
                </div>
            ) : (
                <button onClick={() => handleChange()} className="btn btn-success">
                    Nhập hàng
                </button>
            ),
        });

    const handleChangeName = (e) => {
        setNameProd(e.target.value);
    };
    const handleChangeProd = (e) => {
        const data = {
            name: e.target.value,
        };
        dispatch(getProduct(data));
    };

    const handleSearch = () => {
        const data = {
            name: nameProd,
        };
        dispatch(getProduct(data));
        setNameProd('');
    };

    const handleChange = () => {
        setEdit(true);
    };

    const handleSubmit = () => {
        if (quantity !== null) {
            dispatch(updateQuantity(quantity));
            setQuantity(0);
            setEdit(false);
        }
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

    return permissions.indexOf('add-warehouse') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Kho hàng</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className=" d-flex align-items-center gap-15">
                    <div className=" input-group">
                        <select className="form-control" name="category" onChange={(e) => handleChangeProd(e)}>
                            <option value="">Chọn sản phẩm</option>
                            {allaProductState.map((item, index) => {
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
                        <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className=" d-flex gap-10">
                    <button className="btn btn-success d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
                        <RiArrowGoBackFill /> Trở lại
                    </button>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default AddWareHouse;
