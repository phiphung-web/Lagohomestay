# Cấu hình và triển khai

Tất cả lệnh chạy tại thư mục gốc repo, trừ khi có ghi chú khác. Website demo, database thử nghiệm và môi trường vận hành là ba mục đích khác nhau; chọn đúng mục trước khi chạy lệnh.

## Biến môi trường

| Biến                              | Ý nghĩa                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `DEMO_MODE`                       | `true`: dùng booking trong bộ nhớ. `false`: dùng PostgreSQL khi có `DATABASE_URL`              |
| `DATABASE_URL`                    | Kết nối PostgreSQL. Prisma CLI đọc `.env`; Next.js còn đọc `.env.local`                        |
| `NEXT_PUBLIC_SITE_URL`            | URL gốc cho metadata, sitemap và robots; đặt trước khi build                                   |
| `HOLD_EXPIRY_SECRET`              | Token cho API hết hạn giữ phòng                                                                |
| `INQUIRY_WEBHOOK_URL`             | Endpoint nhận JSON yêu cầu tư vấn. Để trống thì route chỉ ghi log                              |
| `NOTIFICATION_EMAIL`              | Trường `targetEmail` gửi kèm webhook/log; không tự cấu hình dịch vụ email                      |
| `SEED_DEMO_DATA`                  | Chỉ dùng `true` tạm thời khi seed database thử nghiệm bỏ được                                  |
| `LAGO_DOMAIN`, `LAGO_PORT`        | Dùng bởi Docker Compose demo; domain không có `https://`, cổng mặc định 3100                   |
| `NEXT_DIST_DIR`                   | Tùy chọn đổi thư mục build khi cần tách một phiên kiểm tra; build/start phải dùng cùng giá trị |
| `BROWSER_PATH`, `BROWSER_CHANNEL` | Chỉ dành cho script QA ảnh; xem [hướng dẫn ảnh](assets/README.md)                              |

Sinh token cho `HOLD_EXPIRY_SECRET` bằng lệnh sau, sau đó điền kết quả vào file môi trường tương ứng nếu sử dụng API hết hạn giữ phòng:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

File `.env*` thật được Git bỏ qua. Không đưa secret vào README hoặc thay giá trị mẫu trong `.env.example` bằng secret thật.

## Thử nghiệm với PostgreSQL

Yêu cầu Docker Engine có Docker Compose. `docker-compose.yml` dùng PostgreSQL 16 và thông tin đăng nhập mẫu, chỉ mở cổng trên loopback của máy. Cấu hình này phục vụ phát triển; cần cấu hình riêng cho database vận hành.

Sau khi tạo `.env` theo README, chạy:

```sh
docker compose up -d db
npm run db:generate
npm run db:migrate
npm exec prisma -- migrate status
```

PostgreSQL lắng nghe tại `127.0.0.1:5432`, khớp `DATABASE_URL` mẫu cho ứng dụng chạy ngoài Docker. Nếu cổng 5432 đã có dịch vụ, đổi cổng host trong Compose và sửa URL trong `.env` tương ứng. `db:migrate` áp dụng hai migration có sẵn; không tạo thêm migration `init`.

Đặt `DEMO_MODE="false"` trong `.env`, khởi động lại `npm run dev`. Database mới chỉ có schema; cần dữ liệu khởi tạo để dùng các API. Website công khai vẫn lấy danh mục từ mã nguồn.

### Seed mẫu cũ

`prisma/seed.ts` dùng danh mục thử nghiệm cũ, có giá mẫu và ảnh cũ. Nó thay quy tắc giá, cập nhật loại căn và vô hiệu hóa căn ngoài tập mẫu; không tạo tài khoản đăng nhập. Chỉ chạy trên database riêng có thể bỏ được; không dùng để nhập danh mục 20 căn hiện tại.

Script từ chối chạy nếu thiếu `SEED_DEMO_DATA=true` hoặc `NODE_ENV=production`.

PowerShell:

```powershell
$env:SEED_DEMO_DATA = "true"
try { npm run db:seed:demo } finally { Remove-Item Env:SEED_DEMO_DATA }
```

macOS / Linux:

```sh
SEED_DEMO_DATA=true npm run db:seed:demo
```

Khi thay schema trên database phát triển, dùng `npm run db:migrate:dev -- --name ten_thay_doi`, kiểm tra SQL sinh ra rồi commit cả migration. Lệnh đã có `--skip-seed`. Không chạy migration phát triển trên database vận hành.

### Chạy cả ứng dụng và database bằng Docker tại máy

```sh
docker compose up -d --build
docker compose ps
docker compose logs --tail 100 web
```

Trong container, URL database dùng hostname `db` thay cho `localhost`. Ứng dụng mở ở `http://localhost:3000`. Container chạy migration trước khi start khi `DEMO_MODE` không bằng `true`; không tự chạy seed.

`docker compose stop` dừng dịch vụ và giữ dữ liệu. Volume `lago_db` chứa database; không xóa volume khi cần giữ lịch sử.

## Đưa bản website demo lên VPS

Yêu cầu Git, Docker Compose và một reverse proxy đã được quản trị viên cấu hình. Các lệnh dưới đây dùng shell Linux.

```sh
cp .env.demo.example .env.demo
```

Điền `LAGO_DOMAIN`, `LAGO_PORT`. Nếu cần nhận tư vấn thật, cấu hình và thử đầu nhận webhook trước. Bản demo phù hợp cho duyệt website, chưa đủ để vận hành đặt phòng.

Khi cập nhật từ bản có admin, build lại image rồi khởi động lại container để gỡ các route cũ. `SESSION_SECRET` không còn được sử dụng và có thể bỏ khỏi file môi trường trên máy triển khai. Không cần chạy migration mới cho thay đổi này.

Kiểm tra cổng trước khi khởi động:

```sh
ss -lntp
docker ps --format 'table {{.Names}}\t{{.Ports}}'
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml config --quiet
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml up -d --build
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml ps
curl -fsS http://127.0.0.1:3100/api/health
```

Nếu đổi `LAGO_PORT`, đổi cổng trong lệnh `curl` và reverse proxy. Mẫu [nginx-lago.conf.example](../deploy/nginx-lago.conf.example) là một vhost HTTP trỏ tới cổng 3100; cần thay domain và bổ sung TLS theo hệ thống đang dùng. Kiểm tra `nginx -t` trước khi reload. Không ghi đè cấu hình chung hoặc vhost khác.

Sau khi proxy/TLS đã cấu hình:

```sh
curl -fsS https://your-domain.example/api/health
docker compose -p lago-showcase --env-file .env.demo -f docker-compose.demo.yml logs --tail 100 web
```

Docker truyền URL website vào cả bước build lẫn runtime. Nếu đổi domain, build lại để metadata và trang tĩnh dùng domain mới. Health check chỉ xác nhận HTTP của ứng dụng.

## Khi nối hệ thống đặt phòng thật

Trước khi kích hoạt cần có danh mục căn/giá đã đối soát, quy trình xác nhận booking, backup database và kiểm tra các giới hạn ở [bàn giao](handover.md). Không dùng seed cũ làm dữ liệu mở bán.

API hết hạn giữ phòng cần được scheduler gọi mỗi phút. Ví dụ Linux với biến môi trường `SITE_URL` và `HOLD_EXPIRY_SECRET` đã được cấu hình cho scheduler:

```sh
curl --fail --silent --show-error --request POST \
  --header "Authorization: Bearer ${HOLD_EXPIRY_SECRET}" \
  "${SITE_URL}/api/tasks/expire-holds"
```

Ghi nhận bản phát hành và sao lưu database trước khi áp dụng migration. Khôi phục image/source phiên bản trước chỉ xử lý phần ứng dụng; migration và dữ liệu cần kế hoạch phục hồi riêng. Repo chưa có cấu hình backup, scheduler hoặc pipeline deploy production.

## Lỗi thường gặp

| Hiện tượng                                              | Cách kiểm tra                                                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Prisma Client chưa được sinh                            | Chạy `npm run db:generate`                                                                          |
| Prisma CLI kết nối khác ứng dụng                        | Kiểm tra `.env`, `.env.local` và biến của shell; không chép secret vào log                          |
| `ECONNREFUSED` ở cổng 5432                              | Kiểm tra `docker compose ps`, cổng host và `DATABASE_URL`                                           |
| Đổi `.env` mà nội dung URL chưa đổi                     | Khởi động lại dev hoặc build lại production                                                         |
| `spawn EPERM`, không mở được `.next/trace` trên Windows | Kiểm tra quyền chạy tiến trình và phiên dev/build đang dùng thư mục đó; dừng đúng phiên rồi thử lại |
| Script QA không tìm thấy Chrome                         | Đặt `BROWSER_PATH` hoặc `BROWSER_CHANNEL` theo hướng dẫn ảnh                                        |

Phạm vi đã kiểm tra cho lần bàn giao này được ghi riêng trong `handover.md`; hướng dẫn Docker không đồng nghĩa VPS đã được triển khai.
