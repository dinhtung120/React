// Import các hook và component cần thiết từ React Router
import { Link, useNavigate } from "react-router-dom";

/**
 * Component button dạng link có thể điều hướng
 * @param {ReactNode} children - Nội dung hiển thị trong button
 * @param {string} to - Đường dẫn điều hướng hoặc "-1" để quay lại trang trước
 */
function LinkButton({ children, to }) {
  // Hook để điều hướng programmatically
  const navigate = useNavigate();

  // Style chung cho button dạng link
  const className = "text-sm text-blue-400 hover:text-blue-600 hover:underline";

  // Nếu to = "-1" thì render button quay lại trang trước
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  // Ngược lại render Link component bình thường
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
