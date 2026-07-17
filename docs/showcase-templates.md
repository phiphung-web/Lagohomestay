# Cấu trúc showroom 3 mẫu

Mỗi mẫu là một website hoàn chỉnh dưới một nhánh URL riêng:

- `src/app/mau/tinh-lang/` kết nối với `src/features/showcase/templates/tinh-lang/`
- `src/app/mau/dien-anh/` kết nối với `src/features/showcase/templates/dien-anh/`
- `src/app/mau/song-dong/` kết nối với `src/features/showcase/templates/song-dong/`

Mỗi nhánh hỗ trợ trang chủ, danh sách căn, chi tiết căn, trải nghiệm, thư viện, câu chuyện, FAQ, chính sách, liên hệ, đặt chỗ và tra cứu. Dữ liệu căn và nghiệp vụ booking nằm trong `src/features/stays` và `src/features/booking` để cả ba mẫu luôn dùng cùng một nguồn dữ liệu.

## Cách gửi khách hàng duyệt mẫu

Gửi đường dẫn gốc của showroom. Màn đầu tiên giải thích đối tượng phù hợp, dấu ấn thị giác, cảm giác tương tác và liên kết vào từng website. Để đánh giá công bằng, nên đề nghị người duyệt thử cùng một hành trình ở cả ba mẫu:

1. Xem hết trang chủ để cảm nhận câu chuyện và nhịp chuyển động.
2. Mở **Các căn**, chọn một căn và xem trang chi tiết.
3. Mở **Kiểm tra lịch**, thử chọn ngày, số khách và xem kết quả.
4. Kiểm tra thêm **Thư viện**, **Cần biết** và **Tra cứu** trên điện thoại.

Ba hướng trải nghiệm được phân biệt rõ:

- **Tĩnh lặng:** bố cục tạp chí bất đối xứng, nhiều khoảng thở, chuyển động chậm và tinh tế.
- **Điện ảnh:** khung hình lớn, nền tối sâu, nội dung theo chương và chuyển cảnh giàu cảm xúc.
- **Sống động:** hình khối hữu cơ, bento nhiều màu, phản hồi vui và thân thiện với gia đình.

Khác biệt này tiếp tục xuyên suốt trang con: **Tĩnh lặng** trình bày bộ sưu tập như catalogue bất đối xứng và mở chi tiết căn bằng bố cục tách đôi; **Điện ảnh** dùng film index toàn chiều ngang, hero phủ khung hình và gallery theo nhịp chương; **Sống động** dùng bento card, hero hữu cơ và tiện nghi dạng thẻ thân thiện. Luồng đặt chỗ giữ chung nghiệp vụ nhưng có phần dẫn nhập, màu sắc và giọng kể riêng của từng mẫu.

Trang **Trải nghiệm** cũng có ba cấu trúc độc lập: nhật ký thời gian kiểu tạp chí, chuỗi chapter có ảnh kiểu điện ảnh và bento hoạt động nhiều màu. FAQ, chính sách và tra cứu booking tiếp tục giữ đúng nhịp đó; accordion sử dụng native `details/summary`, có chuyển động chiều cao và vẫn thao tác đầy đủ bằng bàn phím.

Trang **Về Lago** và **Liên hệ** có composition độc lập theo từng mood; địa chỉ chưa có dữ liệu thật được hiển thị như thông tin, không còn dùng liên kết `#` làm trang nhảy lên đầu. Hero trang chủ có lời chào theo giờ địa phương của người xem với bốn khoảng sáng, ngày, hoàng hôn và đêm. Nội dung ban đầu cố định rồi mới cập nhật phía client để tránh hydration mismatch và layout shift lớn.

Các tương tác dùng chung đã được hoàn thiện cho giai đoạn duyệt mẫu: thanh tiến trình cuộn theo màu nhận diện, ánh sáng nền phản hồi con trỏ trên desktop, lightbox thư viện có vuốt/phím mũi tên và thước phim ảnh riêng của mẫu Điện ảnh. Toàn bộ chuyển động tôn trọng thiết lập `prefers-reduced-motion` và modal giữ focus bàn phím trong vùng tương tác.

Khi chuyển trang, phần mở đầu cũng đi vào theo ba nhịp riêng: **Tĩnh lặng** nâng nhẹ như lật trang, **Điện ảnh** mở khung hình theo màn trập và **Sống động** xuất hiện mềm với độ nảy rất nhẹ. Hiệu ứng chỉ áp dụng cho hero đầu tiên, tránh biến toàn bộ trang dài thành một lớp đồ họa nặng. Không bật `experimental.viewTransition` của Next.js trong production; cấu trúc hiện tại dùng CSS progressive enhancement và tự tắt gần như hoàn toàn khi người dùng chọn reduced motion.

Trên điện thoại, mỗi website có menu toàn màn hình mang đúng ngôn ngữ hình ảnh của mẫu, đánh dấu trang đang xem và giữ focus bàn phím trong vùng tương tác. Thanh đổi mẫu thu gọn thành một nút nổi 52px, chỉ mở danh sách ba phương án khi người duyệt chủ động chạm, vì vậy không che nội dung hay cạnh tranh với CTA đặt chỗ. Khi đổi mẫu, showroom giữ nguyên trang hiện tại — ví dụ đang xem chi tiết một căn hoặc luồng đặt chỗ thì mẫu tiếp theo cũng mở đúng trang đó — để người duyệt so sánh công bằng từng trải nghiệm.

Ảnh minh họa dùng loader CDN responsive: trình duyệt nhận `srcset` theo kích thước màn hình và tải trực tiếp từ Unsplash, không đi qua `/_next/image`. Cách này giữ ảnh hoạt động ổn định trên VPS demo đồng thời tránh tải ảnh desktop quá lớn ở mobile.

Font được tự host và giới hạn đúng các subset Latin/Vietnamese dạng WOFF2 đang sử dụng. Be Vietnam Pro đảm nhiệm nội dung và thao tác; Lora dành cho tiêu đề giàu cảm xúc. Artifact production giảm từ 120 tệp font khoảng 1,75 MB xuống 24 tệp khoảng 372 KB, không gửi kèm Cyrillic, toán học, symbol hoặc WOFF cũ không cần thiết.

Các mức trong suốt tinh tế của hệ màu (`8%`, `12%`, `18%`, `52%`, `58%`...) được khai báo trong Tailwind theme để chắc chắn xuất hiện trong CSS production; không phụ thuộc các mức opacity mặc định của framework.

Luồng chuyển đổi cũng được dùng chung ở chất lượng production: tiến trình ba bước, trạng thái tải/rỗng/lỗi rõ ràng, retry không làm đổi lựa chọn của khách, validation từng trường thay cho thông báo mặc định của trình duyệt, giá được khóa khi đang kiểm tra lại và đồng hồ đếm thời gian giữ chỗ sau khi gửi thành công. Ngày mặc định luôn tính theo múi giờ `Asia/Ho_Chi_Minh`, không phụ thuộc múi giờ VPS.

Thanh chuyển mẫu ở cuối màn hình chỉ phục vụ giai đoạn trình bày. Sau khi chốt, thanh này và trang chọn mẫu có thể được gỡ mà không ảnh hưởng website được chọn.

## Phạm vi đầy đủ của mỗi mẫu

Mỗi mẫu có 14 tuyến trang độc lập: trang chủ, danh sách căn, 4 trang chi tiết căn, trải nghiệm, thư viện, về Lago, thông tin/FAQ, chính sách, liên hệ, đặt chỗ và tra cứu. Header, footer, màu sắc, kiểu chữ, hình khối và hiệu ứng luôn giữ đúng phong cách khi chuyển trang trong cùng một mẫu.

## Khi chốt một mẫu

1. Giữ thư mục route và thư mục template tương ứng.
2. Xóa hai cặp thư mục của hai mẫu không chọn.
3. Cập nhật `src/features/showcase/data/templates.ts` và trang chọn mẫu nếu showroom vẫn được giữ.
4. Khi đưa mẫu đã chọn ra domain chính, chuyển route entry của mẫu đó về `src/app` hoặc cấu hình redirect từ `/`.
5. Chạy `npm run check` trước khi triển khai.

Không sao chép API hoặc nghiệp vụ booking vào từng mẫu. Việc này giúp thay thiết kế mà không tạo ba phiên bản dữ liệu, giá và trạng thái đặt chỗ khác nhau.
