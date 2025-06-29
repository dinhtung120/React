// Import utility function để format tiền tệ
import { formatCurrency } from "../../utils/helpers";

/**
 * Component hiển thị từng item trong đơn hàng
 * @param {Object} item - Object chứa thông tin item (quantity, name, totalPrice)
 * @param {boolean} isLoadingIngredients - Trạng thái loading ingredients
 * @param {Array} ingredients - Mảng chứa danh sách nguyên liệu của pizza
 */
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  // Destructure các thuộc tính cần thiết từ item
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      {/* Container chính chứa thông tin cơ bản */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        {/* Tên pizza với số lượng */}
        <p className="min-w-[200px]">
          <span className="font-medium">{quantity}&times;</span> {name}
        </p>
        {/* Giá tiền đã format */}
        <p className="font-medium">{formatCurrency(totalPrice)}</p>
      </div>

      {/* Hiển thị danh sách nguyên liệu hoặc loading state */}
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
