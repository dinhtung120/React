// Import utility function để format currency
import { formatCurrency } from "../../utils/helpers";
// Import Redux hooks và actions
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
// Import các components cần thiết
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

/**
 * Component MenuItem - Hiển thị thông tin một pizza trong menu
 * @param {Object} pizza - Object chứa thông tin pizza
 */
function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  // Destructure thông tin pizza
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Lấy số lượng hiện tại của pizza này trong giỏ hàng
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Kiểm tra pizza đã có trong giỏ hàng chưa
  const isInCart = currentQuantity > 0;

  /**
   * Xử lý thêm pizza vào giỏ hàng
   */
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1, // Mặc định thêm 1 pizza
      unitPrice,
      totalPrice: unitPrice, // Ban đầu = unitPrice * 1
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      {/* Hình ảnh pizza */}
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />

      {/* Thông tin pizza */}
      <div className="flex grow flex-col pt-0.5">
        {/* Tên pizza */}
        <p className="font-medium">{name}</p>

        {/* Danh sách nguyên liệu */}
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>

        {/* Phần dưới: Giá và các button action */}
        <div className="mt-auto flex items-center justify-between text-sm">
          {/* Hiển thị giá hoặc "Sold out" */}
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium text-stone-500 uppercase">Sold out</p>
          )}

          {/* Nếu pizza đã có trong giỏ hàng -> hiển thị controls */}
          {isInCart && (
            <div className="flex items-center gap-5">
              {/* Component tăng/giảm số lượng */}
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              {/* Button xóa khỏi giỏ hàng */}
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {/* Nếu pizza chưa hết hàng và chưa có trong giỏ -> hiển thị "Add to cart" */}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
