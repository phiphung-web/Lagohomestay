# Claude Workspace cho LAKA

Claude Workspace là giao diện local để Claude Opus thực hiện các phần việc nặng mà không dùng token Codex trong lúc Claude đang làm việc. Claude và Codex dùng chung repository, nhưng trao đổi qua gói bàn giao có cấu trúc.

## Khởi động

Mở PowerShell tại repository:

```powershell
$env:NGHIMMO_API_KEY="<key-của-bạn>"
npm run claude:workspace
```

Sau đó mở:

```text
http://127.0.0.1:4310
```

Key chỉ được đọc từ biến môi trường của process. Không ghi key vào source, `.env`, transcript hoặc gói bàn giao.

## Chế độ Tự động tối đa

Mặc định giao diện bật:

- Model `nghi/claude-opus-5-thinking`.
- Tối đa 24.000 output token mỗi vòng.
- Ngân sách 8,5 triệu token cho một job.
- Tối đa 60 vòng công cụ như một chốt chống vòng lặp lỗi.
- Không giới hạn thời gian chờ ở phía Claude Workspace.
- Tự retry tối đa 5 lần khi gateway trả `429` hoặc lỗi `5xx`.

Đây không phải quota vô hạn. Gateway vẫn áp dụng quota tài khoản, thời hạn key và giới hạn request/phút. Có thể bấm **Dừng Claude** bất kỳ lúc nào.

## Công cụ Claude được phép dùng

- Đọc tổng quan repository, Git status và file map.
- Đọc tối đa 12 file liên quan trong một lần.
- Tìm code bằng ripgrep.
- Web search công khai.
- Mở tối đa 6 URL, mỗi URL tối đa 3 viewport bằng Chrome/Edge headless.
- Thực hiện flow tương tác an toàn gồm click, điền form, nhấn phím, cuộn, chờ và chụp ảnh để kiểm tra menu, tab, modal.
- Lưu screenshot và số liệu DOM vào thư mục evidence.
- Chạy TypeScript, test, build, architecture check hoặc full check.
- Khi bật **Cho phép sửa code**:
  - Thay thế exact text trong file đã đọc.
  - Tạo file mới trong `src`, `tests`, `docs`, `public`, `scripts` hoặc `tools`.

Claude không được phép đọc secret, chạy lệnh shell tùy ý, cài package, xóa file, commit, push, deploy hoặc sửa Git history.

Nếu Next dev server đang chạy ở cổng `3000`, công cụ sẽ chủ động bỏ qua `build` và `full_check` để hai tiến trình không cùng ghi vào `.next`. Dừng dev server trước khi yêu cầu Claude chạy production build.

## Bàn giao cho Codex

Nhấn **Bàn giao Codex** sau khi Claude hoàn thành. Dữ liệu được lưu tại:

```text
.ai-handoff/
├── active-session.json
└── sessions/<session-id>/
    ├── session.json
    ├── transcript.jsonl
    ├── messages.json
    ├── summary.md
    ├── decisions.md
    ├── changed-files.json
    ├── test-results.md
    └── evidence/
```

Quay lại Codex và nhắn:

```text
Đọc phiên Claude trong .ai-handoff/active-session.json, kiểm tra code và tiếp tục.
```

Codex sẽ đọc tóm tắt, transcript, diff thực tế, kết quả kiểm thử và ảnh QA. Token Codex chỉ bắt đầu được dùng khi Codex tiếp nhận.

## Quy tắc tránh xung đột

- Không để Claude và Codex cùng sửa code một lúc.
- Trước khi bật sửa code, bảo đảm biết rõ thay đổi đang có trong Git.
- Claude không commit. Codex hoặc người dùng review diff rồi mới commit/push.
- Gói `.ai-handoff` bị Git ignore và chỉ tồn tại local.

## Kiểm tra cài đặt

```powershell
npm run claude:check
```

Lệnh này kiểm tra chặn path traversal, file nhạy cảm, quyền ghi, origin local, tool mode và khả năng mở Chrome/Edge.
