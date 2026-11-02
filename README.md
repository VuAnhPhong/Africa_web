# Africa — Website Astro cho Netlify

Website chuyển từ Razor sang **Astro**, xuất HTML tĩnh. Giữ sáu trang, layout, CSS, JavaScript, ảnh và chuyển ngôn ngữ VN/EN. Không cần .NET hoặc database.

## Chạy local

Dùng Node.js 24.19.0 (phiên bản đã kiểm tra và cấu hình trên Netlify) cùng npm:

```powershell
cd africa_web
npm.cmd ci
npm.cmd run dev
```

Mở địa chỉ terminal in ra, mặc định http://localhost:4321. Windows dùng npm.cmd nếu PowerShell chặn npm.ps1; macOS/Linux dùng npm.

```powershell
npm.cmd test
npm.cmd run preview
```

Lệnh test build site và kiểm tra các trang, menu active, link, thứ tự script và tài nguyên local. Preview phục vụ bản build trong dist.

## Deploy Netlify

Nếu repo chứa cả Africa, đặt **Base directory = africa_web** (tính từ gốc repo). Nếu repo chỉ chứa nội dung thư mục này, để Base directory trống.

- **Build command:** `npm run build`.
- **Publish directory:** `dist`, tính từ base directory.
- File `netlify.toml` cấu hình build, publish và Node.
- Không cần .NET, adapter Netlify hay Functions cho bản static này.
- Không đặt rewrite `/* /index.html 200`: đây là website nhiều trang HTML riêng.
- Deploy thủ công: chạy `npm.cmd run build`, tải thư mục `dist` lên Netlify.
- `public/_redirects` giữ redirect 301 từ `/Company/Index` sang `/Company/`, kể cả khi upload dist thủ công.

## Cấu hình Dashboard

Đặt biến môi trường `PUBLIC_AFRICA_DASHBOARD_URL` trong Netlify thành URL đầy đủ của hệ thống Africa, ví dụ `https://app.example.com/Dashboards`, trước khi build.

Local có thể copy `.env.example` sang `.env` và điền URL. Khi chưa cấu hình, link Dashboard/Đăng nhập quản trị được ẩn. URL này công khai trong HTML; không đưa bí mật vào đây. Thay biến môi trường cần build/deploy lại.

## Cấu trúc

| URL | File |
|---|---|
| / và /Company/ | src/pages/index.astro, src/pages/Company/index.astro |
| /Company/About/ | src/pages/Company/About.astro |
| /Company/History/ | src/pages/Company/History.astro |
| /Company/Services/ | src/pages/Company/Services.astro |
| /Company/News/ | src/pages/Company/News.astro |
| /Company/Contact/ | src/pages/Company/Contact.astro |

- `src/layouts/CompanyLayout.astro`: header, footer, menu và metadata chung.
- `public/css/uni-style.css`: giao diện.
- `public/js/uni-script.js`: tương tác.
- `public/js/uni-i18n.js`: nội dung đa ngôn ngữ.
- `public/img/company`: ảnh.
- `package-lock.json`: khóa phiên bản dependency, cần commit cùng package.json.

## Phạm vi và giới hạn

- Bản gốc vẫn ở source/Africa.Web; chỉ project africa_web được chuyển sang Astro.
- Chưa có CMS/admin như WordPress. Nội dung chỉnh qua file Astro và JS.
- Form liên hệ/newsletter vẫn là demo: hiện thông báo, chưa gửi email/lưu yêu cầu. Cần nối dịch vụ nhận form trước khi dùng thực tế.
- Link tin tức chi tiết/mạng xã hội dạng # giữ nguyên bản gốc.
- Google Fonts, Font Awesome và dịch vụ nhúng bên ngoài cần Internet.
- Chưa deploy lên tài khoản Netlify hoặc đổi DNS. Không thay đổi database hay hệ thống quản lý Africa.
