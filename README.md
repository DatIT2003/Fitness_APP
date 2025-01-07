# Fitness_APP

Fitness_APP là một ứng dụng hỗ trợ người dùng tập luyện trong phòng gym bằng cách nhận diện dụng cụ tập luyện và cung cấp hướng dẫn sử dụng chi tiết. Ứng dụng được xây dựng bằng React Native và sử dụng API Gemini để phân tích hình ảnh.

---

## 🚀 Features

- **Nhận diện dụng cụ tập gym**: Phân tích hình ảnh dụng cụ và hiển thị thông tin chi tiết.
- **Hướng dẫn sử dụng chi tiết**: Bao gồm tên dụng cụ, nhóm cơ tập trung, mức độ khó, cách sử dụng, và số lần tập khuyến nghị.
- **Thay đổi giao diện (Theme)**: Hỗ trợ chế độ tối và sáng để phù hợp với sở thích người dùng.
- **Tích hợp AI**: Sử dụng API Gemini để phân tích và cung cấp thông tin.
- **Giao diện thân thiện**: Hiển thị phù hợp với mọi kích thước màn hình.

---

## 📂 Project Structure

```plaintext
Fitness_APP/
├── App.jsx              # Điểm khởi đầu của ứng dụng
├── navigation/
│   └── appNavigation.js # Điều hướng chính của ứng dụng
├── components/
│   ├── CommonHeader.js  # Header dùng chung
│   ├── MachineDetectInstruction.js # Hướng dẫn sử dụng tính năng nhận diện
├── context/
│   ├── ThemeContext.js  # Quản lý chủ đề (theme)
│   └── AvatarContext.js # Quản lý Avatar người dùng
├── assets/              # Hình ảnh và tài nguyên tĩnh
├── .env                 # Cấu hình API Key (không được đẩy lên GitHub)
├── package.json         # Tệp quản lý phụ thuộc
└── README.md            # Tệp hướng dẫn sử dụng
