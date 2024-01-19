import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { compareProduct, getAProduct, getAllProduct } from '../../features/product/productSlice';
import { Link, useLocation } from 'react-router-dom';
import Color from '../../components/customer/ColorList';
import StarRatings from 'react-star-ratings';

const Compare = () => {
    const [compareList, setCompareList] = useState([]);
    const [allProd, setAllProd] = useState([]);
    const [compare, setCompare] = useState();
    const [prodId, setProdId] = useState();
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const compareListState = useSelector((state) => state?.product?.compareList);
    const aProductState = useSelector((state) => state.product.getAProd);
    const allProductState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(compareProduct(id));
        dispatch(getAProduct(id));
        dispatch(getAllProduct());
    }, [dispatch, id]);
    useEffect(() => {
        setCompareList(compareListState);
        setAllProd(allProductState);
    }, [compareListState, allProductState]);
    useEffect(() => {
        if (prodId && allProd) {
            const product = allProd.find((item) => item._id === prodId);
            setCompare(product);
        }
    }, [allProd, prodId]);
    return (
        <>
            <Meta title={'So sánh sản phẩm'} />
            <BreadCrumb title="So sánh sản phẩm" />
            <div className="widhlist-wrapper home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-12">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="mb-0">Lọc: </p>
                                        <select
                                            onChange={(e) => setProdId(e.target.value)}
                                            className="form-control form-select text-center"
                                        >
                                            <option value="">-- Chọn sản phẩm --</option>
                                            {allProd &&
                                                allProd.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-md-5 col-12">
                            <div className="compare-card position-relative">
                                <div className="p-3 bg-white rounded-3">
                                    <div className="compare-card-img">
                                        <img
                                            src={aProductState?.images[0]?.url}
                                            className="img-fluid w-100"
                                            alt="product"
                                        />
                                    </div>
                                    <div className="compare-detail p-3 bg-white">
                                        <div className="border-bottom">
                                            <h5 className="title">{aProductState?.name}</h5>
                                            <div className="my-3">
                                                <StarRatings
                                                    rating={aProductState?.totalRating}
                                                    starRatedColor="#ffd700"
                                                    numberOfStars={5}
                                                    starDimension="18px"
                                                    starSpacing="1px"
                                                    name="rating"
                                                />
                                            </div>
                                            <h6 className="price">
                                                {aProductState?.tags == 'Sản phẩm đặc biệt' ? (
                                                    <>
                                                        <span>
                                                            {aProductState?.salePrice.toLocaleString('vi')}
                                                            <sup>đ</sup>
                                                        </span>
                                                        &nbsp;&nbsp;
                                                        <strike className="text-danger">
                                                            {aProductState?.price.toLocaleString('vi')}
                                                            <sup>đ</sup>
                                                        </strike>
                                                    </>
                                                ) : (
                                                    <span>
                                                        {aProductState?.price.toLocaleString('vi')}
                                                        <sup>đ</sup>
                                                    </span>
                                                )}
                                            </h6>
                                        </div>
                                        <div className="py-2 d-flex justify-content-between flex-grow-1 border-bottom">
                                            <h6 className=" mb-0">Thương hiệu: </h6>
                                            <p className="mb-0">{aProductState?.brand?.name}</p>
                                        </div>
                                        <div className="py-2 d-flex justify-content-between border-bottom">
                                            <h6 className=" mb-0">Số lượng: </h6>
                                            <p className="mb-0">{aProductState?.quantity}</p>
                                        </div>
                                        <div className="py-2 d-flex justify-content-between border-bottom">
                                            <h6 className=" mb-0">Tags: </h6>
                                            <p className="mb-0">{aProductState?.tags}</p>
                                        </div>
                                        <div className="py-2 d-flex justify-content-between border-bottom">
                                            <h6 className="">Màu sắc: </h6>
                                            <Color colorData={aProductState?.color} />
                                        </div>
                                        <div className="py-2 d-flex justify-content-between border-bottom">
                                            <h6 className=" mb-0">Size: </h6>
                                            <div className="d-flex gap-5">
                                                {aProductState?.size.map((i) => (
                                                    <p key={i._id} className="mb-0">
                                                        {i.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Link
                                            className="button"
                                            to={`/product/${aProductState?.slug}/${aProductState?._id}`}
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-2 col-12">
                            <div className="d-flex align-items-center justify-content-center mt-5">
                                <h1>VS</h1>
                            </div>
                        </div>
                        {compare ? (
                            <div className="col-xl-5 col-md-5 col-12">
                                <div className="compare-card position-relative">
                                    <div className="p-3 bg-white rounded-3">
                                        <div className="compare-card-img">
                                            <img
                                                src={compare?.images[0]?.url}
                                                className="img-fluid w-100"
                                                alt="product"
                                            />
                                        </div>
                                        <div className="compare-detail p-3 bg-white">
                                            <div className="border-bottom">
                                                <h5 className="title">{compare?.name}</h5>
                                                <div className="my-3">
                                                    <StarRatings
                                                        rating={compare?.totalRating}
                                                        starRatedColor="#ffd700"
                                                        numberOfStars={5}
                                                        starDimension="18px"
                                                        starSpacing="1px"
                                                        name="rating"
                                                    />
                                                </div>
                                                <h6 className="price">
                                                    {compare?.tags == 'Sản phẩm đặc biệt' ? (
                                                        <>
                                                            <span>
                                                                {compare?.salePrice.toLocaleString('vi')}
                                                                <sup>đ</sup>
                                                            </span>
                                                            &nbsp;&nbsp;
                                                            <strike className="text-danger">
                                                                {compare?.price.toLocaleString('vi')}
                                                                <sup>đ</sup>
                                                            </strike>
                                                        </>
                                                    ) : (
                                                        <span>
                                                            {compare?.price.toLocaleString('vi')}
                                                            <sup>đ</sup>
                                                        </span>
                                                    )}
                                                </h6>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between flex-grow-1 border-bottom">
                                                <h6 className=" mb-0">Thương hiệu: </h6>
                                                <p className="mb-0">{compare?.brand?.name}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Số lượng: </h6>
                                                <p className="mb-0">{compare?.quantity}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Tags: </h6>
                                                <p className="mb-0">{compare?.tags}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className="">Màu sắc: </h6>
                                                <Color colorData={compare?.color} />
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Size: </h6>
                                                <div className="d-flex gap-5">
                                                    {compare?.size.map((i, index1) => (
                                                        <p key={index1} className="mb-0">
                                                            {i.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Link className="button" to={`/product/${compare?.slug}/${compare?._id}`}>
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="mt-5">
                        <h3>Sản phẩm tương tự</h3>
                        <div className="row my-4">
                            {compareList
                                ?.filter((value) => value._id != id)
                                ?.map((item, index) => (
                                    <div key={index} className="col-xl-3 col-md-3 col-12 mb-3">
                                        <div className="compare-card position-relative">
                                            <IoMdClose
                                                onClick={() =>
                                                    setCompareList(compareList.filter((value) => value != item))
                                                }
                                                className="position-absolute cross"
                                            />
                                            <div className="p-3 bg-white rounded-3">
                                                <div className="compare-card-img">
                                                    <img
                                                        src={item.images[0].url}
                                                        className="img-fluid w-100"
                                                        alt="product"
                                                    />
                                                </div>
                                                <div className="compare-detail p-3 bg-white">
                                                    <div className="border-bottom">
                                                        <h5 className="title">{item.name}</h5>
                                                        <div className="my-3">
                                                            <StarRatings
                                                                rating={item.totalRating}
                                                                starRatedColor="#ffd700"
                                                                numberOfStars={5}
                                                                starDimension="18px"
                                                                starSpacing="1px"
                                                                name="rating"
                                                            />
                                                        </div>
                                                        <h6 className="price">
                                                            {item.tags == 'Sản phẩm đặc biệt' ? (
                                                                <>
                                                                    <span>
                                                                        {item.salePrice.toLocaleString('vi')}
                                                                        <sup>đ</sup>
                                                                    </span>
                                                                    &nbsp;&nbsp;
                                                                    <strike className="text-danger">
                                                                        {item.price.toLocaleString('vi')}
                                                                        <sup>đ</sup>
                                                                    </strike>
                                                                </>
                                                            ) : (
                                                                <span>
                                                                    {item.price.toLocaleString('vi')}
                                                                    <sup>đ</sup>
                                                                </span>
                                                            )}
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button
                                                        className="button border-0"
                                                        onClick={() => setCompare(item)}
                                                    >
                                                        So sánh
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Compare;
