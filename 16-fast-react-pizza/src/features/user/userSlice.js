// Import các thư viện Redux Toolkit cần thiết
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Import service để lấy địa chỉ từ tọa độ
import { getAddress } from "../../services/apiGeocoding";

// Hàm helper để lấy vị trí hiện tại của người dùng
function getPosition() {
  return new Promise(function (resolve, reject) {
    // Sử dụng Geolocation API để lấy tọa độ GPS
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Tạo async thunk để fetch địa chỉ người dùng
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress", // Tên action type
  async function () {
    // 1) Lấy vị trí GPS hiện tại của người dùng
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Sử dụng reverse geocoding API để chuyển đổi tọa độ thành địa chỉ
    // Điều này giúp người dùng có thể xem và chỉnh sửa địa chỉ nếu cần
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Trả về object chứa cả vị trí và địa chỉ
    return { position, address };
  },
);

// Trạng thái khởi tạo cho user slice
const initialState = {
  username: "", // Tên người dùng
  status: "idle", // Trạng thái loading: 'idle' | 'loading' | 'error'
  position: {}, // Tọa độ GPS của người dùng
  address: "", // Địa chỉ đầy đủ được chuyển đổi từ tọa độ
  error: "", // Thông báo lỗi nếu có
};

// Tạo user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // Các reducer đồng bộ
  reducers: {
    // Cập nhật tên người dùng
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
  // Xử lý các action bất đồng bộ từ fetchAddress thunk
  extraReducers: (builder) =>
    builder
      // Khi bắt đầu fetch địa chỉ
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      // Khi fetch địa chỉ thành công
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position; // Lưu tọa độ
        state.address = action.payload.address; // Lưu địa chỉ
        state.status = "idle"; // Reset trạng thái về idle
      })
      // Khi fetch địa chỉ thất bại
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = "Không thể lấy địa chỉ. Vui lòng thử lại sau.";
      }),
});

// Export action creators
export const { updateName } = userSlice.actions;

// Export reducer để đăng ký vào store
export default userSlice.reducer;
