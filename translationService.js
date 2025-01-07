const GOOGLE_API_KEY = process.env.EXPO_GOOGLE_API_KEY; // Thay bằng API Key của bạn
const TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Hàm dịch nội dung
 * @param {string} text - Nội dung cần dịch
 * @param {string} targetLanguage - Mã ngôn ngữ đích (ví dụ: 'vi' cho tiếng Việt)
 * @returns {Promise<string>} - Nội dung đã được dịch
 */
async function translateText(text, targetLanguage) {
  if (!text || typeof text !== 'string') {
    throw new Error('Nội dung cần dịch phải là một chuỗi hợp lệ');
  }
  if (!targetLanguage || typeof targetLanguage !== 'string') {
    throw new Error('Ngôn ngữ đích phải là một mã ngôn ngữ hợp lệ');
  }

  try {
    const response = await fetch(`${TRANSLATE_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });

    // Kiểm tra trạng thái HTTP
    if (!response.ok) {
      throw new Error(`API trả về lỗi: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();

    // Kiểm tra dữ liệu trả về từ API
    if (data.error) {
      throw new Error(`Lỗi từ API: ${data.error.message}`);
    }

    if (data && data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
    }

    throw new Error('Dữ liệu trả về không hợp lệ hoặc không có bản dịch');
  } catch (error) {
    console.error('Lỗi khi dịch nội dung:', error.message);
    throw error;  // Ném lỗi để xử lý tiếp
  }
}

// Đảm bảo hàm translateText được xuất khẩu đúng cách
export { translateText };