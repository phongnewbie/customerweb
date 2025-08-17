# MéLi's Dessert - Website Tiệm Bánh Pháp

## Giới thiệu

MéLi's Dessert là website của tiệm bánh Pháp được thành lập bởi Madam Yuan. Website cho phép khách hàng đăng ký tài khoản và đặt hàng trực tuyến các món tráng miệng Pháp.

## Tính năng chính

### 🏠 Trang chủ
- Hero section với thông tin giới thiệu
- Hiển thị các món nổi bật
- Thông tin về tiệm bánh
- Footer với thông tin liên hệ

### 📋 Menu
- Hiển thị tất cả các món tráng miệng
- Phân loại theo danh mục (Bánh ngọt, Bánh kem, Tráng miệng)
- Thông tin chi tiết và giá cả
- Chức năng thêm vào giỏ hàng

### 🛒 Giỏ hàng
- Quản lý sản phẩm đã chọn
- Thay đổi số lượng
- Xóa sản phẩm
- Tính tổng tiền

### 📝 Đặt hàng
- Form thông tin khách hàng
- Chọn thời gian giao hàng
- Tóm tắt đơn hàng
- Xác nhận đặt hàng

### 👤 Tài khoản
- Đăng ký tài khoản mới
- Đăng nhập/Đăng xuất
- Quản lý thông tin cá nhân

### ℹ️ Về chúng tôi
- Câu chuyện thành lập
- Giá trị cốt lõi
- Thông tin đội ngũ
- Thông tin liên hệ

## Công nghệ sử dụng

- **HTML5**: Cấu trúc website
- **CSS3**: Styling và responsive design
- **JavaScript**: Tương tác và xử lý logic
- **LocalStorage**: Lưu trữ dữ liệu giỏ hàng và tài khoản

## Cấu trúc thư mục

```
customerWeb/
├── index.html          # Trang chủ
├── menu.html           # Trang menu
├── cart.html           # Trang giỏ hàng
├── order.html          # Trang đặt hàng
├── login.html          # Trang đăng nhập
├── register.html       # Trang đăng ký
├── about.html          # Trang về chúng tôi
├── styles.css          # File CSS chính
├── script.js           # File JavaScript chính
└── README.md           # Hướng dẫn sử dụng
```

## Hướng dẫn sử dụng

### 1. Khởi chạy website
- Mở file `index.html` trong trình duyệt web
- Hoặc sử dụng live server để chạy local

### 2. Đăng ký tài khoản
- Truy cập trang "Đăng ký"
- Điền đầy đủ thông tin cá nhân
- Tạo mật khẩu (tối thiểu 6 ký tự)
- Xác nhận đăng ký

### 3. Đặt hàng
- Duyệt menu và chọn sản phẩm
- Thêm vào giỏ hàng
- Kiểm tra giỏ hàng
- Điền thông tin giao hàng
- Xác nhận đặt hàng

### 4. Quản lý giỏ hàng
- Xem danh sách sản phẩm đã chọn
- Thay đổi số lượng
- Xóa sản phẩm không muốn
- Tính toán tổng tiền

## Tính năng đặc biệt

### 🎨 Thiết kế responsive
- Tương thích với mọi thiết bị
- Mobile-first approach
- Navigation menu thích ứng

### ⚡ Hiệu ứng tương tác
- Animation fade-in khi scroll
- Hover effects
- Smooth transitions
- Loading states

### 🔒 Bảo mật
- Form validation
- Password confirmation
- Session management
- Data persistence

### 📱 UX/UI
- Giao diện hiện đại
- Typography đẹp mắt
- Color scheme nhất quán
- Icon và imagery chất lượng

## Demo tài khoản

Để test website, bạn có thể sử dụng bất kỳ email và mật khẩu nào (tối thiểu 6 ký tự) để đăng nhập.

## Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa biến CSS trong file `styles.css`:
```css
:root {
    --primary-color: #d4a574;
    --secondary-color: #2c3e50;
    --text-color: #333;
    --light-bg: #f8f9fa;
}
```

### Thêm sản phẩm mới
Chỉnh sửa mảng `menuItems` trong file `script.js`:
```javascript
const menuItems = [
    {
        id: 7,
        name: 'Tên sản phẩm mới',
        description: 'Mô tả sản phẩm',
        price: 50000,
        image: 'đường dẫn ảnh',
        category: 'pastries'
    }
];
```

## Hỗ trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ:
- Email: info@melis-dessert.com
- Điện thoại: 0123 456 789

## License

© 2024 MéLi's Dessert. All rights reserved.

---

**Lưu ý**: Đây là website demo cho mục đích học tập và thực hành. Trong môi trường production, cần tích hợp backend và database thực tế.
