// Import các components UI
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

// Import Redux hooks và actions
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

/**
 * Component Cart - Trang hiển thị giỏ hàng
 * Hiển thị danh sách pizza đã chọn, tổng cộng và các button action
 */
function Cart() {
  // Lấy danh sách pizza trong giỏ hàng từ Redux store
  const cart = useSelector(getCart);

  // Lấy tên người dùng để hiển thị
  const username = useSelector((state) => state.user.username);

  // Hook để dispatch actions
  const dispatch = useDispatch();

  // Nếu giỏ hàng trống, hiển thị component EmptyCart
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      {/* Link quay lại trang menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Tiêu đề với tên người dùng */}
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {/* Danh sách pizza trong giỏ hàng */}
      <ul className="mt-2 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      {/* Các button action */}
      <div className="mt-6 flex items-center justify-between space-x-2 text-center">
        {/* Button đặt hàng - chuyển đến trang tạo order */}
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        {/* Button xóa toàn bộ giỏ hàng */}
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
