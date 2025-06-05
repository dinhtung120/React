import { useState } from "react";
import Logo from "./Logo";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Form from "./Form";

export default function App() {
  // Quản lý danh sách các vật phẩm cần mang theo
  const [items, setItems] = useState([]);

  // Thêm vật phẩm mới vào danh sách
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Xóa một vật phẩm khỏi danh sách dựa vào id
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Đánh dấu vật phẩm đã được đóng gói hoặc chưa
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Xóa toàn bộ danh sách sau khi xác nhận
  function handleClearList() {
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if (!confirm) return;

    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
