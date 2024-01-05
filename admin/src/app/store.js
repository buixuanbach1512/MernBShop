import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import categoryReducer from '../features/category/categorySlice';
import colorReducer from '../features/color/colorSlice';
import couponReducer from '../features/coupon/couponSlice';
import uploadReducer from '../features/upload/uploadSlice';
import orderReducer from '../features/order/orderSlice';
import sizeReducer from '../features/size/sizeSlice';
import roleReducer from '../features/role/roleSlice';
import contactReducer from '../features/contact/contactSlice';
import provinceReducer from '../features/province/provinceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        category: categoryReducer,
        color: colorReducer,
        size: sizeReducer,
        coupon: couponReducer,
        upload: uploadReducer,
        order: orderReducer,
        role: roleReducer,
        contact: contactReducer,
        province: provinceReducer,
    },
});
