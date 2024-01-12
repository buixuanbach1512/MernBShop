import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { compareProduct } from '../../features/product/productSlice';
import { Link, useLocation } from 'react-router-dom';
import Color from '../../components/customer/ColorList';
import StarRatings from 'react-star-ratings';

const Compare = () => {
    const [compareList, setCompareList] = useState();
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const compareListState = useSelector((state) => state?.product?.compareList);
    useEffect(() => {
        dispatch(compareProduct(id));
    }, [dispatch, id]);
    useEffect(() => {
        setCompareList(compareListState);
    }, [compareListState]);
    return (
        <>
            <Meta title={'So sánh sản phẩm'} />
            <BreadCrumb title="So sánh sản phẩm" />
            <div className="widhlist-wrapper home-wrapper-2 py-5">
                <div className="container">
                    <div className="row">
                        {compareList?.map((item, index) => (
                            <div key={index} className="col-xl-3 col-md-3 col-12 mb-3">
                                <div className="compare-card position-relative">
                                    <IoMdClose
                                        onClick={() => setCompareList(compareList.filter((value) => value != item))}
                                        className="position-absolute cross"
                                    />
                                    <div className="p-3 bg-white rounded-3">
                                        <div className="compare-card-img">
                                            <img src={item.images[0].url} className="img-fluid w-100" alt="product" />
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
                                            <div className="py-2 d-flex justify-content-between flex-grow-1 border-bottom">
                                                <h6 className=" mb-0">Thương hiệu: </h6>
                                                <p className="mb-0">{item.brand.name}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Số lượng: </h6>
                                                <p className="mb-0">{item.quantity}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Tags: </h6>
                                                <p className="mb-0">{item.tags}</p>
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className="">Màu sắc: </h6>
                                                <Color colorData={item.color} />
                                            </div>
                                            <div className="py-2 d-flex justify-content-between border-bottom">
                                                <h6 className=" mb-0">Size: </h6>
                                                <div className="d-flex gap-5">
                                                    {item.size.map((i) => (
                                                        <p key={i._id} className="mb-0">
                                                            {i.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Link className="button" to={`/product/${item.slug}/${item._id}`}>
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Compare;
