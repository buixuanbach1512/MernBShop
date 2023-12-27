import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProducts, getProducts, resetState, updateProduct } from '../../features/product/productSlice';
import { deleteImg, resetStateUpload, uploadImg } from '../../features/upload/uploadSlice';
import { getBrands } from '../../features/brand/brandSlice';
import { getColors } from '../../features/color/colorSlice';
import { getSize } from '../../features/size/sizeSlice';
import { Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { getCategories } from '../../features/category/categorySlice';
import linearCategories from '../../utils/linearCategories';

let schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên sản phẩm!'),
    description: Yup.string().required('Chưa nhập mô tả!'),
    price: Yup.number().required('Chưa nhập giá sản phẩm!'),
    brand: Yup.string().required('Chưa chọn thương hiệu!'),
    category: Yup.string().required('Chưa chọn danh mục!'),
    tags: Yup.string().required('Chưa chọn Tags!'),
    quantity: Yup.number().required('Chưa nhập số lượng sản phẩm!'),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [colorP, setColorP] = useState(location.state?.color || []);
    const [size, setSize] = useState(location.state?.size || []);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const prodState = useSelector((state) => state.product);
    const colorState = useSelector((state) => state.color.colors);
    const sizeState = useSelector((state) => state.size.sizes);
    const uploadImgState = useSelector((state) => state?.upload?.images);
    const uploadState = useSelector((state) => state?.upload);
    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSize());
    }, [dispatch]);
    useEffect(() => {
        if (prodState.isSuccess && prodState.createdProduct) {
            toast.success('Thêm sản phẩm thành công!');
        }
        if (prodState.isSuccess && prodState.updatedProd) {
            toast.success('Cập nhật sản phẩm thành công!');
        }
        if (prodState.isError) {
            toast.error('Thất bại! Có lỗi xảy ra!');
        }
    }, [prodState]);

    const colorOpt = [];
    colorState.forEach((item) => {
        colorOpt.push({
            value: item._id,
            label: (
                <div className="d-flex align-items-center">
                    <div className="color" style={{ width: '25px', height: '25px', background: `${item.code}` }}></div>
                </div>
            ),
        });
    });
    const handleColor = (e) => {
        setColorP(e);
    };

    const sizeOpt = [];
    sizeState.forEach((item) => {
        sizeOpt.push({
            value: item._id,
            label: (
                <div className="d-flex align-items-center">
                    <div className="size">
                        <p>{item.name}</p>
                    </div>
                </div>
            ),
        });
    });
    const handleSize = (e) => {
        setSize(e);
    };

    const img = [];
    uploadImgState.forEach((item) => {
        img.push({
            url: item.url,
            public_id: item.public_id,
        });
    });

    useEffect(() => {
        setCategories(linearCategories(categoryState));
    }, [categoryState]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: location.state?.name || '',
            description: location.state?.description || '',
            price: location.state?.price || '',
            category: location.state?.category || '',
            tags: location.state?.tags || '',
            brand: location.state?.brand || '',
            quantity: location.state?.quantity || '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (location.state?.id !== undefined) {
                const productData = {
                    data: {
                        ...values,
                        color: colorP,
                        size: size,
                        images: uploadState.isSuccess ? img : location.state.images,
                    },
                    id: location.state.id,
                };
                dispatch(updateProduct(productData));
                formik.resetForm();
                setColorP([]);
                setSize([]);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(resetStateUpload());
                    navigate('/admin/products');
                }, 300);
            } else {
                const data = {
                    ...values,
                    color: colorP,
                    size: size,
                    images: img,
                };
                dispatch(createProducts(data));
                formik.resetForm();
                setColorP([]);
                setSize([]);
                setTimeout(() => {
                    dispatch(resetState());
                    dispatch(resetStateUpload());
                    navigate('/admin/products');
                }, 300);
            }
        },
    });
    return (
        <div className="content-wrapper bg-white p-5">
            <h3 className="mb-4">{location.state?.id !== undefined ? 'Sửa' : 'Thêm'} sản phẩm</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className="mt-3">
                    <div className="mt-3 form-floating">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            value={formik.values.name}
                            placeholder="Nhập tên sản phẩm ..."
                        />
                        <label className="label-input" htmlFor="name">
                            Nhập tên sản phẩm ...
                        </label>
                        <div className="error">{formik.touched.name && formik.errors.name}</div>
                    </div>
                    <div className="mt-3 form-floating">
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            onChange={formik.handleChange('price')}
                            onBlur={formik.handleBlur('price')}
                            value={formik.values.price}
                            placeholder="Nhập giá sản phẩm ..."
                        />
                        <label className="label-input" htmlFor="price">
                            Nhập giá sản phẩm ...
                        </label>
                        <div className="error">{formik.touched.price && formik.errors.price}</div>
                    </div>
                    <div className="mt-3 form-floating">
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            onChange={formik.handleChange('quantity')}
                            onBlur={formik.handleBlur('quantity')}
                            value={formik.values.quantity}
                            placeholder="Nhập số lượng sản phẩm ..."
                        />
                        <label className="label-input" htmlFor="quantity">
                            Nhập số lượng sản phẩm ...
                        </label>
                        <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>
                    </div>
                    <select
                        className="form-control py-3 mt-3"
                        name="category"
                        onChange={formik.handleChange('category')}
                        value={formik.values.category}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">{formik.touched.category && formik.errors.category}</div>
                    <select
                        className="form-control py-3 mt-3"
                        name="brand"
                        onChange={formik.handleChange('brand')}
                        value={formik.values.brand}
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
                    <div className="error">{formik.touched.brand && formik.errors.brand}</div>

                    <select
                        className="form-control py-3 mt-3"
                        name="tags"
                        onChange={formik.handleChange('tags')}
                        value={formik.values.tags}
                    >
                        <option value="">Chọn tags</option>
                        <option value="Sản phẩm nổi bật">Sản phẩm nổi bật</option>
                        <option value="Sản phẩm đặc biệt">Sản phẩm đặc biệt</option>
                        <option value="Sản phẩm bình thường">Sản phẩm bình thường</option>
                    </select>
                    <div className="error">{formik.touched.tags && formik.errors.tags}</div>

                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-3 fs-6"
                        placeholder="Chọn màu sản phẩm"
                        defaultValue={colorP}
                        onChange={(i) => handleColor(i)}
                        options={colorOpt}
                    />
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-3 fs-6"
                        placeholder="Chọn size sản phẩm"
                        defaultValue={size}
                        onChange={(i) => handleSize(i)}
                        options={sizeOpt}
                    />
                    <ReactQuill
                        theme="snow"
                        className="mt-3"
                        onChange={formik.handleChange('description')}
                        value={formik.values.description}
                    />

                    {location.state?.id && (
                        <div className="mt-3">
                            <p>Ảnh sản phẩm hiện tại:</p>
                            <div className="images d-flex flex-wrap gap-3 mt-3">
                                {location.state.images.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={item.url} alt="img-product" width={100} height={100} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="bg-primary border-1 p-3 text-white text-center mt-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="mb-0">Kéo thả một số file vào đây hoặc click để chọn file</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="images d-flex flex-wrap gap-3">
                        {img.map((item, index) => {
                            return (
                                <div className="position-relative" key={index}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(item.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: '2%', right: '2%' }}
                                    ></button>
                                    <img src={item.url} alt="img-product" width={100} height={100} />
                                </div>
                            );
                        })}
                    </div>

                    <button type="submit" className="btn btn-success border-0 rounded-3 my-3">
                        {location.state?.id !== undefined ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
