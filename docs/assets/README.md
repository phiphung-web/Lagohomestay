# Hình ảnh và tài liệu tài nguyên

## File đang có

| File                                                                                   | Vai trò                                                                |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [LAKA_Homestay_Asset_Order_List.xlsx](LAKA_Homestay_Asset_Order_List.xlsx)             | Bản đặt tài nguyên gốc, giữ để đối chiếu lịch sử                       |
| [LAKA_Homestay_Asset_Order_List_READY.xlsx](LAKA_Homestay_Asset_Order_List_READY.xlsx) | Bản chỉnh trình bày dành cho trao đổi tài nguyên ảnh                   |
| [Nguồn nội dung](../laka-content-source.md)                                            | Nội dung được ghi nhận đã duyệt và phần còn cần xác nhận               |
| [Brief tài nguyên](../laka-resource-brief.md)                                          | Kế hoạch yêu cầu ảnh/nội dung ban đầu, không phải kiểm kê file hiện có |
| [Nhận diện thương hiệu](../brand-system.md)                                            | Logo, màu và cách dùng tên thương hiệu                                 |

Hai workbook được chuyển từ thư mục gốc vào đây, giữ nguyên nội dung. Chữ `READY` chỉ phân biệt phiên bản tài liệu; không chứng nhận rằng thay file ảnh theo workbook là website tự cập nhật. Cả hai đều không được ứng dụng đọc khi chạy.

## Ánh xạ ảnh trên website

- Logo: `public/brand/` và favicon `src/app/icon.png`.
- Bộ ảnh LAKA: `public/images/laka/`; đường dẫn theo slot ở `src/features/showcase/data/laka-images.ts`.
- Danh mục căn và gallery: `src/features/stays/data/stay-catalog.ts`.
- Thực đơn nhà hàng: `public/images/dining/restaurant/`; thứ tự trang ở `src/features/showcase/data/dining-menu.ts`.
- Thực đơn LAKA Coffee: `public/images/dining/cafe/menu-laka-coffee.jpg`; trang Ẩm thực liên kết tới ảnh gốc để đọc tên món và giá.
- Ảnh Unsplash còn dùng cho các vị trí chưa có ảnh địa điểm: đối chiếu `conceptImages` và `isConceptImage`, giữ nhãn minh họa khi sử dụng.

Để thay ảnh, xác định đúng slot trong mã nguồn, đặt ảnh vào `public`, cập nhật đường dẫn nếu đổi tên rồi kiểm tra cả desktop/mobile. Nếu tăng số ảnh gallery hoặc số trang thực đơn, sửa cả mảng dữ liệu; chỉ chép file vào thư mục sẽ không thêm ảnh vào giao diện.

## Nhập lại bộ ảnh gốc

`scripts/import-laka-images.mjs` dành cho cấu trúc thư mục giao ảnh hiện có (`TrangchuLaka`, `LuutruLaka`, `TrainghiemLaka`, `DichvuLaka`). Script chứa ánh xạ tên nguồn sang WebP và cấu hình chất lượng. Bộ ảnh gốc nằm ngoài repo; cần bàn giao riêng nếu bên nhận muốn xuất lại.

Kiểm tra trước bằng thư mục xuất riêng:

```sh
npm run images:import -- "duong-dan-den/Images Laka" ".tmp/images-preview"
```

Đọc thông báo thiếu file và xem ảnh đầu ra. Khi đã đối chiếu đúng, lệnh dưới đây ghi đè các ảnh đích tương ứng trong `public/images/laka`:

```sh
npm run images:import -- "duong-dan-den/Images Laka"
```

Không chạy lệnh nhập ảnh chỉ để cài hoặc khởi động website. WebP dùng để chạy ứng dụng đã nằm trong Git.

## Kiểm tra ảnh và chụp màn hình

Chạy website ở một terminal, dùng terminal khác tại gốc repo:

```sh
npm run qa:images -- http://localhost:3000
```

Script dùng Chrome đã cài. Nếu dùng Edge, PowerShell:

```powershell
$env:BROWSER_CHANNEL = "msedge"
npm run qa:images -- http://localhost:3000
```

Nếu trình duyệt ở đường dẫn riêng, đặt `BROWSER_PATH` thành đường dẫn tuyệt đối tới file thực thi; biến này ưu tiên hơn `BROWSER_CHANNEL`. macOS/Linux dùng cú pháp `BROWSER_CHANNEL=chrome npm run qa:images -- http://localhost:3000`.

Ảnh chụp và `report.json` nằm trong `.tmp/qa-images/`, được Git bỏ qua. Có thể truyền thư mục đích làm tham số thứ hai. Script kiểm tra một tập trang chính, báo số ảnh lỗi và thoát với mã lỗi nếu có ảnh không tải được. Đây là kiểm tra tải ảnh; vẫn cần xem crop, chữ trên ảnh và quyền sử dụng nội dung.

Các script tạo workbook/chụp vị trí theo bản giao diện cũ đã được bỏ khỏi repo hiện hành. Có thể tra lại trong lịch sử Git nếu cần đối chiếu cách tạo tài liệu ban đầu.
