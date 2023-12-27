import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../features/product/productSlice';
import { getBrands } from '../../features/brand/brandSlice';
import { getCategories } from '../../features/category/categorySlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
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
        title: 'Thương Hiệu',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        sorter: (a, b) => a.price.length - b.price.length,
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Products = () => {
    const [open, setOpen] = useState(false);
    const [prodId, setProdId] = useState(null);
    const [nameProd, setNameProd] = useState('');
    const [cateProd, setCateProd] = useState('');
    const [brandProd, setBrandProd] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productState = useSelector((state) => state.product.products);
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getBrands());
        dispatch(getCategories());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setProdId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            name: <div className="prod-name">{productState[i].name}</div>,
            image: <img src={productState[i].images[0]?.url} alt="" width={100} height={100} />,
            brand: productState[i].brand.name,
            category: productState[i].category.name,
            color: (
                <ul className=" list-group list-group-flush">
                    {productState[i].color.slice(0, 2).map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: `${item.code}`,
                                    border: '1px solid #777',
                                }}
                            ></div>
                        </li>
                    ))}
                </ul>
            ),
            price: (
                <p className="mb-0">
                    {productState[i].price.toLocaleString('vi')} <sup>đ</sup>
                </p>
            ),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <button
                        className="text-warning border-0 bg-transparent"
                        onClick={() => handleEdit(productState[i])}
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(productState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        const dataProduct = {
            id: data._id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            category: data.category._id,
            tags: data.tags,
            brand: data.brand._id,
            color: data.color.map((i) => i._id),
            size: data.size,
            description: data.description,
            images: data.images,
        };
        navigate('/admin/editProduct', { state: dataProduct });
    };

    const handleDelProd = (id) => {
        dispatch(deleteProduct(id));
        setOpen(false);
        setProdId(null);
        setTimeout(() => {
            dispatch(getProducts());
        }, 100);
    };

    const handleChangeName = (e) => {
        setNameProd(e.target.value);
    };
    const handleChangeCate = (e) => {
        setCateProd(e.target.value);
    };
    const handleChangeBrand = (e) => {
        setBrandProd(e.target.value);
    };

    const handleSearch = () => {
        const data = {
            name: nameProd,
            category: cateProd,
            brand: brandProd,
        };
        dispatch(getProducts(data));
        setNameProd('');
        setCateProd('');
        setBrandProd('');
    };

    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Sản phẩm</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className=" d-flex align-items-center gap-15">
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
                    <div className=" input-group">
                        <select
                            className="form-control"
                            name="category"
                            onChange={(e) => handleChangeCate(e)}
                            value={cateProd}
                        >
                            <option value="">Chọn danh mục</option>
                            {categoryState.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className=" input-group">
                        <select
                            className="form-control"
                            name="brand"
                            onChange={(e) => handleChangeBrand(e)}
                            value={brandProd}
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brandState.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addProduct">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa sản phẩm"
                    open={open}
                    onOk={() => handleDelProd(prodId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa sản phẩm này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Products;
