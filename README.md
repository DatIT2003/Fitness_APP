# Fitness_APP

**Fitness_APP** là một ứng dụng hỗ trợ người dùng tập luyện trong phòng gym. Ứng dụng cung cấp các tính năng như hiển thị bài tập, nhận diện dụng cụ tập gym, dịch ngôn ngữ, hỗ trợ dinh dưỡng, và nhiều hơn nữa để giúp người dùng tập luyện hiệu quả.

---

## 🚀 Features

### 1. **Hiển thị bài tập**
- Sử dụng **Rapid API** để tra cứu và hiển thị các bài tập gym chi tiết theo từng nhóm cơ.

### 2. **Nhận diện dụng cụ tập gym**
- Phân tích hình ảnh và cung cấp thông tin chi tiết về dụng cụ tập luyện.
- Tích hợp **Gemini API** để nhận diện thông minh.

### 3. **Dịch ngôn ngữ**
- Sử dụng **Google API** để dịch mô tả bài tập và thông tin dụng cụ sang các ngôn ngữ khác.

### 4. **Hỗ trợ dinh dưỡng**
- Sử dụng **Food API** để cung cấp thông tin về thực phẩm, hàm lượng calo, và chế độ ăn.

### 5. **Tích hợp Firebase**
- Đăng nhập/Đăng ký người dùng.
- Lưu trữ hình ảnh và dữ liệu trên **Firebase Storage**.
- Sử dụng **Firestore** để quản lý dữ liệu người dùng.

### 6. **Chat AI**
- Sử dụng **Cohere API** để hỗ trợ người dùng chat về chế độ ăn uống và kế hoạch tập luyện.

### 7. **Giao diện thân thiện**
- Tích hợp thay đổi chủ đề (Theme) giữa chế độ tối và sáng.
- Giao diện phản hồi tốt, hiển thị đẹp trên mọi thiết bị.

---

## 🛠️ Technologies Used

- **React Native**: Xây dựng giao diện người dùng.
- **Expo**: Cung cấp môi trường phát triển nhanh.
- **Firebase**: Quản lý người dùng, lưu trữ dữ liệu và hình ảnh.
- **Gemini API**: Phân tích hình ảnh dụng cụ tập gym.
- **Rapid API**: Hiển thị danh sách bài tập chi tiết.
- **Food API**: Tra cứu thông tin thực phẩm và calo.
- **Google API**: Dịch mô tả bài tập và thông tin dụng cụ.
- **Cohere API**: Chat hướng dẫn tập luyện và chế độ ăn uống.
- **React Navigation**: Điều hướng trong ứng dụng.
- **react-native-modal**: Hiển thị các modal tùy chỉnh.
- **react-native-responsive-screen**: Đảm bảo giao diện phản hồi tốt.

---

## 🔑 Environment Variables

Dự án sử dụng các API Key được lưu trong tệp `.env`. Đây là danh sách các biến môi trường:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=Reac-navite-app-with-firebase
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=Reac-navite-app-with-firebase.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=...
EXPO_RAPID_API_KEY=...
EXPO_GEMINI_API_KEY=...
EXPO_FOOD_API_KEY=...
EXPO_COHERE_API_KEY=...
EXPO_GOOGLE_API_KEY.

---

## 💾 Installation

Yêu cầu:
Node.js: >= 14.x
npm hoặc yarn
Expo CLI: Cài đặt bằng lệnh:
npm install -g expo-cli
-Android Studio hoặc Xcode (nếu chạy trên thiết bị thật)
1.Các bước cài đặt:
Clone Repository:
git clone https://github.com/DatIT2003/Fitness_APP.git
cd Fitness_APP
2. Cài đặt các phụ thuộc: Sử dụng npm:
npm install hoặc yarn install
3. Cấu hình Api key
tạo tệp .env trong thư mục gốc 
4. Khỏi chạy ứng dụng
Trên Androi npm start hoặc npx expo start
Trên IOS yarn start hoặc npx expo start --ios.

---

## 💡 Usage

(Phần này mô tả cách sử dụng ứng dụng sau khi đã được cài đặt và khởi chạy thành công.)
Tính năng chính:
Hiển thị bài tập:

Truy cập vào màn hình Bài tập.
Ứng dụng sẽ hiển thị danh sách bài tập theo từng nhóm cơ, bao gồm:
Tên bài tập
Mô tả ngắn
Hình minh họa
Nhận diện dụng cụ tập gym:

Nhấp vào nút CHỌN ẢNH để tải lên hình ảnh dụng cụ tập luyện.
Nhấp vào nút NHẬN DIỆN DỤNG CỤ để phân tích.
Kết quả sẽ hiển thị:
Tên dụng cụ
Nhóm cơ chính được tập
Mô tả ngắn gọn
Số lần và số hiệp khuyến nghị
Dịch mô tả bài tập và dụng cụ:

Sử dụng Google API để dịch nội dung sang ngôn ngữ mong muốn.
Hỗ trợ dinh dưỡng:

Nhập tên thực phẩm để tra cứu thông tin dinh dưỡng, bao gồm:
Hàm lượng calo
Chỉ số dinh dưỡng (carb, protein, fat)
Chat AI:

Tương tác với chatbot thông qua Cohere API để nhận tư vấn về chế độ ăn uống và tập luyện.
Đăng nhập/Đăng ký:

Sử dụng Firebase Authentication để quản lý người dùng.
Lưu trữ ảnh đại diện và dữ liệu cá nhân trong Firebase Storage.
---
