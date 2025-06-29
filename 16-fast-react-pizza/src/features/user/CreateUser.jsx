// Import các hooks cần thiết
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import action và component
import { updateName } from "./userSlice";
import Button from "../../ui/Button";

/**
 * Component CreateUser - Form để người dùng nhập tên
 * Sau khi nhập tên, sẽ lưu vào Redux store và chuyển đến trang menu
 */
function CreateUser() {
  // State local để quản lý input tên
  const [username, setUsername] = useState("");

  // Hook để dispatch action lên Redux store
  const dispatch = useDispatch();

  // Hook để điều hướng trang
  const navigate = useNavigate();

  /**
   * Xử lý khi submit form
   * @param {Event} e - Event object
   */
  function handleSubmit(e) {
    e.preventDefault(); // Ngăn page reload

    // Kiểm tra tên có được nhập hay không
    if (!username) return;

    // Lưu tên vào Redux store
    dispatch(updateName(username));

    // Reset form
    setUsername("");

    // Chuyển đến trang menu
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Thông điệp chào mừng */}
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      {/* Input nhập tên */}
      <input
        className="input mb-7 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Chỉ hiển thị button khi đã nhập tên */}
      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
