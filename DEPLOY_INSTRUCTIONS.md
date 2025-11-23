# Hướng dẫn Deploy Schema lên Supabase

## Cách 1: Deploy qua Supabase Dashboard (Khuyến nghị)

1. **Mở Supabase Dashboard**
   - Truy cập: https://supabase.com/dashboard
   - Đăng nhập và chọn project của bạn

2. **Mở SQL Editor**
   - Click vào "SQL Editor" ở menu bên trái
   - Click "New query"

3. **Copy và chạy SQL**
   - Mở file `supabase-schema.sql` trong dự án
   - Copy toàn bộ nội dung
   - Paste vào SQL Editor
   - Click "Run" hoặc nhấn `Ctrl+Enter`

4. **Kiểm tra kết quả**
   - Xem "Table Editor" để kiểm tra các bảng đã được tạo
   - Bạn sẽ thấy 3 bảng: `users`, `jobs`, `applications`

## Cách 2: Deploy qua Supabase CLI

1. **Cài đặt Supabase CLI** (nếu chưa có)
   ```bash
   npm install -g supabase
   ```

2. **Login vào Supabase**
   ```bash
   supabase login
   ```

3. **Link project**
   ```bash
   supabase link --project-ref avwspwhbkxyrdvwcibvq
   ```

4. **Deploy schema**
   ```bash
   supabase db push
   ```

## Cách 3: Sử dụng script Node.js

1. **Thêm service role key vào .env**
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

2. **Chạy script**
   ```bash
   node deploy-schema.js
   ```

   **Lưu ý:** Cách này có thể không hoạt động vì Supabase không hỗ trợ RPC exec_sql mặc định. Khuyến nghị dùng Cách 1.

## Kiểm tra sau khi deploy

1. **Kiểm tra bảng**
   - Vào Table Editor trong Supabase Dashboard
   - Xác nhận có 3 bảng: `users`, `jobs`, `applications`

2. **Kiểm tra RLS Policies**
   - Vào Authentication > Policies
   - Xác nhận các policies đã được tạo

3. **Test kết nối**
   - Chạy website: `npm start`
   - Truy cập trang Jobs để xem có load được dữ liệu không

## Cấu trúc bảng

### Bảng `jobs`
- id (UUID, Primary Key)
- title (TEXT)
- company (TEXT)
- location (TEXT)
- type (job_type ENUM)
- work_model (work_model_type ENUM, nullable)
- is_verified (BOOLEAN)
- salary_min (INTEGER, nullable)
- salary_max (INTEGER, nullable)
- description (TEXT)
- requirements (TEXT[])
- benefits (TEXT[])
- is_active (BOOLEAN)
- employer_id (UUID, nullable)
- created_at, updated_at (TIMESTAMP)

### Bảng `applications`
- id (UUID, Primary Key)
- job_id (UUID, Foreign Key)
- user_id (UUID, Foreign Key, nullable - cho phép guest)
- name (TEXT)
- email (TEXT)
- cover_letter (TEXT)
- linkedin_profile (TEXT, nullable)
- resume_url (TEXT, nullable)
- status (application_status ENUM)
- created_at, updated_at (TIMESTAMP)

### Bảng `users`
- id (UUID, Primary Key, Foreign Key to auth.users)
- email (TEXT)
- full_name (TEXT)
- role (user_role ENUM)
- company (TEXT, nullable)
- created_at, updated_at (TIMESTAMP)

