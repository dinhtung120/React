// Import Redux hook và actions
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

// Import Button component
import Button from "../../ui/Button";

/**
 * Component UpdateItemQuantity - Controls để tăng/giảm số lượng pizza
 * @param {number} pizzaId - ID của pizza cần cập nhật
 * @param {number} currentQuantity - Số lượng hiện tại
 */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      {/* Button giảm số lượng */}
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>

      {/* Hiển thị số lượng hiện tại */}
      <span className="text-sm font-medium">{currentQuantity}</span>

      {/* Button tăng số lượng */}
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
