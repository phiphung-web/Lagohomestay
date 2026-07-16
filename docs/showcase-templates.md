# Cấu trúc showroom 3 mẫu

Mỗi mẫu là một website hoàn chỉnh dưới một nhánh URL riêng:

- `src/app/mau/tinh-lang/` kết nối với `src/features/showcase/templates/tinh-lang/`
- `src/app/mau/dien-anh/` kết nối với `src/features/showcase/templates/dien-anh/`
- `src/app/mau/song-dong/` kết nối với `src/features/showcase/templates/song-dong/`

Mỗi nhánh hỗ trợ trang chủ, danh sách căn, chi tiết căn, trải nghiệm, thư viện, câu chuyện, FAQ, chính sách, liên hệ, đặt chỗ và tra cứu. Dữ liệu căn và nghiệp vụ booking nằm trong `src/features/stays` và `src/features/booking` để cả ba mẫu luôn dùng cùng một nguồn dữ liệu.

## Khi chốt một mẫu

1. Giữ thư mục route và thư mục template tương ứng.
2. Xóa hai cặp thư mục của hai mẫu không chọn.
3. Cập nhật `src/features/showcase/data/templates.ts` và trang chọn mẫu nếu showroom vẫn được giữ.
4. Khi đưa mẫu đã chọn ra domain chính, chuyển route entry của mẫu đó về `src/app` hoặc cấu hình redirect từ `/`.
5. Chạy `npm run check` trước khi triển khai.

Không sao chép API hoặc nghiệp vụ booking vào từng mẫu. Việc này giúp thay thiết kế mà không tạo ba phiên bản dữ liệu, giá và trạng thái đặt chỗ khác nhau.
