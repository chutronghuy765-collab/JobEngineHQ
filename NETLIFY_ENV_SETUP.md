# Hướng dẫn cấu hình Environment Variables trên Netlify

## Vấn đề

### Lỗi 1: Thiếu Environment Variables
Website sau khi deploy lên Netlify bị lỗi:
```
Supabase URL and Anon Key are required. Check your .env file or Netlify environment variables.
```

### Lỗi 2: CORS Policy Error (QUAN TRỌNG!)
Website bị chặn bởi CORS khi gọi API Supabase:
```
Access to fetch at 'https://avwspwhbkxyrdvwcibvq.supabase.co/rest/v1/jobs...' 
from origin 'https://jobenginehq.com' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Nguyên nhân:** Supabase chưa được cấu hình để cho phép domain `https://jobenginehq.com` truy cập API.

## Giải pháp

### 🔴 BƯỚC QUAN TRỌNG NHẤT: Cấu hình CORS trên Supabase

**Bạn PHẢI làm bước này trước, nếu không website sẽ vẫn bị lỗi CORS!**

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Scroll xuống phần **CORS Configuration** hoặc **Allowed Origins**
5. Thêm domain của bạn vào danh sách allowed origins:
   - `https://jobenginehq.com`
   - `https://www.jobenginehq.com` (nếu có)
   - `http://localhost:3000` (cho development - nếu chưa có)
6. Click **Save** hoặc **Update**

**Lưu ý:** 
- Nếu không thấy mục CORS Configuration, có thể Supabase tự động cho phép tất cả origins trong development mode
- Đối với production, bạn cần thêm domain cụ thể
- Có thể cần đợi vài phút để cấu hình có hiệu lực

---

### Bước 1: Lấy thông tin từ Supabase

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy 2 giá trị sau:
   - **Project URL** (ví dụ: `https://avwspwhbkxyrdvwcibvq.supabase.co`)
   - **anon public** key (key dài, bắt đầu với `eyJ...`)

### Bước 2: Thêm Environment Variables trên Netlify

1. Đăng nhập vào [Netlify Dashboard](https://app.netlify.com)
2. Chọn site của bạn (JobEngineHQ)
3. Vào **Site configuration** → **Environment variables** (hoặc **Site settings** → **Build & deploy** → **Environment**)
4. Click **Add variable**
5. Thêm 2 biến sau:

   **Biến 1:**
   - **Key**: `REACT_APP_SUPABASE_URL`
   - **Value**: Dán Project URL từ Supabase (ví dụ: `https://avwspwhbkxyrdvwcibvq.supabase.co`)
   - **Scopes**: Chọn **All scopes** (hoặc **Production**, **Deploy previews**, **Branch deploys**)

   **Biến 2:**
   - **Key**: `REACT_APP_SUPABASE_ANON_KEY`
   - **Value**: Dán anon public key từ Supabase (key dài, bắt đầu với `eyJ...`)
   - **Scopes**: Chọn **All scopes** (hoặc **Production**, **Deploy previews**, **Branch deploys**)

6. Click **Save** sau mỗi biến

### Bước 3: Redeploy website

Sau khi thêm environment variables:

1. Vào **Deploys** tab trên Netlify
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Hoặc đợi Netlify tự động deploy lại (nếu đã kết nối với GitHub)

### Bước 4: Kiểm tra

Sau khi deploy xong, mở website và kiểm tra:
- Website không còn lỗi về Supabase
- Có thể xem danh sách jobs
- Có thể apply jobs

## Lưu ý quan trọng

⚠️ **KHÔNG** commit file `.env` lên GitHub vì nó chứa thông tin nhạy cảm.

✅ Environment variables trên Netlify sẽ được tự động inject vào build process.

## Thông tin Supabase của bạn

Dựa trên thông tin đã cung cấp trước đó:
- **Project URL**: `https://avwspwhbkxyrdvwcibvq.supabase.co`
- **Anon Key**: Lấy từ Supabase Dashboard → Settings → API → anon public key

## Troubleshooting

### Nếu vẫn gặp lỗi CORS sau khi đã cấu hình:

1. **Kiểm tra lại CORS trên Supabase:**
   - Vào Supabase Dashboard → Settings → API
   - Đảm bảo domain `https://jobenginehq.com` đã được thêm vào allowed origins
   - Nếu có subdomain (www), cũng cần thêm `https://www.jobenginehq.com`

2. **Kiểm tra domain chính xác:**
   - Mở Developer Tools (F12) → Console
   - Xem lỗi CORS hiển thị origin nào (ví dụ: `https://jobenginehq.com`)
   - Đảm bảo domain trong Supabase CORS settings khớp chính xác (có/không có www, http/https)

3. **Đợi vài phút:**
   - Cấu hình CORS có thể cần vài phút để có hiệu lực
   - Thử clear browser cache và reload lại

4. **Kiểm tra Supabase project settings:**
   - Đảm bảo project không ở chế độ "Paused" hoặc có vấn đề gì
   - Kiểm tra API keys có còn valid không

### Nếu vẫn gặp lỗi về Environment Variables:

1. **Kiểm tra tên biến**: Phải chính xác là `REACT_APP_SUPABASE_URL` và `REACT_APP_SUPABASE_ANON_KEY` (có tiền tố `REACT_APP_`)
2. **Clear cache và redeploy**: Trên Netlify, chọn **Clear cache and deploy site**
3. **Kiểm tra giá trị**: Đảm bảo không có khoảng trắng thừa ở đầu/cuối giá trị
4. **Kiểm tra scopes**: Đảm bảo biến có scope phù hợp (Production, Deploy previews, etc.)

### Thứ tự xử lý lỗi:

1. ✅ **Trước tiên:** Cấu hình CORS trên Supabase (thêm domain vào allowed origins)
2. ✅ **Sau đó:** Thêm Environment Variables trên Netlify
3. ✅ **Cuối cùng:** Redeploy website và kiểm tra

