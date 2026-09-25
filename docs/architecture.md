# Kiến trúc dự án

Ứng dụng dùng Next.js App Router, React, TypeScript và Tailwind CSS. Dữ liệu website nằm trong mã nguồn. PostgreSQL/Prisma phục vụ nhánh API đặt phòng; website công khai hiện không đọc danh mục từ database.

## Website công khai

```text
src/app/[[...path]]/page.tsx
  → i18n/locale.ts                  Tách tiền tố /en
  → site/public-routes.ts           Nhận diện trang và sinh đường dẫn tĩnh
  → site/main-site.tsx              Cấu hình màu và locale
  → site/main-home.tsx              Trang chủ
  → site/site-layout.tsx            Khung các trang còn lại
    → site/page-content.tsx         Chọn component trang
    → pages/*-page.tsx              Nội dung từng trang
```

Các đường dẫn bên dưới `site`, `pages`, `components`, `data`, `i18n` trong phần này đều thuộc `src/features/showcase/`.

`site/site-header.tsx` và `site/site-footer.tsx` được dùng chung cho trang chủ và trang con. `site/site-types.ts` chứa kiểu cấu hình, giúp component nhỏ không phụ thuộc ngược vào toàn bộ layout. `site/navigation.ts` quản lý menu và ghép đường dẫn theo ngôn ngữ.

Layout và page được render phía server. Các phần cần tương tác dùng Client Component riêng: menu mobile, chọn ngôn ngữ, bộ lọc căn, gallery, thực đơn, modal tư vấn. Khi thêm tương tác, đặt state vào component nhỏ nhất cần dùng.

## Sửa ở đâu

| Công việc                                 | File / thư mục                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Thứ tự các phần trang chủ                 | `src/features/showcase/site/main-home.tsx`                                                                                      |
| Nội dung một trang con                    | `src/features/showcase/pages/`                                                                                                  |
| Thêm trang công khai                      | `site/public-routes.ts`, `site/page-content.tsx`, metadata tiếng Anh trong `src/app/[[...path]]/page.tsx`, `src/app/sitemap.ts` |
| Menu và footer                            | `site/navigation.ts`, `site/site-header.tsx`, `site/site-footer.tsx`                                                            |
| Màu và cấu hình website                   | `site/main-site.tsx`, `src/app/globals.css`, `tailwind.config.ts`                                                               |
| Danh mục căn và mã căn                    | `src/features/stays/data/stay-catalog.ts`                                                                                       |
| Ảnh LAKA theo vị trí                      | `data/laka-images.ts`                                                                                                           |
| Dịch vụ, trải nghiệm, nội dung giới thiệu | `data/laka-content.ts`, `data/showcase-content.ts`                                                                              |
| Nội dung chính sách                       | `data/stay-policies.ts`, `pages/policy-page.tsx`, `pages/terms-page.tsx`, `pages/privacy-page.tsx`                              |
| Bản tiếng Anh                             | `i18n/showcase-copy.ts` và nội dung `vi/en` trong feature                                                                       |
| Số điện thoại, Zalo, mạng xã hội và UTM   | `src/shared/lib/public-contact.ts`                                                                                              |
| Gửi yêu cầu tư vấn                        | `src/app/api/inquiry/route.ts`                                                                                                  |
| Giá và điều kiện đặt phòng của API        | `src/features/booking/domain/`                                                                                                  |
| Đăng nhập / session                       | `src/server/auth/auth.ts`                                                                                                       |

Tên file `stay-catalog.ts` và `laka-content.ts` mô tả dữ liệu website đang sử dụng. Giá, ảnh minh họa và chính sách chưa duyệt vẫn có giới hạn được ghi trong tài liệu bàn giao; đổi tên không phải là xác nhận nội dung đã hoàn thiện.

## Hai luồng dữ liệu độc lập

**Tư vấn trên website:** form liên hệ, modal ở header và modal chọn căn gửi `POST /api/inquiry`. Route kiểm tra thông tin cơ bản, giới hạn tần suất, ghi log rồi gửi JSON tới webhook nếu có. Nó không tạo booking, không giữ căn và không gửi email trực tiếp.

**API đặt phòng:** availability / bookings / lookup dùng dữ liệu bộ nhớ khi `DEMO_MODE` khác `"false"` hoặc thiếu `DATABASE_URL`. Khi `DEMO_MODE="false"` và có kết nối database, API dùng Prisma. Giao diện admin vẫn lấy dữ liệu mẫu riêng; nó chưa đọc các bản ghi booking này.

Không dùng giá trị `basePrice: 0` trong danh mục website làm giá bán. Catalog này phục vụ trưng bày; giá và quy tắc của hệ thống đặt phòng phải được vận hành duyệt trước khi nối lại luồng bán phòng.

## API và dữ liệu

| Endpoint                                | Trách nhiệm / điều kiện                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /api/health`                       | Trả trạng thái tiến trình; không thử database hoặc webhook                          |
| `POST /api/inquiry`                     | Nhận yêu cầu tư vấn, log và webhook tùy chọn                                        |
| `GET /api/availability`                 | Kiểm tra khoảng ngày và số khách; trả căn khả dụng cùng báo giá                     |
| `POST /api/bookings`                    | Tạo booking giữ chỗ; nhận header `Idempotency-Key`                                  |
| `POST /api/bookings/lookup`             | Tra cứu bằng số điện thoại; cần bổ sung cơ chế xác minh trước khi dùng dữ liệu thật |
| `PATCH /api/admin/bookings/[id]/status` | Cần session; kiểm tra bước chuyển trạng thái                                        |
| `POST /api/tasks/expire-holds`          | Hết hạn giữ phòng; cần Bearer token bằng `HOLD_EXPIRY_SECRET`                       |
| `/api/auth/[...nextauth]`               | Đăng nhập bằng Credentials và quản lý session                                       |

Quan hệ chính trong schema: `Property → Zone / AccommodationType → Unit → Booking`, booking liên kết `Guest`, có `Payment` và `AuditLog`. Quy tắc giá nằm ở `RateRule`; lịch khóa căn ở `AvailabilityBlock`. Giữ cả thư mục migration khi bàn giao database.

API tạo booking PostgreSQL dùng transaction `Serializable` và advisory lock theo căn. Khoảng ngày được coi là `[checkIn, checkOut)`, nên hai lượt liền kề không chồng nhau. Demo store và rate limiter nằm trong bộ nhớ từng tiến trình, không đồng bộ giữa nhiều instance.

## Quy ước khi phát triển tiếp

- `app` ghép route và xử lý giao thức; nghiệp vụ tái sử dụng đặt trong `features`.
- `server` chứa hạ tầng chỉ chạy phía server. Client Component không import Prisma/auth.
- `shared` không import `app`, `features` hoặc `server`. Component gắn với một chức năng ở cùng feature đó.
- Dùng alias `@/` cho đường dẫn trong `src/`. Không tạo lớp trung gian hoặc file `index.ts` chỉ để gom import.
- Dùng Prettier và `.editorconfig`; comment giải thích quy tắc hoặc lý do xử lý đặc biệt.
- Khi xóa hoặc đổi route, cập nhật redirect, sitemap, metadata và test tương ứng.

`npm run check:architecture` quét import tĩnh bằng alias và phát hiện một số vi phạm tầng cùng thư mục nguồn rỗng. Đây là kiểm tra quy ước, không phải bộ phân tích toàn bộ dependency graph.
