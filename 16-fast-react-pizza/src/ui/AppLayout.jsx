// Import các component UI cần thiết
import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

/**
 * Component AppLayout - Layout chính của toàn bộ ứng dụng
 * Bao gồm: Header, vùng nội dung chính, CartOverview và Loader
 */
function AppLayout() {
  // Hook để theo dõi trạng thái navigation (loading khi chuyển trang)
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* Hiển thị loader khi đang chuyển trang hoặc fetch data */}
      {isLoading && <Loader />}

      {/* Header chứa logo, search và tên user */}
      <Header />

      {/* Vùng nội dung chính - có thể scroll */}
      <div className="overflow-scroll bg-stone-50">
        <main className="mx-auto max-w-3xl">
          {/* Outlet: Nơi render các component page tương ứng với route */}
          <Outlet />
        </main>
      </div>

      {/* Cart overview - hiển thị thông tin giỏ hàng ở cuối trang */}
      <CartOverView />
    </div>
  );
}

export default AppLayout;
