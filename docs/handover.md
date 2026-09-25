# Bàn giao dự án LAKA Homestay

Ngày đối chiếu mã nguồn: 25/09/2026. Repo được chuẩn bị để bên nhận tiếp tục triển khai website. Phần admin đã được gỡ theo phạm vi bàn giao; API đặt phòng được giữ để phát triển tiếp khi cần. Tài liệu này mô tả những gì có trong mã nguồn, không xác nhận tình trạng VPS hoặc dữ liệu thực tế.

## Trình tự tiếp nhận

1. Clone repo, làm theo [README](../README.md) để chạy demo và `npm run check`.
2. Đọc [kiến trúc](architecture.md), thử website tiếng Việt, tiếng Anh và form tư vấn.
3. Đối chiếu các giới hạn bên dưới với phạm vi công việc hai bên thống nhất.
4. Nhận riêng quyền Git, domain/DNS, hosting/VPS, đầu nhận webhook, bộ ảnh gốc và thông tin vận hành. Những quyền này không được chuyển chỉ bằng việc nhận source code.
5. Triển khai vào môi trường thử nghiệm trước khi nối dữ liệu hoặc nhận yêu cầu khách thật.

## Hiện trạng chức năng

| Phần              | Đã có trong repo                                                                                                      | Cần tiếp tục                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Website công khai | Trang chủ, lưu trú, chi tiết căn, trải nghiệm, dịch vụ, ẩm thực, giới thiệu, thông tin, chính sách, liên hệ; có `/en` | Duyệt lại nội dung còn minh họa và kiểm tra trên thiết bị thực tế                |
| Danh mục lưu trú  | Dữ liệu tĩnh 8 dòng lưu trú, 20 căn; bộ lọc và gallery                                                                | Đồng bộ danh mục database trước khi bán phòng; xác nhận thông số còn thiếu       |
| Ảnh               | Ảnh LAKA trong `public`, 10 trang menu nhà hàng, một ảnh menu LAKA Coffee, một số vị trí còn Unsplash                 | Bổ sung ảnh đúng địa điểm cho phần còn thiếu và xác nhận quyền sử dụng           |
| Yêu cầu tư vấn    | Form và modal gọi `/api/inquiry`, giới hạn tần suất, log và webhook tùy chọn                                          | Lưu bền vững, xử lý gửi thất bại, xác nhận người vận hành đã nhận được yêu cầu   |
| API đặt phòng     | Kiểm tra lịch, tính giá, giữ phòng, tra cứu, hết hạn giữ phòng; có nhánh demo và Prisma                               | Kiểm thử tích hợp PostgreSQL, dữ liệu giá thật, xác minh khách và nối UI phù hợp |
| Database          | Schema Prisma và hai migration                                                                                        | Dữ liệu mở đầu được đối soát, backup/restore, kiểm thử đồng thời                 |
| Triển khai        | Dockerfile, hai Compose và mẫu Nginx                                                                                  | Hạ tầng, TLS, secret, scheduler, theo dõi lỗi, backup và quy trình phát hành     |

Luồng hiện tại của khách là **xem căn → gửi yêu cầu tư vấn → đội LAKA liên hệ lại**. Gửi form tư vấn không tạo booking hay giữ phòng. Các redirect của `/dat-phong`, `/tra-cuu` và bản `/en` được giữ trong `next.config.ts`.

Admin, trang đăng nhập, API xác thực và API đổi trạng thái booking của admin đã được xóa. Repo không còn tài khoản demo, NextAuth hoặc cấu hình session. Model `User` và lịch sử migration được giữ để tương thích database cũ; ứng dụng không còn sử dụng bảng này và không có migration xóa dữ liệu.

## Các giới hạn phải xử lý trước khi vận hành

### Tiếp nhận tư vấn

`src/app/api/inquiry/route.ts` ghi thông tin liên hệ vào log. Nếu không cấu hình webhook, thông tin chỉ nằm trong log của tiến trình. Nếu webhook có lỗi HTTP, route chưa kiểm tra `response.ok`; lỗi gửi mạng cũng được ghi log rồi vẫn trả thành công cho khách. Chưa có hàng đợi, retry, database lưu tư vấn hoặc dịch vụ email tích hợp.

Bên tiếp nhận cần chọn nơi nhận/lưu yêu cầu, bổ sung trạng thái gửi đáng tin cậy và thử từ trình duyệt tới người xử lý. Thiết lập quyền xem và thời gian lưu log vì log đang chứa thông tin khách.

### Đặt phòng

- API booking vẫn tồn tại dù UI công khai chuyển sang tư vấn. Trước khi đưa dữ liệu thật vào database, quyết định việc mở các API này và kiểm tra quyền truy cập.
- Tra cứu booking hiện chỉ cần số điện thoại. Cần cơ chế xác minh khách phù hợp trước khi trả dữ liệu thật.
- Repo không còn API đổi trạng thái thủ công. Nếu tiếp tục hệ thống đặt phòng, cần thiết kế quy trình xác nhận/hủy và quyền thao tác tương ứng.
- Booking demo và rate limit ở bộ nhớ, không chia sẻ giữa instance và không tồn tại sau restart.
- `basePrice` của danh mục website đang là `0`; các phụ thu demo không phải bảng giá kinh doanh. Dữ liệu trong `prisma/seed.ts` là danh mục cũ, không khớp danh mục website.

### Nội dung

[Nguồn nội dung](laka-content-source.md) ghi nhận nội dung đã duyệt và các trường còn chờ xác nhận. Các trang chính sách còn nội dung mẫu, gồm cả mô tả giữ chỗ hai giờ; cần đối chiếu lại với luồng tư vấn hiện tại. Bản FAQ còn mô tả ảnh concept theo giai đoạn cũ trong khi một phần ảnh LAKA đã được tích hợp.

Không dùng workbook hoặc brief ảnh làm bằng chứng mọi slot đã hoàn thành. Vị trí và số ảnh thực tế phải đối chiếu mã nguồn theo [hướng dẫn tài nguyên](assets/README.md).

Các lời nhận xét trong `src/features/showcase/components/home-guest-stories.tsx` đang được khai báo trực tiếp trong component. Repo không kèm bằng chứng nguồn hoặc xác nhận quyền đăng; cần chủ dự án duyệt trước khi dùng làm đánh giá khách hàng chính thức.

## Thứ tự công việc tiếp theo

| Ưu tiên | Công việc                                                         | Điều kiện hoàn thành                                                                |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1       | Chốt chức năng website cần nghiệm thu                             | Có danh sách chức năng và bên phụ trách                                             |
| 1       | Hoàn thiện nhận tư vấn                                            | Một yêu cầu thử được lưu, chuyển tới đúng người, có trạng thái lỗi khi gửi thất bại |
| 1       | Duyệt nội dung, ảnh, liên hệ và chính sách                        | Có nguồn và người duyệt; thử cả tiếng Việt/Anh                                      |
| 1       | Cấu hình môi trường triển khai                                    | Domain, TLS, secret, quyền truy cập và health check đúng môi trường                 |
| 2       | Nếu tiếp tục booking: đối soát catalog/giá và kiểm thử PostgreSQL | Booking không trùng căn, có kiểm tra đồng thời và quy trình xác nhận/hết hạn        |
| 2       | Bổ sung backup, giám sát và phát hành                             | Thử được việc khôi phục và xác định được bản đang chạy                              |

## Phạm vi dọn repo lần này

- Tách layout website thành header, footer, shell và các file trang con; đổi tên `template-*`, `demo-data` theo vai trò hiện hành.
- Bỏ các component không còn nối vào route, adapter S3 chưa dùng, script tạo tài liệu theo giao diện cũ và cấu hình/review của công cụ cá nhân khỏi bản Git hiện hành.
- Gỡ toàn bộ giao diện admin, đăng nhập/session, API riêng của admin, dữ liệu mẫu và dependency liên quan. Bỏ cấu hình session khỏi file môi trường mẫu và Docker Compose.
- Giữ API công khai, domain booking và database migration để bên sau tiếp tục phát triển. Seed cũ được giữ như công cụ thử nghiệm có điều kiện chạy rõ ràng, đã bỏ bước tạo tài khoản.
- Chuyển hai workbook vào `docs/assets`, giữ nguyên nội dung. Ảnh công khai và lịch sử migration được giữ nguyên.
- Chuẩn hóa định dạng; sửa command hỏng, bổ sung hướng dẫn môi trường, database, ảnh và triển khai.
- Giữ tên kỹ thuật `lago-*`, redirect cũ và các lớp CSS đang dùng để tránh thay đổi tương thích ngoài phạm vi dọn cấu trúc.

Các file bị bỏ vẫn có trong lịch sử Git trước lần bàn giao; mốc trước khi dọn là `49a286a`. Có thể xem một file cũ bằng `git show 49a286a:duong/dan/file` mà không thay đổi bản đang làm việc.

## Kiểm chứng bản bàn giao

Sau khi gỡ admin, đã chạy lại toàn bộ `npm run check` và kiểm tra HTTP trên bản production tại máy, với demo bật và webhook để trống. Môi trường: Windows, Node.js 20.19.0, npm 10.8.2, Next.js 15.5.20, Prisma 6.19.3.

| Kiểm tra                 | Kết quả                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `npm run check`          | Đạt định dạng, kiến trúc, TypeScript, 12 file test / 55 test và production build                |
| Production build         | Sinh 55 trang; không còn route admin hoặc auth trong manifest                                   |
| HTTP trên bản production | 42 trang công khai trả 200, 4 redirect đặt phòng/tra cứu đúng đích, route không tồn tại trả 404 |
| Route admin và auth cũ   | 12 URL kiểm tra bằng GET trả 404; PATCH đổi trạng thái và POST đăng nhập cũng trả 404           |
| Form tư vấn tại máy      | Dữ liệu rỗng bị từ chối; dữ liệu thử hợp lệ được nhận và ghi log; không gửi ra dịch vụ ngoài    |
| Menu Coffee              | Trang ẩm thực Việt/Anh vẫn chứa menu; file ảnh trả 200                                          |
| Dependency               | Gỡ 9 gói liên quan đến đăng nhập; phiên bản các gói còn lại giữ nguyên                          |
| Schema, migration và ảnh | Không thay đổi trong lần gỡ admin                                                               |
| Diff                     | Kiểm tra whitespace đạt                                                                         |

Ở lần dọn cấu trúc trước đó, đã kiểm tra `npm ci` trên bản sao mới, sinh/validate Prisma, điều kiện chặn seed, liên kết tài liệu và ảnh trên 6 trang bằng `npm run qa:images`. Hai workbook giữ nguyên nội dung. Các kiểm tra đó không được dùng để xác nhận Docker hoặc dữ liệu vận hành.

Test còn gồm một số kiểm tra nội dung/source để giữ các ràng buộc giao diện, chưa thay thế kiểm thử tương tác đầy đủ. Cảnh báo cấu hình Prisma trong `package.json` và Vite CJS còn tồn tại ở phiên bản dependency đang khóa; không nâng cấp framework trong lần dọn này.

Khi thử các URL đã gỡ và URL không tồn tại, HTTP trả đúng 404 nhưng Next.js ghi `Internal: NoFallbackError` từ route `[[...path]]` vào log. Đây là điểm cần theo dõi khi hoàn thiện xử lý trang không tìm thấy.

Docker/PostgreSQL, webhook ngoài, quyền domain/VPS và vận hành production cần kiểm tra trên môi trường của bên nhận. Một lần build thành công không xác nhận các phần này đã hoạt động.
