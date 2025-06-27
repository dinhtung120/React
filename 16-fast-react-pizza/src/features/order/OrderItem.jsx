import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <p className="min-w-[200px]">
          <span className="font-medium">{quantity}&times;</span> {name}
        </p>
        <p className="font-medium">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
