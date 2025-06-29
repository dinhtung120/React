// Import các hooks và utilities từ React Router
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
// Import service để tạo order
import { createOrder } from "../../services/apiRestaurant";
// Import Redux hooks và actions
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
// Import React hooks và utilities
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
// Import components
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
// Import store để access trong action function
import store from "../../store";

// Regex để validate số điện thoại
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/**
 * Component CreateOrder - Form để tạo đơn hàng mới
 * Cho phép người dùng nhập thông tin giao hàng và tạo order
 */
function CreateOrder() {
  // Lấy thông tin user từ Redux store
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  // Kiểm tra xem đang loading địa chỉ hay không
  const isLoadingAddress = addressStatus === "loading";

  // State local cho checkbox priority
  const [withPriority, setWithPriority] = useState(false);

  // Hook để theo dõi trạng thái navigation (form submission)
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Lấy lỗi validation từ action function (nếu có)
  const formErrors = useActionData();

  // Lấy thông tin giỏ hàng từ Redux store
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // Tính giá priority (20% của tổng giá nếu chọn priority)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  // Nếu giỏ hàng trống, hiển thị EmptyCart component
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      {/* Tiêu đề trang */}
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* Form tạo đơn hàng - sử dụng React Router Form */}
      <Form method="POST">
        {/* Field nhập tên */}
        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30"> First Name</span>
            <input
              className="input w-96"
              defaultValue={username} // Pre-fill từ Redux store
              type="text"
              name="customer"
              required
            />
          </label>
        </div>

        {/* Field nhập số điện thoại */}
        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30"> Phone number</span>
            <div>
              <input className="input w-96" type="tel" name="phone" required />
              {/* Hiển thị lỗi validation số điện thoại */}
              {formErrors?.phone && (
                <p className="mt-2 rounded-xl bg-red-50 p-2 text-center text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Field nhập địa chỉ với button "Get position" */}
        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30">Address</span>
            <div className="w-96">
              <div className="relative">
                <input
                  className="input w-full pr-28"
                  type="text"
                  name="address"
                  disabled={isLoadingAddress} // Disable khi đang fetch địa chỉ
                  defaultValue={address} // Pre-fill từ Redux store
                  required
                />
                {/* Button "Get position" - chỉ hiển thị khi chưa có tọa độ */}
                {!position.latitude && !position.longitude && (
                  <div className="absolute top-1/2 right-1 -translate-y-1/2">
                    <Button
                      disabled={isLoadingAddress}
                      type="small"
                      onClick={(e) => {
                        e.preventDefault(); // Ngăn form submit
                        dispatch(fetchAddress()); // Fetch địa chỉ từ GPS
                      }}
                    >
                      Get position
                    </Button>
                  </div>
                )}
              </div>
              {/* Hiển thị lỗi khi không thể lấy địa chỉ */}
              {addressStatus === "error" && (
                <p className="mt-2 rounded-xl bg-red-50 p-2 text-center text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Checkbox priority */}
        <div className="mb-6 flex items-center gap-3">
          <input
            className="h-5 w-5 accent-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        {/* Hidden fields và submit button */}
        <div>
          {/* Hidden field chứa dữ liệu giỏ hàng dưới dạng JSON */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* Hidden field chứa tọa độ GPS (nếu có) */}
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          {/* Submit button */}
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order ..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

/**
 * Action function - Chạy khi form được submit
 * Xử lý validation và tạo order mới
 * @param {Object} request - Request object chứa form data
 * @returns {Object|Response} Errors object hoặc redirect response
 */
export async function action({ request }) {
  // Lấy dữ liệu từ form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Tạo object order từ form data
  const order = {
    ...data,
    cart: JSON.parse(data.cart), // Parse JSON string thành array
    priority: data.priority === "true", // Convert string thành boolean
  };

  // Validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  // Nếu có lỗi, trả về errors để hiển thị trong form
  if (Object.keys(errors).length > 0) return errors;

  // Tạo order qua API
  const newOrder = await createOrder(order);

  // Xóa giỏ hàng sau khi tạo order thành công
  store.dispatch(clearCart());

  // Redirect đến trang chi tiết order
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
