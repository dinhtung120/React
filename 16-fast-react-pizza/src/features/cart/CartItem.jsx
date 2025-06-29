// Import Redux hooks và selector
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

// Import utility function và components
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

/**
 * Component CartItem - Hiển thị một pizza trong giỏ hàng
 * @param {Object} item - Object chứa thông tin pizza: pizzaId, name, quantity, totalPrice
 */
function CartItem({ item }) {
  // Destructure thông tin từ item
  const { pizzaId, name, quantity, totalPrice } = item;

  // Lấy số lượng hiện tại từ Redux store (để đảm bảo sync)
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="flex items-center justify-between py-3">
      {/* Thông tin pizza: số lượng x tên */}
      <div>
        <p>
          {quantity}&times; {name}
        </p>
      </div>

      {/* Phần bên phải: giá, controls tăng/giảm, button xóa */}
      <div className="flex items-center justify-between gap-6">
        {/* Tổng giá của pizza này */}
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        {/* Component tăng/giảm số lượng */}
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        {/* Button xóa pizza khỏi giỏ hàng */}
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
