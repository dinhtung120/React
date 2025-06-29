// Import Link để tạo liên kết điều hướng
import { Link } from "react-router-dom";
// Import các component con
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

/**
 * Component Header - Thanh navigation chính của ứng dụng
 * Bao gồm: Logo/Brand name, Search order, Username
 */
function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase">
      {/* Logo/Brand name - click để về trang chủ */}
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      {/* Component tìm kiếm đơn hàng */}
      <SearchOrder />

      {/* Hiển thị tên người dùng */}
      <Username />
    </header>
  );
}

export default Header;
