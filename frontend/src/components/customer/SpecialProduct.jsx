import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const SpecialProduct = (props) => {
    const { item } = props;
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const navigate = useNavigate();
    const handleClick = (data) => {
        navigate(`/product/${data.slug}/${data._id}`, { state: data });
    };
    const countDownDate = new Date(item.dateSale).getTime();
    setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setDay(days);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
    }, 1000);
    return (
        <div key={item._id} className="col-xl-6 col-md-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between gap-10">
                    <div className="special-product-image w-50">
                        <button className=" bg-transparent border-0" onClick={() => handleClick(item)}>
                            <img className="img-fluid" src={item.images[0].url} alt="watch" />
                        </button>
                    </div>
                    <div className="special-product-content w-50">
                        <h5 className="brand">{item.brand.name}</h5>
                        <h6 className="title">{item.name}</h6>
                        <div className="mb-2">
                            <StarRatings
                                rating={item.totalRating}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="1px"
                                name="rating"
                            />
                        </div>
                        <p className="price">
                            <span className="red-p">
                                {item.salePrice.toLocaleString('vi')}
                                <sup>đ</sup>
                            </span>
                            &nbsp;&nbsp;
                            <strike className="text-danger">
                                {item.price.toLocaleString('vi')}
                                <sup>đ</sup>
                            </strike>
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10">
                            <p className="mb-0">
                                <b>{day} </b>ngày
                            </p>
                            <div className="d-flex gap-5 align-items-center">
                                <span className="badge rounded-circle p-3 bg-danger">{hour}</span>:
                                <span className="badge rounded-circle p-3 bg-danger">{minute}</span>:
                                <span className="badge rounded-circle p-3 bg-danger">{second}</span>
                            </div>
                        </div>
                        <div className="prod-count my-3">
                            <p>
                                {item.quantity} Sản Phẩm - Đã bán: {item.sold}
                            </p>
                            <div className="progress w-75">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    style={{ width: (item.quantity / (item.quantity + item.sold)) * 100 + '%' }}
                                    aria-valuenow={item.quantity / (item.quantity + item.sold)}
                                    aria-valuemin={item.quantity}
                                    aria-valuemax={item.sold + item.quantity}
                                ></div>
                            </div>
                        </div>
                        <button onClick={() => handleClick(item)} className="button border-0">
                            Xem sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
