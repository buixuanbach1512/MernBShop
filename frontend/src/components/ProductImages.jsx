import { useState } from 'react';

const ProductImages = (props) => {
    const { item } = props;
    const [mainImage, setMainImage] = useState(0);
    return (
        <div className="col-12 col-xl-6 product-images">
            <div className="main-product-image">
                <div>
                    <img className="img-fluid" src={item[mainImage].url} alt="main-img" />
                </div>
            </div>
            <div className="other-product-image d-flex flex-wrap gap-15">
                {item.map((i, index) => (
                    <div key={index}>
                        <img className="img-fluid" src={i.url} alt="other-img" onClick={() => setMainImage(index)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
