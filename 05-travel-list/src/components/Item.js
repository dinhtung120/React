export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* Checkbox để đánh dấu đã đóng gói */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* Hiển thị vật phẩm với gạch ngang nếu đã đóng gói */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* Nút xóa vật phẩm */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
