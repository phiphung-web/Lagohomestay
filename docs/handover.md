# Bàn giao dự án LAKA Homestay

Ngày đối chiếu mã nguồn: 25/09/2026. Repo được chuẩn bị để bên nhận tiếp tục triển khai website và phần vận hành còn dang dở. Tài liệu này mô tả những gì có trong mã nguồn, không xác nhận tình trạng VPS hoặc dữ liệu thực tế.

## Trình tự tiếp nhận

1. Clone repo, làm theo [README](../README.md) để chạy demo và `npm run check`.
2. Đọc [kiến trúc](architecture.md), thử website tiếng Việt, tiếng Anh và admin mẫu.
3. Đối chiếu các giới hạn bên dưới với phạm vi công việc hai bên thống nhất.
4. Nhận riêng quyền Git, domain/DNS, hosting/VPS, đầu nhận webhook, bộ ảnh gốc và thông tin vận hành. Những quyền này không được chuyển chỉ bằng việc nhận source code.
5. Triển khai vào môi trường thử nghiệm trước khi nối dữ liệu hoặc nhận yêu cầu khách thật.

## Hiện trạng chức năng

| Phần              | Đã có trong repo                                                                                                      | Cần tiếp tục                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Website công khai | Trang chủ, lưu trú, chi tiết căn, trải nghiệm, dịch vụ, ẩm thực, giới thiệu, thông tin, chính sách, liên hệ; có `/en` | Duyệt lại nội dung còn minh họa và kiểm tra trên thiết bị thực tế                   |
| Danh mục lưu trú  | Dữ liệu tĩnh 8 dòng lưu trú, 20 căn; bộ lọc và gallery                                                                | Đồng bộ danh mục database trước khi bán phòng; xác nhận thông số còn thiếu          |
| Ảnh               | Ảnh LAKA trong `public`, 10 trang ảnh thực đơn, một số vị trí còn Unsplash                                            | Bổ sung ảnh đúng địa điểm cho phần còn thiếu và xác nhận quyền sử dụng              |
| Yêu cầu tư vấn    | Form và modal gọi `/api/inquiry`, giới hạn tần suất, log và webhook tùy chọn                                          | Lưu bền vững, xử lý gửi thất bại, xác nhận người vận hành đã nhận được yêu cầu      |
| API đặt phòng     | Kiểm tra lịch, tính giá, giữ phòng, tra cứu, đổi trạng thái; có nhánh demo và Prisma                                  | Kiểm thử tích hợp PostgreSQL, dữ liệu giá thật, xác minh khách và nối UI phù hợp    |
| Admin             | Đăng nhập/session, màn tổng quan, booking, lịch, khách, thu, báo cáo, cấu hình                                        | Dữ liệu vẫn mẫu; nhiều nút chỉ là giao diện, chưa có thao tác lưu hoặc xuất dữ liệu |
| Database          | Schema Prisma và hai migration                                                                                        | Dữ liệu mở đầu được đối soát, tài khoản thật, backup/restore, kiểm thử đồng thời    |
| Triển khai        | Dockerfile, hai Compose và mẫu Nginx                                                                                  | Hạ tầng, TLS, secret, scheduler, theo dõi lỗi, backup và quy trình phát hành        |

Luồng hiện tại của khách là **xem căn → gửi yêu cầu tư vấn → đội LAKA liên hệ lại**. Gửi form tư vấn không tạo booking hay giữ phòng. Các redirect của `/dat-phong`, `/tra-cuu` và bản `/en` được giữ trong `next.config.ts`.

## Các giới hạn phải xử lý trước khi vận hành

### Tiếp nhận tư vấn

`src/app/api/inquiry/route.ts` ghi thông tin liên hệ vào log. Nếu không cấu hình webhook, thông tin chỉ nằm trong log của tiến trình. Nếu webhook có lỗi HTTP, route chưa kiểm tra `response.ok`; lỗi gửi mạng cũng được ghi log rồi vẫn trả thành công cho khách. Chưa có hàng đợi, retry, database lưu tư vấn hoặc dịch vụ email tích hợp.

Bên tiếp nhận cần chọn nơi nhận/lưu yêu cầu, bổ sung trạng thái gửi đáng tin cậy và thử từ trình duyệt tới người xử lý. Thiết lập quyền xem và thời gian lưu log vì log đang chứa thông tin khách.

### Đặt phòng và admin

- Admin đọc dữ liệu mẫu ngay cả khi `DEMO_MODE="false"`. Form cấu hình, xuất danh sách, ghi thu và một số nút chưa nối API.
- API booking vẫn tồn tại dù UI công khai chuyển sang tư vấn. Trước khi đưa dữ liệu thật vào database, quyết định việc mở các API này và kiểm tra quyền truy cập.
- Tra cứu booking hiện chỉ cần số điện thoại. Cần cơ chế xác minh khách phù hợp trước khi trả dữ liệu thật.
- Route đổi trạng thái yêu cầu đăng nhập nhưng chưa hoàn thiện giới hạn thao tác theo vai trò/phạm vi cơ sở.
- Booking demo và rate limit ở bộ nhớ, không chia sẻ giữa instance và không tồn tại sau restart.
- `basePrice` của danh mục website đang là `0`; các phụ thu demo không phải bảng giá kinh doanh. Dữ liệu trong `prisma/seed.ts` là danh mục cũ, không khớp danh mục website.
- Auth có tài khoản demo và secret dự phòng cho phát triển. Môi trường vận hành phải có secret riêng, `DEMO_MODE="false"`, dữ liệu tài khoản thật và kiểm tra cấu hình bắt buộc.

### Nội dung

[Nguồn nội dung](laka-content-source.md) ghi nhận nội dung đã duyệt và các trường còn chờ xác nhận. Các trang chính sách còn nội dung mẫu, gồm cả mô tả giữ chỗ hai giờ; cần đối chiếu lại với luồng tư vấn hiện tại. Bản FAQ còn mô tả ảnh concept theo giai đoạn cũ trong khi một phần ảnh LAKA đã được tích hợp.

Không dùng workbook hoặc brief ảnh làm bằng chứng mọi slot đã hoàn thành. Vị trí và số ảnh thực tế phải đối chiếu mã nguồn theo [hướng dẫn tài nguyên](assets/README.md).

Các lời nhận xét trong `src/features/showcase/components/home-guest-stories.tsx` đang được khai báo trực tiếp trong component. Repo không kèm bằng chứng nguồn hoặc xác nhận quyền đăng; cần chủ dự án duyệt trước khi dùng làm đánh giá khách hàng chính thức.

## Thứ tự công việc tiếp theo

| Ưu tiên | Công việc                                                         | Điều kiện hoàn thành                                                                |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1       | Chốt phạm vi bàn giao website và phạm vi CRM/booking              | Có danh sách chức năng nghiệm thu và bên phụ trách                                  |
| 1       | Hoàn thiện nhận tư vấn                                            | Một yêu cầu thử được lưu, chuyển tới đúng người, có trạng thái lỗi khi gửi thất bại |
| 1       | Duyệt nội dung, ảnh, liên hệ và chính sách                        | Có nguồn và người duyệt; thử cả tiếng Việt/Anh                                      |
| 1       | Cấu hình môi trường triển khai                                    | Domain, TLS, secret, quyền truy cập và health check đúng môi trường                 |
| 2       | Nếu tiếp tục booking: đối soát catalog/giá và kiểm thử PostgreSQL | Booking không trùng căn, có kiểm tra đồng thời và quy trình xác nhận/hết hạn        |
| 2       | Nối admin với dữ liệu và hoàn thiện phân quyền                    | Thao tác lưu có kết quả thật, dữ liệu đúng phạm vi người dùng                       |
| 2       | Bổ sung backup, giám sát và phát hành                             | Thử được việc khôi phục và xác định được bản đang chạy                              |

## Phạm vi dọn repo lần này

- Tách layout website thành header, footer, shell và các file trang con; đổi tên `template-*`, `demo-data` theo vai trò hiện hành.
- Bỏ các component không còn nối vào route, adapter S3 chưa dùng, script tạo tài liệu theo giao diện cũ và cấu hình/review của công cụ cá nhân khỏi bản Git hiện hành.
- Giữ API, domain booking, database migration và dữ liệu mẫu admin để bên sau tiếp tục phát triển. Seed cũ được giữ như công cụ thử nghiệm có điều kiện chạy rõ ràng.
- Chuyển hai workbook vào `docs/assets`, giữ nguyên nội dung. Ảnh công khai và lịch sử migration được giữ nguyên.
- Chuẩn hóa định dạng; sửa command hỏng, bổ sung hướng dẫn môi trường, database, ảnh và triển khai.
- Giữ tên kỹ thuật `lago-*`, redirect cũ và các lớp CSS đang dùng để tránh thay đổi tương thích ngoài phạm vi dọn cấu trúc.

Các file bị bỏ vẫn có trong lịch sử Git trước lần bàn giao; mốc trước khi dọn là `49a286a`. Có thể xem một file cũ bằng `git show 49a286a:duong/dan/file` mà không thay đổi bản đang làm việc.

## Kiểm chứng bản bàn giao

Đã kiểm tra trên một bản sao mới, cài dependency từ lockfile, dùng `.env.example` với demo bật và webhook để trống. Môi trường: Windows, Node.js 20.19.0, npm 10.8.2, Next.js 15.5.20, Prisma 6.19.3.

| Kiểm tra                                             | Kết quả                                                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm ci`                                             | Cài đặt thành công trên bản sao chưa có `node_modules`                                          |
| `npm run db:generate`, `npm exec prisma -- validate` | Sinh client thành công, schema hợp lệ                                                           |
| `npm run check`                                      | Đạt định dạng, kiến trúc, TypeScript, 12 file test / 55 test và production build                |
| Production build                                     | Sinh đủ 64 trang; không cần database để build demo                                              |
| HTTP trên bản production                             | 42 trang công khai trả 200, 4 redirect đặt phòng/tra cứu đúng đích, route không tồn tại trả 404 |
| Admin chưa đăng nhập                                 | Chuyển về trang đăng nhập                                                                       |
| Form tư vấn tại máy                                  | Dữ liệu rỗng bị từ chối; dữ liệu thử hợp lệ được nhận và ghi log; không gửi ra dịch vụ ngoài    |
| `npm run qa:images`                                  | Không có ảnh lỗi trên 6 trang được script kiểm tra; đã xem ảnh chụp trang chủ ở 1440px và 390px |
| Seed khi chưa bật điều kiện                          | Từ chối chạy với thông báo rõ ràng, trước khi ghi database                                      |
| Workbook và tài nguyên                               | Hai workbook giữ nguyên Git blob; ảnh công khai và SQL migration giữ nguyên                     |
| Liên kết tài liệu, diff                              | Không có liên kết file nội bộ bị hỏng; kiểm tra whitespace đạt                                  |

Test còn gồm một số kiểm tra nội dung/source để giữ các ràng buộc giao diện, chưa thay thế kiểm thử tương tác đầy đủ. Cảnh báo cấu hình Prisma trong `package.json` và Vite CJS còn tồn tại ở phiên bản dependency đang khóa; không nâng cấp framework trong lần dọn này.

Docker/PostgreSQL, webhook ngoài, quyền domain/VPS và vận hành production cần kiểm tra trên môi trường của bên nhận. Một lần build thành công không xác nhận các phần này đã hoạt động.
