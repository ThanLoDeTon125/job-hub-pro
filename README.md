# 🧑‍💼 JobHubPro

Nền tảng tuyển dụng trực tuyến dành cho thị trường Việt Nam. Dự án gồm **2 phần**:

- **Frontend** — React + Vite + TailwindCSS (thư mục `job-hub-pro/`)
- **Backend** — ASP.NET Core Web API + SQL Server (thư mục `JobHubPro.Api/`)

---

## 📁 Cấu trúc dự án

```
gadm41_VNM_2.json/
├── job-hub-pro/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/        # Các trang chính
│   │   │   ├── admin/    # Trang dành cho Admin
│   │   │   ├── candidate/# Trang dành cho ứng viên
│   │   │   └── employer/ # Trang dành cho nhà tuyển dụng
│   │   ├── components/   # Component dùng chung
│   │   ├── layouts/      # Layout cho từng nhóm trang
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Tiện ích, mock data
│   └── .env              # Biến môi trường frontend
│
└── JobHubPro.Api/        # Backend (ASP.NET Core)
    ├── controller/       # API Controllers
    ├── Models/           # Entity Models
    ├── DTOs/             # Data Transfer Objects
    ├── Data/             # DbContext
    ├── Services/         # Business logic
    └── appsettings.json  # Cấu hình kết nối DB
```

---

## ⚙️ Yêu cầu hệ thống

| Công nghệ       | Phiên bản tối thiểu |
|-----------------|---------------------|
| Node.js         | >= 18.x             |
| npm / bun       | npm >= 9 / bun >= 1 |
| .NET SDK        | >= 8.0              |
| SQL Server      | SQL Server Express  |

---

## 🚀 Cài đặt & Chạy dự án

### 1. Backend — ASP.NET Core API

#### Bước 1: Cấu hình cơ sở dữ liệu

Mở file `JobHubPro.Api/appsettings.json` và kiểm tra chuỗi kết nối:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=RecruitmentDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> Thay `.\SQLEXPRESS` thành tên SQL Server instance của bạn nếu cần.

#### Bước 2: Chạy migration (tạo bảng)

```bash
cd JobHubPro.Api
dotnet ef database update
```

#### Bước 3: Khởi động API

```bash
dotnet run
```

API mặc định chạy tại: **`https://localhost:5001`** hoặc **`http://localhost:5000`**

Swagger UI (tài liệu API): **`https://localhost:5001/swagger`**

---

### 2. Frontend — React + Vite

#### Bước 1: Cài đặt dependencies

```bash
cd job-hub-pro
npm install
# hoặc dùng bun:
bun install
```

#### Bước 2: Cấu hình biến môi trường

Mở file `job-hub-pro/.env`:

```env
BACKEND_URL=http://localhost:8000/
```

> Thay đổi URL này khớp với port mà backend API đang chạy.

#### Bước 3: Chạy ứng dụng

```bash
npm run dev
# hoặc:
bun run dev
```

Frontend mặc định chạy tại: **`http://localhost:5173`**

---

## 🌐 Danh sách tất cả các trang

### 🌍 Public — Không cần đăng nhập

| Trang              | URL              | Mô tả                                                                 |
|--------------------|------------------|-----------------------------------------------------------------------|
| Trang chủ          | `/`              | Hero banner, thống kê tổng quan, danh sách việc làm nổi bật, CTA đăng tin |
| Danh sách việc làm | `/jobs`          | Tìm kiếm & lọc việc làm theo từ khóa, địa điểm, lĩnh vực             |
| Chi tiết việc làm  | `/jobs/:id`      | Thông tin chi tiết 1 tin tuyển dụng, yêu cầu, quyền lợi, nút ứng tuyển |
| Đăng nhập          | `/login`         | Form đăng nhập bằng email + mật khẩu                                  |
| Đăng ký            | `/register`      | Form tạo tài khoản mới (ứng viên hoặc nhà tuyển dụng)                |

---

### 👤 Candidate (Ứng viên) — Prefix `/candidate`

> Truy cập tại: `http://localhost:5173/candidate`

| Trang              | URL                    | Mô tả                                               |
|--------------------|------------------------|-----------------------------------------------------|
| Dashboard          | `/candidate`           | Thống kê cá nhân: đã ứng tuyển, đang phỏng vấn, chờ phản hồi, đã lưu. Gợi ý việc làm phù hợp. |
| Hồ sơ cá nhân      | `/candidate/profile`   | Xem và chỉnh sửa thông tin cá nhân, CV, kỹ năng     |
| Việc làm đã ứng tuyển | `/candidate/applied` | Lịch sử các công việc đã ứng tuyển và trạng thái     |
| Việc làm đã lưu    | `/candidate/saved`     | Danh sách việc làm đã đánh dấu / bookmark            |

---

### 🏢 Employer (Nhà tuyển dụng) — Prefix `/employer`

> Truy cập tại: `http://localhost:5173/employer`

| Trang              | URL                     | Mô tả                                                  |
|--------------------|-------------------------|--------------------------------------------------------|
| Dashboard          | `/employer`             | Thống kê: số tin đăng, ứng viên, lượt xem, đã tuyển. Hoạt động gần đây. |
| Thông tin công ty  | `/employer/company`     | Xem và cập nhật thông tin hồ sơ công ty                |
| Quản lý tin đăng   | `/employer/jobs`        | Danh sách tin tuyển dụng đã đăng, thêm/sửa/xóa tin     |
| Quản lý ứng viên   | `/employer/applicants`  | Xem danh sách ứng viên đã nộp hồ sơ, đổi trạng thái    |

---

### 🔑 Admin — Prefix `/admin`

> Truy cập tại: `http://localhost:5173/admin`

| Trang              | URL             | Mô tả                                                        |
|--------------------|-----------------|--------------------------------------------------------------|
| Dashboard          | `/admin`        | Tổng quan toàn hệ thống: tổng việc làm, ứng viên, nhà tuyển dụng, lượt ứng tuyển. Thống kê nhanh. |
| Quản lý người dùng | `/admin/users`  | Xem, tìm kiếm, khóa/mở tài khoản người dùng                 |
| Quản lý việc làm   | `/admin/jobs`   | Duyệt, ẩn hoặc xóa tin tuyển dụng trên toàn hệ thống         |
| Thống kê           | `/admin/stats`  | Biểu đồ và số liệu chi tiết về hoạt động của nền tảng        |

---

### ❌ Trang không tìm thấy

| Trang     | URL  | Mô tả                                 |
|-----------|------|---------------------------------------|
| Not Found | `/*` | Hiển thị khi truy cập URL không tồn tại |

---

## 🔌 API Endpoints (Backend)

Base URL: `http://localhost:5000/api`

| Resource            | GET                        | POST               | PUT                   | DELETE               |
|---------------------|----------------------------|--------------------|-----------------------|----------------------|
| Việc làm            | `GET /api/jobs`            | `POST /api/jobs`   | `PUT /api/jobs/{id}`  | `DELETE /api/jobs/{id}` |
| Người dùng          | `GET /api/user`            | `POST /api/user`   | `PUT /api/user/{id}`  | `DELETE /api/user/{id}` |
| Công ty             | `GET /api/commpanies`      | `POST /api/commpanies` | `PUT /api/commpanies/{id}` | `DELETE /api/commpanies/{id}` |
| Đơn ứng tuyển       | `GET /api/applications`    | `POST /api/applications` | `PUT /api/applications/{id}` | `DELETE /api/applications/{id}` |
| Bookmark            | `GET /api/bookmarks`       | `POST /api/bookmarks` | —                  | `DELETE /api/bookmarks/{id}` |
| Hồ sơ ứng viên      | `GET /api/candidateprofiles` | `POST /api/candidateprofiles` | `PUT /api/candidateprofiles/{id}` | `DELETE /api/candidateprofiles/{id}` |
| Kỹ năng ứng viên    | `GET /api/candidateskills` | `POST /api/candidateskills` | —              | `DELETE /api/candidateskills/{id}` |
| Danh mục            | `GET /api/categories`      | `POST /api/categories` | `PUT /api/categories/{id}` | `DELETE /api/categories/{id}` |
| Danh mục việc làm   | `GET /api/jobcategories`   | `POST /api/jobcategories` | —             | `DELETE /api/jobcategories/{id}` |
| Kỹ năng việc làm    | `GET /api/jobskills`       | `POST /api/jobskills` | —                | `DELETE /api/jobskills/{id}` |

> 📄 Xem đầy đủ tài liệu API tại Swagger: `http://localhost:5000/swagger`

---

## 🛠️ Scripts hữu ích

### Frontend

```bash
npm run dev          # Chạy môi trường development
npm run build        # Build production
npm run preview      # Xem trước bản build
npm run lint         # Kiểm tra lỗi ESLint
npm run test         # Chạy unit tests (Vitest)
npm run test:watch   # Chạy tests ở chế độ watch
```

### Backend

```bash
dotnet run                    # Chạy API
dotnet build                  # Build project
dotnet ef migrations add Init # Tạo migration mới
dotnet ef database update     # Áp dụng migration vào DB
```

---

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite 5** — bundler & dev server
- **React Router v6** — điều hướng SPA
- **TailwindCSS v3** — styling
- **shadcn/ui** + **Radix UI** — component library
- **TanStack Query v5** — quản lý data fetching & caching
- **React Hook Form** + **Zod** — form & validation
- **Lucide React** — bộ icon
- **Recharts** — biểu đồ thống kê
- **Axios** — HTTP client

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** — ORM
- **SQL Server Express** — database
- **Swagger / OpenAPI** — tài liệu API tự động
- **CORS** — cho phép frontend kết nối

---

## 📝 Ghi chú

- Hiện tại frontend sử dụng **mock data** (`src/lib/mock-data.ts`) thay vì gọi API thật. Cần tích hợp Axios/TanStack Query để kết nối backend.
- Chức năng **xác thực (Auth)** (`AuthController.cs`) chưa hoàn chỉnh — file controller hiện đang trống.
- Trang **CandidateSaved** chưa có nội dung đầy đủ.
- CORS đang được cấu hình `AllowAll` — chỉ phù hợp cho môi trường development.
