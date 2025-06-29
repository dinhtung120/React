// Import configureStore từ Redux Toolkit - công cụ tạo store đơn giản hơn
import { configureStore } from "@reduxjs/toolkit";

// Import các reducer từ các feature slice
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

// Tạo Redux store chính cho toàn bộ ứng dụng
const store = configureStore({
  reducer: {
    // State quản lý thông tin người dùng (tên, vị trí, địa chỉ)
    user: userReducer,
    // State quản lý giỏ hàng (danh sách pizza đã chọn, số lượng, giá)
    cart: cartReducer,
  },
});

export default store;
