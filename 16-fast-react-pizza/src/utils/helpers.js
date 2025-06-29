/**
 * Format số tiền thành dạng tiền tệ EUR
 * @param {number} value - Giá trị số cần format
 * @returns {string} Chuỗi đã được format (ví dụ: "€12.50")
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/**
 * Format ngày giờ thành dạng dễ đọc
 * @param {string} dateStr - Chuỗi ngày giờ ISO
 * @returns {string} Ngày giờ đã format (ví dụ: "12 Dec, 14:30")
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

/**
 * Tính số phút còn lại từ thời điểm hiện tại đến thời điểm được chỉ định
 * @param {string} dateStr - Chuỗi ngày giờ ISO của thời điểm đích
 * @returns {number} Số phút còn lại (âm nếu đã quá thời gian)
 */
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime(); // Thời gian hiện tại
  const d2 = new Date(dateStr).getTime(); // Thời gian đích
  return Math.round((d2 - d1) / 60000); // Chuyển đổi từ milliseconds sang phút
}
