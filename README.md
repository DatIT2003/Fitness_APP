# Fitness_APP

**Fitness_APP** là một ứng dụng hỗ trợ người dùng tập luyện trong phòng gym. Ứng dụng cung cấp các tính năng như hiển thị bài tập, nhận diện dụng cụ tập gym, và tích hợp tính năng dịch ngôn ngữ để hỗ trợ người dùng quốc tế.

---

## 🚀 Features

### 1. **Hiển thị bài tập**
- Sử dụng Rapid API để tra cứu và hiển thị các bài tập gym chi tiết theo từng nhóm cơ.

### 2. **Nhận diện dụng cụ tập gym**
- Phân tích hình ảnh và cung cấp thông tin chi tiết về dụng cụ tập luyện.
- Tích hợp Gemini API để nhận diện thông minh.

### 3. **Dịch ngôn ngữ**
- Sử dụng Google API để dịch mô tả bài tập và thông tin dụng cụ sang các ngôn ngữ khác.

### 4. **Hỗ trợ dinh dưỡng**
- Sử dụng Food API để cung cấp thông tin về thực phẩm, hàm lượng calo, và chế độ ăn.

### 5. **Tích hợp Firebase**
- Đăng nhập/Đăng ký người dùng.
- Lưu trữ hình ảnh và dữ liệu trên Firebase Storage.
- Sử dụng Firestore để quản lý dữ liệu người dùng.

### 6. **Giao diện thân thiện**
- Tích hợp thay đổi chủ đề (Theme) giữa chế độ tối và sáng.
- Giao diện phản hồi tốt, hiển thị đẹp trên mọi thiết bị.

### 7. Chat AI Cohere API: 
- Hỗ trợ người dùng chat liên quan đến chế độ ăn uống và tập luyện khoa học.
🛠️ Technologies Used
React Native: Xây dựng giao diện người dùng.
Expo: Cung cấp môi trường phát triển nhanh.
Firebase: Quản lý người dùng, lưu trữ dữ liệu và hình ảnh.
Gemini API: Phân tích hình ảnh dụng cụ tập gym.
Rapid API: Hiển thị danh sách bài tập chi tiết.
Food API: Tra cứu thông tin thực phẩm và calo.
Google API: Dịch mô tả bài tập và thông tin dụng cụ.
Cohere API: Chat hướng dẫn tập luyện và chế độ ăn uống.
React Navigation: Điều hướng trong ứng dụng.
react-native-modal: Hiển thị các modal tùy chỉnh.
react-native-responsive-screen: Đảm bảo giao diện phản hồi tốt.
🔑 Environment Variables
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=Reac-navite-app-with-firebase.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
EXPO_RAPID_API_KEY=
EXPO_GEMINI_API_KEY=
EXPO_FOOD_API_KEY=
EXPO_COHERE_API_KEY=
EXPO_GOOGLE_API_KEY=

💾 Installation
Yêu cầu
Node.js: >= 14.x
npm hoặc yarn
Expo CLI
Android Studio hoặc Xcode (nếu chạy trên thiết bị thật)
Các bước cài đặt:
1.Clone Repository:
git clone https://github.com/DatIT2003/Fitness_APP.git
cd Fitness_APP
2.Cài đặt các phụ thuộc:
-npm install
hoặc sự dụng yarn:
-yarn install
3.Cấu hình API Key:
Tạo tệp .env trong thư mục gốc:
4. Khởi chạy ứng dụng:
Trên Androi:
- Npm start hoặc npx expo start
Trên IOS: 
- Yarn start hoặc npx expo start --ios



Dưới đây là nội dung README.md đầy đủ và đã cập nhật chi tiết đúng về Rapid API (hiển thị bài tập) và Google API (dịch).

markdown
Sao chép mã
# Fitness_APP

**Fitness_APP** là một ứng dụng hỗ trợ người dùng tập luyện trong phòng gym. Ứng dụng cung cấp các tính năng như hiển thị bài tập, nhận diện dụng cụ tập gym, và tích hợp tính năng dịch ngôn ngữ để hỗ trợ người dùng quốc tế.

---

## 🚀 Features

### 1. **Hiển thị bài tập**
- Sử dụng Rapid API để tra cứu và hiển thị các bài tập gym chi tiết theo từng nhóm cơ.

### 2. **Nhận diện dụng cụ tập gym**
- Phân tích hình ảnh và cung cấp thông tin chi tiết về dụng cụ tập luyện.
- Tích hợp Gemini API để nhận diện thông minh.

### 3. **Dịch ngôn ngữ**
- Sử dụng Google API để dịch mô tả bài tập và thông tin dụng cụ sang các ngôn ngữ khác.

### 4. **Hỗ trợ dinh dưỡng**
- Sử dụng Food API để cung cấp thông tin về thực phẩm, hàm lượng calo, và chế độ ăn.

### 5. **Tích hợp Firebase**
- Đăng nhập/Đăng ký người dùng.
- Lưu trữ hình ảnh và dữ liệu trên Firebase Storage.
- Sử dụng Firestore để quản lý dữ liệu người dùng.

### 6. **Giao diện thân thiện**
- Tích hợp thay đổi chủ đề (Theme) giữa chế độ tối và sáng.
- Giao diện phản hồi tốt, hiển thị đẹp trên mọi thiết bị.

---

## 📂 Project Structure

```plaintext
Fitness_APP/
├── App.jsx              # Entry point của ứng dụng
├── navigation/
│   └── appNavigation.js # Điều hướng chính
├── components/
│   ├── CommonHeader.js  # Header dùng chung
│   ├── MachineDetectInstruction.js # Hướng dẫn nhận diện dụng cụ
├── context/
│   ├── ThemeContext.js  # Quản lý chủ đề
│   └── AvatarContext.js # Quản lý Avatar người dùng
├── assets/              # Hình ảnh và tài nguyên
├── .env                 # File cấu hình API Key (không push lên GitHub)
├── package.json         # Quản lý phụ thuộc
└── README.md            # Tệp hướng dẫn
🛠️ Technologies Used
React Native: Xây dựng giao diện người dùng.
Expo: Cung cấp môi trường phát triển nhanh.
Firebase: Quản lý người dùng, lưu trữ dữ liệu và hình ảnh.
Gemini API: Phân tích hình ảnh dụng cụ tập gym.
Rapid API: Hiển thị danh sách bài tập chi tiết.
Food API: Tra cứu thông tin thực phẩm và calo.
Google API: Dịch mô tả bài tập và thông tin dụng cụ.
Cohere API: Hỗ trợ xử lý ngôn ngữ tự nhiên (NLP).
React Navigation: Điều hướng trong ứng dụng.
react-native-modal: Hiển thị các modal tùy chỉnh.
react-native-responsive-screen: Đảm bảo giao diện phản hồi tốt.
🔑 Environment Variables
Dự án sử dụng các API Key được lưu trong tệp .env. Đây là danh sách các biến môi trường:

env
Sao chép mã
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyA9KqwU8JlDl16WSZnln7Wg7C_EdTBljtE
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=Reac-navite-app-with-firebase.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=Reac-navite-app-with-firebase
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=Reac-navite-app-with-firebase.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=484057184245
EXPO_PUBLIC_FIREBASE_APP_ID=1:484057184245:web:e81eb4ceff72819d76d2bc
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-X0FEBPCTR0
EXPO_RAPID_API_KEY=d681fe4d8dmsh4a29a268898b643p197d64jsnde8aa6f1a680
EXPO_GEMINI_API_KEY=AIzaSyC9X8tG4hqKI63tAQpyJtYu07dWaW_ChrE
EXPO_FOOD_API_KEY=e255cbd6761d63a8e07b977acd84f589
EXPO_COHERE_API_KEY=Ku5HlWghIXwU8jDoha1mr1q5TMAUpsKn32bdJCXM
EXPO_GOOGLE_API_KEY=AIzaSyBnDiOmN_-ug9hFfOG3I_tolDd_2lhk8JU
Lưu ý: Không chia sẻ tệp .env công khai để đảm bảo bảo mật.

💾 Installation
Yêu cầu
Node.js: >= 14.x
npm hoặc yarn
Expo CLI
Android Studio hoặc Xcode (nếu chạy trên thiết bị thật)
Các bước cài đặt:
Clone Repository:

bash
Sao chép mã
git clone https://github.com/DatIT2003/Fitness_APP.git
cd Fitness_APP
Cài đặt các phụ thuộc:

bash
Sao chép mã
npm install
hoặc sử dụng yarn:

bash
Sao chép mã
yarn install
Cấu hình API Key:

Tạo tệp .env trong thư mục gốc:
bash
Sao chép mã
touch .env
Sao chép các biến môi trường ở phần trên vào tệp .env.
Khởi chạy ứng dụng:

Trên Android:
bash
Sao chép mã
npx expo start --android
Trên iOS:
bash
Sao chép mã
npx expo start --ios
Trên trình duyệt:
bash
Sao chép mã
npx expo start --web
💡 Usage
Tính năng chính:
1.Hiển thị bài tập:

Sử dụng Rapid API để tra cứu danh sách bài tập theo từng nhóm cơ.
Mỗi bài tập bao gồm: tên bài tập, mô tả, nhóm cơ được tập trung, và hình minh họa.
2.Nhận diện dụng cụ tập gym:

Nhấp vào nút CHỌN ẢNH để tải lên hình ảnh dụng cụ tập luyện.
Nhấp vào nút NHẬN DIỆN DỤNG CỤ để phân tích.
Kết quả sẽ hiển thị:
Tên dụng cụ
Nhóm cơ chính được tập
Mô tả ngắn gọn
Số lần và số hiệp khuyến nghị
3.Dịch mô tả bài tập và dụng cụ:
Sử dụng Google API để dịch nội dung sang ngôn ngữ mong muốn.
4.Hỗ trợ dinh dưỡng:
Nhập tên thực phẩm để tra cứu thông tin dinh dưỡng.
5.Đăng nhập/Đăng ký:

Sử dụng Firebase để quản lý người dùng.
Tải ảnh đại diện và lưu trữ trên Firebase Storage.
.
🐛 Troubleshooting
Lỗi liên quan đến cache:
Xóa cache và khởi động lại Metro:
npm start --reset-cache


```plaintext
Fitness_APP/
├── App.jsx              # Entry point của ứng dụng
├── navigation/
│   └── appNavigation.js # Điều hướng chính
├── components/
│   ├── CommonHeader.js  # Header dùng chung
│   ├── MachineDetectInstruction.js # Hướng dẫn nhận diện dụng cụ
├── context/
│   ├── ThemeContext.js  # Quản lý chủ đề
│   └── AvatarContext.js # Quản lý Avatar người dùng
├── assets/              # Hình ảnh và tài nguyên
├── .env                 # File cấu hình API Key (không push lên GitHub)
├── package.json         # Quản lý phụ thuộc
└── README.md            # Tệp hướng dẫn
