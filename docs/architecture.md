# Kiến trúc LAKA Homestay

## Mục tiêu

Cấu trúc dự án ưu tiên ba điều: tìm file nhanh, cô lập nghiệp vụ và tránh phụ thuộc vòng. Không tạo thư mục dự phòng; mỗi thư mục phải có trách nhiệm và file sử dụng thực tế.

## Ranh giới thư mục

### `src/app`

Chỉ chứa routing của Next.js: `page.tsx`, `layout.tsx`, metadata và API route handlers. Route nên ghép các component/use case có sẵn, không chứa dữ liệu mẫu hoặc logic tính giá phức tạp.

### `src/features`

Mỗi domain có một thư mục riêng:

- `admin`: giao diện và dữ liệu phục vụ CRM.
- `booking`: component luồng đặt phòng, validation, pricing và demo store.
- `stays`: dữ liệu và component trình bày không gian lưu trú.

Bên trong feature chỉ tạo các nhóm đang được dùng như `components`, `data`, `domain` hoặc `server`.

### `src/server`

Chứa hạ tầng chỉ chạy phía server: Auth.js, Prisma, rate limiting và media storage. Client Component không được import trực tiếp module trong thư mục này.

### `src/shared`

Chứa layout, component và utility dùng bởi nhiều feature. `shared` không được import từ `features` hoặc `app`; nếu một component mang ngữ nghĩa nghiệp vụ, đặt nó trong feature tương ứng.

## Chiều phụ thuộc

```text
app → features → shared
app → server
features/server → server
server → shared (khi thật sự cần)
```

Không import ngược từ `shared` vào `features`, từ `features` vào `app`, hoặc từ code client vào `server`.

## Quy ước triển khai

- Dùng alias `@/` trỏ vào `src/`; không tạo đường dẫn tương đối dài xuyên feature.
- Co-locate component, domain logic và dữ liệu với feature sở hữu chúng.
- Prisma schema/migration nằm trong `prisma/`, không trộn với domain source.
- Docker và cấu hình môi trường nằm ở root vì phục vụ toàn ứng dụng.
- Chỉ tạo barrel file khi nó định nghĩa public API thật sự của feature; không tạo `index.ts` chỉ để rút ngắn import.
- Một module dùng chung chỉ được chuyển vào `shared` sau khi có từ hai consumer độc lập.

Chạy `npm run check:architecture` để phát hiện thư mục rỗng, import ngược tầng hoặc Client Component import hạ tầng server. Lệnh `npm run check` chạy đồng thời kiểm tra kiến trúc, unit test và production build.
