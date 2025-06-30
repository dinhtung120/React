// Import các thư viện và component cần thiết
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

/**
 * Component cập nhật đơn hàng thành priority
 * Hiện tại không sử dụng order prop nhưng có thể cần trong tương lai
 */
function UpdateOrder() {
  // Hook fetcher để submit form mà không cần navigate
  const fetcher = useFetcher();

  return (
    // Form sử dụng PATCH method để cập nhật order
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

/**
 * Action function được gọi khi form được submit
 * Cập nhật order thành priority order
 * @param {Object} params - Object chứa params từ React Router (chứa orderId)
 * @returns {null} - Trả về null sau khi cập nhật thành công
 */
export async function action({ params }) {
  // Dữ liệu cần cập nhật - set priority = true
  const data = { priority: true };

  // Gọi API cập nhật order với orderId từ params
  await updateOrder(params.orderId, data);

  return null;
}
