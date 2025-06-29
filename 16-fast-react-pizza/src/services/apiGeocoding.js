/**
 * Service function để lấy địa chỉ từ tọa độ GPS (latitude, longitude)
 * Sử dụng API của BigDataCloud để reverse geocoding
 * @param {Object} coords - Object chứa latitude và longitude
 * @param {number} coords.latitude - Vĩ độ
 * @param {number} coords.longitude - Kinh độ
 * @returns {Promise<Object>} - Promise resolve với object chứa thông tin địa chỉ
 * @throws {Error} - Throw error nếu API call thất bại
 */
export async function getAddress({ latitude, longitude }) {
  // Gọi API reverse geocoding với tọa độ được cung cấp
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  // Kiểm tra response có thành công không
  if (!res.ok) throw Error("Failed getting address");

  // Parse JSON data từ response
  const data = await res.json();
  return data;
}
