// Import Redux hook và action
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

// Import Button component
import Button from "../../ui/Button";

/**
 * Component DeleteItem - Button để xóa một pizza khỏi giỏ hàng
 * @param {number} pizzaId - ID của pizza cần xóa
 */
function DeleteItem({ pizzaId }) {
  // Hook để dispatch action
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
