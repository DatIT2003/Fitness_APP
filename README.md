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
EXPO_GOOGLE_API_KEY=...
