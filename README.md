# Platform — Website Builder kéo thả

Nền tảng dựng website kiểu Shopify / WordPress: kéo thả block, tạo nhiều trang, xuất bản ngay.

## Chạy local

```bash
npm install
npm run dev
```

Mở:

- Website: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Editor trang chủ: http://localhost:3000/edit
- Editor trang khác: http://localhost:3000/about/edit

## Cách dùng

1. Vào **Dashboard** → bấm **Seed trang chủ demo** (hoặc tạo trang mới)
2. Bấm **Chỉnh sửa** để mở editor kéo thả
3. Kéo block từ panel trái (Navbar, Hero, Section, Columns, Card…)
4. Chỉnh props bên phải → bấm **Publish**
5. Xem trang live tại đường dẫn tương ứng

## Stack

- Next.js (App Router)
- Puck (`@puckeditor/core`) — visual page builder
- Tailwind CSS v4
- Lưu trang bằng `database.json` (file local, dễ thay bằng DB sau)

## Cấu trúc chính

- `src/puck.config.tsx` — thư viện block / container
- `src/app/dashboard` — quản lý trang
- `src/app/puck` — editor
- `src/lib/pages.ts` — đọc/ghi trang
- `database.json` — dữ liệu trang đã publish
