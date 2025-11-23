# Hướng dẫn chạy website

## Bước 1: Cài đặt Node.js (nếu chưa có)

1. Truy cập: https://nodejs.org/
2. Tải và cài đặt phiên bản LTS (khuyến nghị)
3. Khởi động lại terminal/PowerShell sau khi cài đặt

## Bước 2: Cấu hình Supabase

1. Tạo file `.env` trong thư mục `job-website-v2` với nội dung:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

2. Lấy thông tin từ Supabase:
   - Đăng nhập vào https://supabase.com
   - Vào project của bạn
   - Settings > API
   - Copy "Project URL" và "anon public" key

## Bước 3: Cài đặt dependencies

Mở terminal/PowerShell trong thư mục `job-website-v2` và chạy:

```bash
npm install
```

## Bước 4: Chạy website

```bash
npm start
```

Website sẽ tự động mở tại: http://localhost:3000

## Lưu ý

- Nếu gặp lỗi về Supabase, hãy kiểm tra lại file `.env`
- Đảm bảo Supabase project của bạn đã có các bảng: `jobs`, `applications`
- Nếu cần, bạn có thể chạy với placeholder values trước để xem giao diện

