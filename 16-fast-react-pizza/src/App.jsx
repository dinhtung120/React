// Import các thư viện cần thiết cho routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import các component pages
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

// Import layout và error components
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// Cấu hình router cho toàn bộ ứng dụng
const router = createBrowserRouter([
  {
    // Layout chính của ứng dụng, bao bọc tất cả các route con
    element: <AppLayout />,
    // Component hiển thị khi có lỗi xảy ra
    errorElement: <Error />,

    // Định nghĩa các route con
    children: [
      // Trang chủ - Route gốc "/"
      { path: "/", element: <Home /> },

      // Trang menu - Hiển thị danh sách pizza
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // Hàm load dữ liệu menu trước khi render
        errorElement: <Error />, // Xử lý lỗi riêng cho trang menu
      },

      // Trang giỏ hàng - Hiển thị các item đã chọn
      { path: "/cart", element: <Cart /> },

      // Trang tạo đơn hàng mới
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction, // Hàm xử lý khi submit form tạo order
      },

      // Trang chi tiết đơn hàng - orderId là parameter động
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader, // Load dữ liệu order theo ID
        errorElement: <Error />,
        action: updateOrderAction, // Hàm xử lý cập nhật order (ví dụ: thêm priority)
      },
    ],
  },
]);

// Component App chính - Entry point của ứng dụng
function App() {
  // RouterProvider cung cấp routing context cho toàn bộ app
  return <RouterProvider router={router} />;
}

export default App;
