import { useState } from "react";

export default function Form({ onAddItems }) {
  // Quản lý mô tả của vật phẩm
  const [description, setDescription] = useState("");
  // Quản lý số lượng của vật phẩm
  const [quantity, setQuantity] = useState(1);

  // Xử lý khi form được submit
  function handleSubmit(e) {
    e.preventDefault();
    // Kiểm tra nếu không có mô tả thì không thêm vào danh sách
    if (!description) return;

    // Tạo vật phẩm mới với id là timestamp hiện tại
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    // Reset form sau khi thêm
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
