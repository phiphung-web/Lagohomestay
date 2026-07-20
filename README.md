# LAKA Homestay

Website đặt phòng tiếng Việt và CRM vận hành cho LAKA Homestay. Giao diện hiện dùng dữ liệu và hình ảnh concept để có thể duyệt trải nghiệm trước khi có nội dung thực tế.

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
- Mật khẩu: `LAKA@2026`

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

## Đưa showroom thiết kế lên VPS

Ba mẫu trình bày có URL riêng tại `/mau/tinh-lang`, `/mau/dien-anh` và `/mau/song-dong`. Bản demo public chạy cô lập, không cần PostgreSQL và chỉ mở cổng loopback `127.0.0.1:3100`. Cấu hình này không chiếm cổng `80/443` của các website khác trên VPS.

```bash
cp .env.demo.example .env.demo
# Điền domain, cổng loopback còn trống và SESSION_SECRET ngẫu nhiên.
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml up -d --build
```

Trước khi chạy phải kiểm tra cổng và dịch vụ hiện có, tuyệt đối không thay cấu hình web server toàn cục:

```bash
ss -lntp | grep ':3100' || true
docker ps --format 'table {{.Names}}\t{{.Ports}}'
systemctl is-active nginx apache2 httpd 2>/dev/null || true
```

Sau khi container khỏe, thêm một vhost riêng cho domain LAKA vào Nginx/Apache đang có. File `deploy/nginx-lago.conf.example` chỉ là mẫu; không chép đè `nginx.conf` hay vhost khác. Luôn chạy `nginx -t` hoặc lệnh kiểm tra tương ứng trước khi reload.

Kiểm tra sau triển khai:

```bash
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml ps
curl -fsS http://127.0.0.1:3100/api/health
curl -fsS https://your-domain.example/api/health
```
