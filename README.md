# LAKA Homestay

Website giới thiệu LAKA Homestay bằng tiếng Việt và tiếng Anh, có danh mục lưu trú, hình ảnh, thực đơn và form yêu cầu tư vấn. Luồng công khai hiện chuyển khách sang tư vấn; `/dat-phong` và `/tra-cuu` chuyển hướng tới `/lien-he`.

Phần admin và đăng nhập đã được gỡ khỏi dự án. Repo giữ API đặt phòng và schema PostgreSQL để phát triển tiếp. Đọc [hiện trạng bàn giao](docs/handover.md) trước khi triển khai cho khách thật.

## Chạy trên máy

Môi trường kiểm tra bàn giao dùng Node.js 20.19.0 và npm 10.8.2; Dockerfile hiện dùng Node 20. Dùng `npm ci` để cài đúng phiên bản trong `package-lock.json`. Các lệnh bên dưới chạy tại thư mục gốc của repo.

```sh
npm ci
```

Tạo file môi trường **một lần**. Dùng `.env` để cả Next.js và Prisma CLI đọc được cùng cấu hình.

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```sh
cp .env.example .env
```

Giữ `DEMO_MODE="true"`, sau đó chạy:

```sh
npm run db:generate
npm run dev
```

Mở <http://localhost:3000>. Chế độ này không cần PostgreSQL. Nếu máy đã có `.env.local`, Next.js ưu tiên các giá trị trong đó; kiểm tra để tránh lệch với `.env` mà Prisma sử dụng.

Booking demo lưu trong bộ nhớ tiến trình và mất khi khởi động lại. Website không có tài khoản đăng nhập hoặc khu vực quản trị.

## Các lệnh thường dùng

| Lệnh                                            | Công dụng                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                                   | Chạy môi trường phát triển; mặc định cổng 3000                    |
| `npm run dev -- --port 3001`                    | Chạy dev trên cổng khác                                           |
| `npm run check`                                 | Lần lượt kiểm tra định dạng, kiến trúc, TypeScript, test và build |
| `npm run typecheck`                             | Kiểm tra TypeScript, không xuất JavaScript                        |
| `npm test`                                      | Chạy test một lần                                                 |
| `npm run test:watch`                            | Chạy test khi sửa code                                            |
| `npm run format`                                | Định dạng code và tài liệu bằng Prettier                          |
| `npm run format:check`                          | Kiểm tra định dạng, không sửa file                                |
| `npm run build`                                 | Tạo bản build production trong `.next/`                           |
| `npm start`                                     | Chạy bản build đã tạo; không thay cho lệnh build                  |
| `npm run db:generate`                           | Sinh Prisma Client từ schema; không ghi database                  |
| `npm run db:migrate`                            | Áp dụng migration đã có vào database trong `DATABASE_URL`         |
| `npm run db:migrate:dev -- --name ten_thay_doi` | Tạo migration khi phát triển schema trên database riêng           |
| `npm run images:import -- "duong-dan-anh-goc"`  | Chuyển bộ ảnh LAKA theo ánh xạ cố định; xem hướng dẫn ảnh         |
| `npm run qa:images -- http://localhost:3000`    | Kiểm tra ảnh trên một website đang chạy, cần Chrome               |

`npm run check` không chạy PostgreSQL, gửi webhook hay kiểm tra VPS. Chưa cấu hình ESLint riêng; kiểm tra mã nguồn hiện dùng TypeScript, kiểm tra kiến trúc và test. Seed mẫu là thao tác riêng có điều kiện, xem [hướng dẫn database](docs/deployment.md#thử-nghiệm-với-postgresql).

## Cấu trúc

```text
src/
  app/                 Route, layout gốc, metadata và API
  features/
    showcase/          Website công khai: trang, component, nội dung, bản dịch
    stays/             Danh mục loại căn và 20 căn hiển thị trên website
    booking/           Validation, tính giá và giữ phòng demo
  server/              Prisma và giới hạn tần suất yêu cầu
  shared/              Thương hiệu, UI nhỏ và tiện ích dùng chung
prisma/                Schema, migration và seed thử nghiệm
public/                Logo, ảnh LAKA và ảnh thực đơn
scripts/               Kiểm tra kiến trúc, nhập ảnh, kiểm tra ảnh
tests/                 Test nghiệp vụ, nội dung và các ràng buộc giao diện
deploy/                Mẫu reverse proxy Nginx
docs/                  Tài liệu kỹ thuật, nội dung và workbook tài nguyên
```

## Đọc tiếp

- [Kiến trúc và vị trí sửa chức năng](docs/architecture.md).
- [Cấu hình, PostgreSQL và triển khai](docs/deployment.md).
- [Hiện trạng, giới hạn và việc cần tiếp tục](docs/handover.md).
- [Hình ảnh và workbook tài nguyên](docs/assets/README.md).
- [Nguồn nội dung đã duyệt](docs/laka-content-source.md) và [nhận diện thương hiệu](docs/brand-system.md).

Các tên kỹ thuật `lago-homestay`, mã booking `LAGO-*`, tên database và volume `lago_db` được giữ để tương thích dữ liệu, URL và triển khai cũ. Tên hiển thị cho khách là LAKA Homestay.
