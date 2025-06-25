import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const username = useSelector((state) => state.user.username);
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30"> First Name</span>
            <input
              className="input w-96"
              defaultValue={username}
              type="text"
              name="customer"
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30"> Phone number</span>
            <div>
              <input className="input w-96" type="tel" name="phone" required />
              {formErrors?.phone && (
                <p className="mt-2 rounded-xl bg-red-50 p-2 text-center text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </label>
        </div>

        <div className="mb-3">
          <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="sm:basis-30">Address</span>
            <input className="input w-96" type="text" name="address" required />
          </label>
        </div>

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

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order ..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
