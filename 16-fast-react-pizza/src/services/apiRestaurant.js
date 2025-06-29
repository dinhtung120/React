// URL của API backend
const API_URL = "https://react-fast-pizza-api.jonas.io/api";

/**
 * Lấy danh sách menu pizza từ API
 * @returns {Promise<Array>} Danh sách pizza với thông tin: id, name, unitPrice, ingredients, soldOut, imageUrl
 * @throws {Error} Lỗi khi không thể fetch menu
 */
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch() không tự động throw error với status 4xx/5xx, cần kiểm tra thủ công
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

/**
 * Lấy thông tin chi tiết một order theo ID
 * @param {string} id - ID của order cần lấy
 * @returns {Promise<Object>} Thông tin order: id, status, priority, cart, orderPrice, etc.
 * @throws {Error} Lỗi khi không tìm thấy order
 */
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

/**
 * Tạo order mới
 * @param {Object} newOrder - Thông tin order mới
 * @param {string} newOrder.customer - Tên khách hàng
 * @param {string} newOrder.phone - Số điện thoại
 * @param {string} newOrder.address - Địa chỉ giao hàng
 * @param {boolean} newOrder.priority - Có ưu tiên hay không
 * @param {Array} newOrder.cart - Danh sách pizza trong order
 * @returns {Promise<Object>} Thông tin order đã tạo
 * @throws {Error} Lỗi khi không thể tạo order
 */
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

/**
 * Cập nhật order (ví dụ: thêm priority)
 * @param {string} id - ID của order cần cập nhật
 * @param {Object} updateObj - Object chứa dữ liệu cần cập nhật
 * @param {boolean} updateObj.priority - Priority mới
 * @throws {Error} Lỗi khi không thể cập nhật order
 */
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // Không cần return data vì chỉ cập nhật
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
