// Import LinkButton component
import LinkButton from "../../ui/LinkButton";

/**
 * Component EmptyCart - Hiển thị khi giỏ hàng trống
 * Hiển thị thông báo và link quay lại menu để thêm pizza
 */
function EmptyCart() {
  return (
    <div className="px-4 py-3">
      {/* Link quay lại menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Thông báo giỏ hàng trống */}
      <p className="mt-5 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
