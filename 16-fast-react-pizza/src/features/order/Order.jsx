// Test ID: IIDSAT

// Import React Router hooks để fetch data và load menu
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

// Import service để lấy order data
import { getOrder } from "../../services/apiRestaurant";

// Import utility functions
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

// Import components
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

/**
 * Component Order - Trang hiển thị chi tiết đơn hàng
 * Hiển thị thông tin order, danh sách pizza và cho phép cập nhật priority
 */
function Order() {
  // Lấy dữ liệu order từ loader function
  const order = useLoaderData();

  // Fetcher để load dữ liệu menu (để hiển thị ingredients)
  const fetcher = useFetcher();

  // Effect để fetch menu data nếu chưa có
  useEffect(
    function () {
      // Chỉ fetch khi chưa có data và fetcher đang idle
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Destructure thông tin order
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // Tính thời gian còn lại đến khi giao hàng
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Header với order ID và status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        {/* Badges hiển thị priority và status */}
        <div className="space-x-2">
          {/* Badge priority - chỉ hiển thị nếu order có priority */}
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-100 uppercase">
              Priority
            </span>
          )}
          {/* Badge status của order */}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-100 uppercase">
            {status} order
          </span>
        </div>
      </div>

      {/* Thông tin thời gian giao hàng */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-200 px-3 py-2">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Danh sách pizza trong order */}
      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"} // Loading state cho ingredients
            ingredients={
              // Tìm ingredients từ menu data đã fetch
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
          />
        ))}
      </ul>

      {/* Thông tin giá cả */}
      <div className="space-y-2 bg-stone-200 px-3 py-2">
        {/* Giá pizza */}
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>

        {/* Giá priority (nếu có) */}
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}

        {/* Tổng cộng */}
        <p className="font-bold text-stone-800">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {/* Button để thêm priority (chỉ hiển thị nếu order chưa có priority) */}
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

/**
 * Loader function - Fetch dữ liệu order trước khi component render
 * @param {Object} params - Route parameters chứa orderId
 * @returns {Promise<Object>} Order data
 */
export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
