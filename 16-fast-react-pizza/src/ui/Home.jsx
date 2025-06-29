// Import hook để lấy dữ liệu từ Redux store
import { useSelector } from "react-redux";
// Import các component cần thiết
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

/**
 * Component Home - Trang chủ của ứng dụng
 * Hiển thị welcome message và form nhập tên (nếu chưa có) hoặc button tiếp tục
 */
function Home() {
  // Lấy username từ Redux store
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 text-center sm:my-16">
      {/* Tiêu đề chính và slogan */}
      <h1 className="mb-8 text-xl font-semibold uppercase md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* Conditional rendering: */}
      {/* Nếu chưa có username -> hiển thị form nhập tên */}
      {/* Nếu đã có username -> hiển thị button tiếp tục với tên người dùng */}
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
