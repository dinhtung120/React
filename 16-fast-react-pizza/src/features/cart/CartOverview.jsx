// Import Redux hooks và selectors
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

// Import utilities và components
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

/**
 * Component CartOverview - Thanh overview hiển thị tóm tắt giỏ hàng
 * Hiển thị ở cuối trang, chứa tổng số pizza và tổng giá
 * Chỉ hiển thị khi có ít nhất 1 pizza trong giỏ hàng
 */
function CartOverview() {
  // Lấy tổng số lượng pizza trong giỏ hàng
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  // Lấy tổng giá trị giỏ hàng
  const totalCartPrice = useSelector(getTotalCartPrice);

  // Nếu giỏ hàng trống, không hiển thị gì
  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-300">
      {/* Hiển thị tổng số pizza và tổng giá */}
      <p className="space-x-4 font-semibold text-stone-400">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>

      {/* Link để mở trang giỏ hàng chi tiết */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
