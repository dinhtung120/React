// Import createSlice từ Redux Toolkit để tạo slice đơn giản
import { createSlice } from "@reduxjs/toolkit";

// Trạng thái khởi tạo của giỏ hàng
const initialState = {
  // Mảng chứa các pizza đã được thêm vào giỏ hàng
  cart: [],
};

// Tạo cart slice với các reducer functions
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm một pizza mới vào giỏ hàng
    addItem(state, action) {
      // action.payload = newItem (object chứa thông tin pizza mới)
      state.cart.push(action.payload);
    },

    // Xóa một pizza khỏi giỏ hàng
    deleteItem(state, action) {
      // action.payload = pizzaId (ID của pizza cần xóa)
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    // Tăng số lượng của một pizza trong giỏ hàng
    increaseItemQuantity(state, action) {
      // action.payload = pizzaId (ID của pizza cần tăng số lượng)
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++; // Tăng số lượng lên 1
      item.totalPrice = item.quantity * item.unitPrice; // Cập nhật tổng giá
    },

    // Giảm số lượng của một pizza trong giỏ hàng
    decreaseItemQuantity(state, action) {
      // action.payload = pizzaId (ID của pizza cần giảm số lượng)
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--; // Giảm số lượng xuống 1
      item.totalPrice = item.quantity * item.unitPrice; // Cập nhật tổng giá

      // Nếu số lượng = 0, tự động xóa pizza khỏi giỏ hàng
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.cart = initialState.cart; // Reset về trạng thái ban đầu
    },
  },
});

// Export các action creators để sử dụng trong components
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer để đăng ký vào store
export default cartSlice.reducer;

// === SELECTOR FUNCTIONS ===
// Các hàm selector để lấy dữ liệu từ state một cách tiện lợi

// Lấy toàn bộ giỏ hàng
export const getCart = (state) => state.cart.cart;

// Tính tổng số lượng tất cả pizza trong giỏ hàng
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Tính tổng giá trị của toàn bộ giỏ hàng
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Lấy số lượng của một pizza cụ thể trong giỏ hàng
// Trả về 0 nếu pizza không có trong giỏ hàng
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
