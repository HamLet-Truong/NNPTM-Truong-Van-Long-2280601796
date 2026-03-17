# Bài làm và Hướng dẫn test

Đã hoàn thành các yêu cầu:
1. **JWT RS256 (2048 bits)**: Đã tạo 2 file `private.key` và `public.key` bằng thuật toán RSA độ dài 2048 bits. Code trong `routes/auth.js` đã dùng thuật toán `RS256` để ký và xác thực token trong `utils/authHandler.js`.
2. **API Change Password**: Đã thêm endpoint `POST /api/v1/auth/changepassword` tại `routes/auth.js`.
   - Có yêu cầu login (`CheckLogin`).
   - Có validation qua `ChangePasswordValidator` với role mật khẩu (ít nhất 8 ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt).

## Hướng dẫn Test với Postman

Trước tiên chạy app bằng lệnh: `npm start` hoặc lệnh chạy app tương ứng của bạn.

### 1. Chức năng Login
- **URL**: `POST http://localhost:3000/api/v1/auth/login`
- **Body** (raw -> JSON):
  ```json
  {
      "username": "your_username",
      "password": "your_password"
  }
  ```
- **Kết quả**: Server sẽ trả về một chuỗi JWT dài (vì đã dùng RS256 2048 bits). Đồng thời JWT cũng được set trong cookies.
- **Yêu cầu nộp bài**: **Chụp ảnh màn hình Postman** hiển thị URL, Body và đoạn kết quả token hoặc cookie trả về ở góc dưới.

### 2. Chức năng /me
- **URL**: `GET http://localhost:3000/api/v1/auth/me`
- **Headers**: 
  - Thêm Key `Authorization` với Value là chuỗi Token lấy từ bước Login (hoặc Postman tự động gửi Cookie nếu đang bật Cookie sync).
- **Kết quả**: Trả về object thông tin của User.
- **Yêu cầu nộp bài**: **Chụp ảnh màn hình Postman** phần Request, Body và Response hiển thị thông tin user.

### 3. Chức năng /changepassword
- **URL**: `POST http://localhost:3000/api/v1/auth/changepassword`
- **Headers**: Tương tự `/me`, cần gửi `Authorization` header.
- **Body** (raw -> JSON):
  ```json
  {
      "oldpassword": "your_password",
      "newpassword": "NewStrong!Password123"
  }
  ```
  *(Lưu ý: Nếu `newpassword` không đủ độ mạnh theo chuẩn validator, API sẽ báo lỗi)*
- **Kết quả**: `"Doi mat khau thanh cong"`.

## Hướng dẫn check với MongoDB
- Mở **MongoDB Compass** (hoặc tool bạn hay dùng)
- Connect đến URL: `mongodb://localhost:27017`
- Truy cập vào Database: `NNPTUD-S3` -> Collection: `users`
- Ở đây bạn có thể kiểm tra xem trường `password` của user đã được thay đổi (bị mã hoá bcrypt thành chuỗi hash mới) so với ban đầu.
- **Chụp ảnh dữ liệu MongoDB** để chứng minh Database đã lưu.

Đừng quên commit các file code cũng như hình ảnh và đẩy lên Git!
