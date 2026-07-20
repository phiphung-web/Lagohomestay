# Hệ nhận diện LAKA Homestay

## Tài sản chính thức

- `public/brand/laka-wordmark.png`: wordmark LAKA dùng cho header và không gian hẹp.
- `public/brand/laka-homestay.png`: lockup LAKA Homestay dùng cho footer và điểm nhận diện lớn.
- `public/brand/laka-homestay-est-2026.png`: phiên bản có năm thành lập, dành cho khu vực kể chuyện thương hiệu.
- `public/brand/laka-icon.png`: biểu tượng vuông dùng cho manifest và các điểm chạm ứng dụng.
- `src/app/icon.png`: favicon do Next.js sinh metadata tự động.

Logo được hiển thị qua `BrandLogo` dưới dạng mask alpha. Cách này giữ nguyên hình dáng tài sản gốc và cho phép đổi màu chính xác theo nền mà không cần xuất thêm các bản logo giả.

## Màu thương hiệu

- Xanh LAKA: `#17321D`.
- Kem LAKA: `#FAF3EA`.
- Be LAKA: `#C7A882`.
- Kem phụ lấy từ tài sản icon: `#E7DED1`.

## Cách áp dụng vào ba mẫu

- **Tĩnh lặng:** nền kem, chữ xanh, be dùng cho đường nét và nhịp biên tập.
- **Điện ảnh:** nền xanh được hạ tối để tạo chiều sâu; logo kem, be là ánh sáng và CTA; bề mặt chính vẫn dùng xanh LAKA.
- **Sống động:** xanh, kem và be là trục nhận diện; vàng, san hô và xanh non chỉ là màu phụ giúp giữ năng lượng trẻ trung.

Tên hiển thị cho khách là **LAKA Homestay**. Các định danh kỹ thuật cũ như domain, route `/ve-lago`, package, container và project Docker tiếp tục được giữ để tương thích triển khai.
