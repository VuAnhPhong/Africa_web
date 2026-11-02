# Africa Web — Website giới thiệu VANDAMAFRICA

Website giới thiệu doanh nghiệp VANDAMAFRICA, cung cấp thông tin về công ty, lịch sử phát triển, dịch vụ logistics và xuất nhập khẩu, tin tức và thông tin liên hệ.

Website sử dụng **Astro**, HTML, CSS và JavaScript, hỗ trợ tiếng Việt/tiếng Anh và xuất các trang HTML tĩnh để triển khai trên Netlify.

## Các trang chính

| Trang | Đường dẫn |
|---|---|
| Trang chủ | `/` hoặc `/Company/` |
| Giới thiệu | `/Company/About/` |
| Lịch sử phát triển | `/Company/History/` |
| Dịch vụ | `/Company/Services/` |
| Tin tức | `/Company/News/` |
| Liên hệ | `/Company/Contact/` |

## Yêu cầu

- Node.js **24.19.0**, thống nhất với cấu hình Netlify.
- npm đi kèm Node.js.

## Chạy local

Mở terminal tại thư mục project:

```bash
npm ci
npm run dev
```

Truy cập địa chỉ được hiển thị trong terminal, mặc định **http://localhost:4321**.

Trên Windows, nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd` thay cho `npm`.

## Build và kiểm tra

```bash
npm run build
npm run preview
```

- `build`: tạo website tĩnh trong thư mục `dist`.
- `preview`: xem thử bản build trên máy.

Chạy bộ kiểm tra:

```bash
npm test
```

Lệnh này build website và kiểm tra các trang, menu đang được chọn, liên kết, thứ tự tải script và tài nguyên local.

## Cấu trúc thư mục

```text
africa_web/
├── src/
│   ├── layouts/
│   │   └── CompanyLayout.astro
│   └── pages/
│       ├── index.astro
│       └── Company/
│           ├── index.astro
│           ├── About.astro
│           ├── History.astro
│           ├── Services.astro
│           ├── News.astro
│           └── Contact.astro
├── public/
│   ├── css/uni-style.css
│   ├── js/uni-script.js
│   ├── js/uni-i18n.js
│   ├── img/company/
│   └── _redirects
├── tests/
├── astro.config.mjs
├── netlify.toml
├── package.json
└── package-lock.json
```

## Chỉnh sửa nội dung và giao diện

- **Nội dung từng trang:** chỉnh các file trong `src/pages/Company/`.
- **Header, footer, menu và metadata chung:** chỉnh `src/layouts/CompanyLayout.astro`.
- **Màu sắc, bố cục và responsive:** chỉnh `public/css/uni-style.css`.
- **Menu và hiệu ứng tương tác:** chỉnh `public/js/uni-script.js`.
- **Bản dịch tiếng Việt/tiếng Anh:** chỉnh `public/js/uni-i18n.js`; giữ các khóa `data-i18n` trong giao diện đồng bộ với bản dịch.
- **Hình ảnh:** đặt trong `public/img/company/` và tham chiếu bằng đường dẫn `/img/company/...`.

## Triển khai Netlify

Khi kết nối repository chứa project ở thư mục gốc:

| Thiết lập | Giá trị |
|---|---|
| Base directory | Để trống |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24.19.0` |

Nếu project nằm trong thư mục con của repository, đặt **Base directory** bằng đường dẫn tới thư mục chứa `package.json` và `netlify.toml`.

File `netlify.toml` khai báo cấu hình build. Commit cả `package.json` và `package-lock.json` để giữ phiên bản dependency nhất quán.

Có thể deploy thủ công bằng cách chạy `npm run build` rồi tải thư mục `dist` lên Netlify.

Website có nhiều trang HTML riêng; không thêm rewrite toàn bộ URL về `/index.html`. File `public/_redirects` cấu hình chuyển hướng `/Company/Index` về `/Company/`.

### Liên kết quản trị tùy chọn

Biến môi trường `PUBLIC_AFRICA_DASHBOARD_URL` cấu hình địa chỉ cho nút Dashboard/Đăng nhập quản trị.

- Local: sao chép `.env.example` thành `.env` và điền URL đầy đủ.
- Netlify: đặt biến môi trường trước khi build.
- Để trống nếu không muốn hiển thị các liên kết này.
- Build/deploy lại sau khi thay đổi cấu hình.
- Đây là URL công khai trong HTML; không chứa mật khẩu hoặc thông tin bí mật.

## Lưu ý

- Nội dung được quản lý qua file Astro và JavaScript.
- Form liên hệ và đăng ký bản tin hiện là giao diện demo, chưa gửi email hoặc lưu yêu cầu.
- Các liên kết dạng `#` cần được điền địa chỉ đích khi có nội dung chính thức.
- Google Fonts, Font Awesome và các dịch vụ nhúng bên ngoài cần kết nối Internet.