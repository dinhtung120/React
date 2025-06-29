// Import Link từ React Router để tạo button có thể điều hướng
import { Link } from "react-router-dom";

/**
 * Component Button tái sử dụng với nhiều style khác nhau
 * @param {React.ReactNode} children - Nội dung hiển thị trong button
 * @param {boolean} disabled - Có disable button hay không
 * @param {string} to - Đường dẫn để điều hướng (nếu có thì sẽ render Link thay vì button)
 * @param {string} type - Loại style: 'primary', 'small', 'round', 'secondary'
 * @param {Function} onClick - Hàm xử lý khi click button
 */
function Button({ children, disabled, to, type, onClick }) {
  // CSS classes cơ bản được chia sẻ cho tất cả các loại button
  const base =
    "text-sm inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ";

  // Định nghĩa các style khác nhau cho button
  const styles = {
    // Button chính - màu vàng, kích thước trung bình
    primary: base + "px-3 py-2 md:px-4 md:py-3",

    // Button nhỏ - dùng cho các action phụ
    small: base + "px-2 py-1 md:px-3 md:py-2 text-xs ",

    // Button tròn - dùng cho các action đơn lẻ như +, -
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm ",

    // Button phụ - viền xám, background trong suốt
    secondary:
      "text-sm px-3 py-2 md:px-3.5 md:py-2.5 inline-block rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 focus:text-stone-700 hover:text-stone-700 uppercase transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ",
  };

  // Nếu có prop 'to', render Link component để điều hướng
  if (to)
    return (
      <Link to={to} className={styles[type]} disabled={disabled}>
        {children}
      </Link>
    );

  // Nếu có prop 'onClick', render button với event handler
  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  // Trường hợp mặc định: render button thông thường
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
