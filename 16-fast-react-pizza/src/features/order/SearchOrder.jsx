// Import các hook cần thiết
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component tìm kiếm đơn hàng theo ID
 * Hiển thị trong header để user có thể tìm kiếm order nhanh chóng
 */
function SearchOrder() {
  // State lưu trữ giá trị input tìm kiếm
  const [query, setQuery] = useState("");

  // Hook để điều hướng đến trang order khi tìm thấy
  const navigate = useNavigate();

  /**
   * Xử lý khi submit form tìm kiếm
   * @param {Event} e - Event object từ form submit
   */
  function handleSubmit(e) {
    e.preventDefault(); // Ngăn reload trang
    if (!query) return; // Không làm gì nếu input rỗng

    // Điều hướng đến trang chi tiết order với ID đã nhập
    navigate(`/order/${query}`);

    // Reset input sau khi tìm kiếm
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
