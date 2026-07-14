# Lago Homestay

Website đặt phòng tiếng Việt và CRM vận hành cho Lago Homestay. Giao diện hiện dùng dữ liệu và hình ảnh concept để có thể duyệt trải nghiệm trước khi có nội dung thực tế.

## Cấu trúc mã nguồn

Mã ứng dụng nằm hoàn toàn trong `src/` và được chia theo trách nhiệm:

```text
src/
├── app/          # Next.js routes, layouts và API entrypoints
├── features/     # Nghiệp vụ độc lập: admin, booking, stays
├── server/       # Auth, database, security và storage phía server
├── shared/       # Component và utility dùng chung, không chứa nghiệp vụ
└── types/        # Khai báo type mở rộng toàn cục
```

Schema, migration và seed database đặt trong `prisma/`; kiểm thử domain đặt trong `tests/`; cấu hình build và triển khai giữ ở thư mục gốc. Xem [quy ước kiến trúc](docs/architecture.md) trước khi bổ sung feature mới.

## Chạy nhanh ở chế độ demo

```bash
npm install
copy .env.example .env.local
npm run db:generate
npm run dev
```

Giữ `DEMO_MODE="true"` để xem toàn bộ giao diện và thử luồng đặt phòng mà không cần PostgreSQL. CRM tại `/admin` dùng tài khoản mẫu:

- Email: `owner@lago.local`
- Mật khẩu: `Lago@2026`

## Chạy với PostgreSQL

```bash
docker compose up -d db
npm run db:migrate:dev -- --name init
npm run db:seed
```

Sau đó đổi `DEMO_MODE="false"`. Production nên đặt `SESSION_SECRET` ngẫu nhiên tối thiểu 32 ký tự, cấu hình backup PostgreSQL và thay toàn bộ thông tin liên hệ/ảnh concept.

## Kiểm tra

```bash
npm test
npm run build
```

Các API chính: `GET /api/availability`, `POST /api/bookings`, `POST /api/bookings/lookup`, `GET /api/health`. Việc tạo booking trên PostgreSQL chạy trong transaction `Serializable` và dùng advisory lock theo đơn vị phòng để chặn tranh chấp đồng thời.

Production cần gọi `POST /api/tasks/expire-holds` mỗi phút với header `Authorization: Bearer $HOLD_EXPIRY_SECRET`. Docker image tự chạy `prisma migrate deploy` trước khi khởi động ứng dụng.
