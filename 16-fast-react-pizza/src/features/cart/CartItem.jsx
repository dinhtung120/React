import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <p>
          {quantity}&times; {name}
        </p>
      </div>
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
