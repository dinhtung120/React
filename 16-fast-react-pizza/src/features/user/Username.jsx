// Import hook để lấy dữ liệu từ Redux store
import { useSelector } from "react-redux";

/**
 * Component hiển thị tên user trong header
 * Chỉ hiển thị khi có username và trên màn hình medium trở lên
 */
function Username() {
  // Lấy username từ Redux store
  const username = useSelector((state) => state.user.username);

  // Không render gì nếu chưa có username
  if (!username) return null;

  return (
    // Hiển thị username, ẩn trên mobile (hidden), hiện trên md+ (md:block)
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
