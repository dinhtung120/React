// Import hook để lấy thông tin lỗi từ React Router
import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

/**
 * Component hiển thị trang lỗi khi có exception xảy ra
 * Được sử dụng làm errorElement trong React Router
 */
function Error() {
  // Lấy thông tin lỗi từ React Router
  const error = useRouteError();

  // Log lỗi để debug (có thể remove trong production)
  console.log(error);

  return (
    <div>
      {/* Tiêu đề thông báo lỗi */}
      <h1>Something went wrong 😢</h1>

      {/* Hiển thị message lỗi - ưu tiên error.data, fallback về error.message */}
      <p>{error.data || error.message}</p>

      {/* Button quay lại trang trước */}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
