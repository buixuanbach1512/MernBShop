import { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/product/productSlice';
import Color from '../components/ColorList';
import { getAllColor } from '../features/color/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Store = () => {
    const [grid, setGrid] = useState(3);
    const [sort, setSort] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [inStock, setInStock] = useState(null);
    const [outStock, setOutStock] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const catId = location.state?._id;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.products);

    const colorState = useSelector((state) => state.color.colors);
    useEffect(() => {
        const data = {
            catId,
            sort,
            minPrice,
            maxPrice,
            inStock,
            outStock,
        };
        dispatch(getAllProduct(data));
        dispatch(getAllColor());
    }, [catId, dispatch, inStock, maxPrice, minPrice, outStock, sort]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = productState && productState.slice(firstItemIndex, lastItemIndex);

    const handleAll = () => {
        setInStock(null);
        setOutStock(null);
    };

    const handleInStock = (value) => {
        setInStock(value);
        setOutStock(null);
    };

    const handleOutStock = (value) => {
        setOutStock(value);
        setInStock(null);
    };

    return (
        <>
            <Meta title={'Cửa Hàng'} />
            <BreadCrumb title={location.state?.name ? location.state?.name : 'Cửa hàng'} />
            <div className="store-wrapper home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-xl-3 col-md-3 col-12">
                            {location.state?._id && location.state?.children.length > 0 ? (
                                <div className="filter-card mb-3">
                                    <div>
                                        <h3 className="filter-title">Mua Hàng Theo Danh Mục</h3>
                                        <ul className="ps-0">
                                            {location.state.children.map((item, index) => (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => navigate(`/store/${item.slug}`, { state: item })}
                                                        className="bg-transparent border-0"
                                                    >
                                                        {item?.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Lọc Sản Phẩm Theo</h3>
                                <div>
                                    <h5 className="sub-title">Khả Dụng</h5>
                                    <div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                name="stocks"
                                                id="all-stocks"
                                                className="form-check-input"
                                                onChange={() => handleAll()}
                                            />
                                            <label htmlFor="all-stocks" className="form-check-label">
                                                Tất cả
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                value="0"
                                                name="stocks"
                                                id="in-stocks"
                                                className="form-check-input"
                                                onChange={(e) => handleInStock(e.target.value)}
                                            />
                                            <label htmlFor="in-stocks" className="form-check-label">
                                                Còn hàng(1)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                value="0"
                                                name="stocks"
                                                id="out-stocks"
                                                className="form-check-input"
                                                onChange={(e) => handleOutStock(e.target.value)}
                                            />
                                            <label htmlFor="out-stocks" className="form-check-label">
                                                Hết hàng(0)
                                            </label>
                                        </div>
                                    </div>
                                    <h5 className="sub-title">Giá Sản Phẩm</h5>
                                    <div className="d-flex align-items-center gap-10">
                                        <div>
                                            <label htmlFor="floatingInputFrom">Từ ...</label>
                                            <input
                                                type="number"
                                                className="form-control py-3"
                                                id="floatingInputFrom"
                                                onChange={(e) => setMinPrice(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="floatingInputTo">Đến ...</label>
                                            <input
                                                type="number"
                                                className="form-control py-3"
                                                id="floatingInputTo"
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <h5 className="sub-title">Màu Sắc</h5>
                                    <div>
                                        <Color colorData={colorState} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-md-9">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="mb-0 w-50">Xếp theo:</p>
                                        <select
                                            className="form-control form-select"
                                            onChange={(e) => setSort(e.target.value)}
                                            defaultValue={'default'}
                                        >
                                            <option value={'default'} disabled>
                                                Mặc định
                                            </option>
                                            <option value="price">Giá thấp đến cao</option>
                                            <option value="-price">Giá cao đến thấp</option>
                                            <option value="name">A-Z</option>
                                            <option value="-name">Z-A</option>
                                        </select>
                                    </div>
                                    <div className="grid">
                                        <p className="total-products mb-0">{productState?.length} sản phẩm</p>
                                        <div className="d-flex gap-10 align-items-center">
                                            <img
                                                onClick={() => {
                                                    setGrid(3);
                                                    setItemsPerPage(8);
                                                }}
                                                src="images/gr4.svg"
                                                alt="grid"
                                                className="d-block img-fluid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(4);
                                                    setItemsPerPage(9);
                                                }}
                                                src="images/gr3.svg"
                                                alt="grid"
                                                className="d-block img-fluid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(6);
                                                    setItemsPerPage(6);
                                                }}
                                                src="images/gr2.svg"
                                                alt="grid"
                                                className="d-block img-fluid"
                                            />
                                            <img
                                                onClick={() => {
                                                    setGrid(12);
                                                    setItemsPerPage(5);
                                                }}
                                                src="images/gr.svg"
                                                alt="grid"
                                                className="d-block img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list pb-5">
                                <div className="d-flex flex-wrap">
                                    {currentItems?.map((item) => (
                                        <ProductCard key={item._id} item={item} grid={grid} />
                                    ))}
                                </div>
                                <Pagination
                                    totalItems={productState?.length}
                                    itemsPerPage={itemsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Store;
