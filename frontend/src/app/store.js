import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import contactReducer from '../features/contact/contactSlice';
import colorReducer from '../features/color/colorSlice';
import couponReducer from '../features/coupon/couponSlice';
import provinceReducer from '../features/province/provinceSlice';
import brandReducer from '../features/brand/brandSlice';
import sizeReducer from '../features/size/sizeSlice';
import uploadReducer from '../features/upload/uploadSlice';
import orderReducer from '../features/order/orderSlice';
import roleReducer from '../features/role/roleSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        contact: contactReducer,
        color: colorReducer,
        coupon: couponReducer,
        province: provinceReducer,
        brand: brandReducer,
        size: sizeReducer,
        upload: uploadReducer,
        order: orderReducer,
        role: roleReducer,
    },
});
