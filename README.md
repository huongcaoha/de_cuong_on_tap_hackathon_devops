# 📘 Đề Cương Ôn Tập Môn DevOps Fundamental - PTIT

Đề cương ôn tập toàn diện, dễ hiểu và trực quan hóa cho sinh viên **Học viện Công nghệ Bưu chính Viễn thông (PTIT)** và kỹ sư DevOps mới bắt đầu. Toàn bộ nội dung được thiết kế dưới dạng ứng dụng Web HTML hiện đại, chuẩn UI/UX, hỗ trợ tương tác và thực hành trực tiếp.

---

## 🎯 3 Chủ Đề Cốt Lõi Trong Đề Cương

### 1. 🐧 Các Câu Lệnh Thao Tác Với Tệp Tin Trong Linux VPS
- **Bản chất cây thư mục Linux**: Phân biệt thư mục gốc `/`, `/etc` (cấu hình), `/var/www` (mã nguồn web), `/var/log` (nhật ký hệ thống), `/tmp`, `/home`, `/root`.
- **Định hướng & Liệt kê**: `pwd`, `cd` (`..`, `~`, `-`), `ls` với các cờ quan trọng (`-l`, `-a`, `-h`, `-t`, `-r`).
- **Thao tác tệp tin**: `touch`, `mkdir -p`, `cat`, `less`, `head`, `tail -f` (theo dõi log thời gian thực), soạn thảo `nano` & `vim`.
- **Sao chép, di chuyển & xóa**: `cp -r`, `mv`, `rm -rf` kèm cảnh báo an toàn tránh xóa nhầm máy chủ.
- **Tìm kiếm & Lọc**: `find` theo tên/kích thước, `grep -rni` tìm chuỗi trong code, kết hợp đường ống Pipe `|`.
- **Phân quyền & Sở hữu (Trọng tâm bài thi)**:
  - Cấu trúc chuỗi ký hiệu 10 ký tự: `-rwxr-xr-x`.
  - Hệ số Bát phân: `r=4`, `w=2`, `x=1`.
  - Bảng quyền chuẩn: `755` (thư mục web), `644` (file tĩnh HTML/CSS), `777` (nguy hiểm), `600`/`400` (SSH key).
  - Lệnh `chmod` và `chown -R www-data:www-data`.
- **Nén & Dung lượng**: `tar -czvf`, `tar -xzvf`, `df -h`, `du -sh *`, liên kết mềm Symbolic Link `ln -s`.

### 2. 🌿 Các Câu Lệnh Thao Tác Với Git Flow
- **Bản chất mô hình phân nhánh Git Flow** của Vincent Driessen.
- **2 Nhánh vĩnh viễn**: `main` (Production, gắn Tag phiên bản) và `develop` (Tích hợp trung tâm).
- **3 Nhánh hỗ trợ tạm thời**:
  - `feature/*`: Tách từ `develop` -> code -> merge `--no-ff` về `develop`.
  - `release/*`: Tách từ `develop` -> fix lỗi nhỏ, bump version -> merge cả `main` & `develop` -> xóa nhánh.
  - `hotfix/*`: Vá lỗi khẩn cấp trực tiếp từ `main` -> fix -> merge cả `main` & `develop` -> gắn Tag.
- **Quy trình lệnh chi tiết**: Thực hiện bằng cả **Git thuần túy (Pure Git)** và công cụ mở rộng `git flow`.
- **Quy tắc vàng**: Vì sao bắt buộc dùng cờ `--no-ff` (No Fast-Forward), tại sao Hotfix phải merge về cả 2 nhánh.

### 3. ⚡ Nginx Và Deploy Ứng Dụng Nginx Với HTML
- **Nginx là gì?**: Web Server hiệu năng cao, Reverse Proxy, Load Balancer. Kiến trúc Event-driven bất đồng bộ giải quyết bài toán C10K connection.
- **Quản lý dịch vụ qua systemd**: `systemctl status / start / stop / restart / reload` (Zero Downtime) và `nginx -t` (kiểm tra cú pháp).
- **Cấu trúc thư mục Nginx**: `/etc/nginx/nginx.conf`, `/etc/nginx/sites-available/`, `/etc/nginx/sites-enabled/`, `/var/log/nginx/`.
- **File cấu hình Virtual Host chuẩn**: Phân tích chi tiết `listen 80;`, `server_name;`, `root;`, `index;`, `try_files $uri $uri/ =404;`, Cache headers, custom error page.
- **Quy trình 9 Bước Deploy HTML từ A-Z**: Chuẩn bị VPS -> Cài Nginx -> Đưa code lên (`git clone`/`scp`) -> Phân quyền `www-data` -> Tạo file cấu hình -> Tạo Symlink -> `nginx -t` & `systemctl reload nginx` -> Mở Firewall UFW -> Kiểm tra trình duyệt.
- **Bảng tra cứu khắc phục lỗi (Troubleshooting)**: Sửa triệt để lỗi `403 Forbidden`, `404 Not Found`, `502 Bad Gateway`.

---

## 🛠️ Các Tính Năng Tương Tác Đặc Biệt

1. **💻 Terminal Playground Simulator**: Gõ lệnh trực tiếp hoặc bấm các chip gợi ý (`pwd`, `ls -lah`, `nginx -t`, `systemctl status nginx`, `git status`, `git flow init`, `chmod 755`) để xem màn hình console máy chủ phản hồi chân thực.
2. **🧮 Interactive Permission Calculator**: Tick chọn các quyền Đọc (r), Ghi (w), Thực thi (x) cho Owner/Group/Others -> Hệ thống tự động tính ra mã số Octal (755, 644...), chuỗi ký tự Symbolic (`-rwxr-xr-x`) và sinh lệnh `chmod` chuẩn xác.
3. **🎯 Hệ Thống Trắc Nghiệm 10 Câu Có Chấm Điểm**: Bộ câu hỏi trắc nghiệm thực chiến bám sát nội dung đề thi, hiển thị ngay đúng/sai và phần giải thích cặn kẽ.
4. **📋 Lưu Tiến Độ Học Tập (Progress Tracking)**: Đánh dấu các phần đã học, hệ thống tự động lưu vào `localStorage` của trình duyệt và hiển thị thanh tiến độ hoàn thành theo %.
5. **🔍 Thanh Tìm Kiếm Trực Tiếp (Live Search)**: Gõ bất kỳ lệnh hoặc từ khóa nào (`chmod`, `hotfix`, `try_files`...) để lọc ngay nội dung liên quan trong tích tắc.
6. **🌓 Chuyển Đổi Giao Diện Sáng / Tối (Dark / Light Mode)**: Phù hợp cho cả việc học ban đêm lẫn ban ngày.
7. **🖨️ Chế Độ In Ấn / Xuất PDF**: Đã tối ưu CSS `@media print` giúp bạn in ra giấy hoặc lưu thành file PDF đề cương học tập đẹp mắt, không bị lỗi bố cục.

---

## 🚀 Hướng Dẫn Sử Dụng

### Cách 1: Mở Trực Tiếp Trên Trình Duyệt (Khuyên Dùng Cho Cá Nhân)
- Bạn chỉ cần **nhấp đúp chuột (Double click)** vào file `de_cuong_on_tap_devops_ptit.html` hoặc `index.html`.
- Mọi trình duyệt hiện đại (Google Chrome, Microsoft Edge, Mozilla Firefox, Cốc Cốc, Safari, Brave...) đều mở được ngay lập tức, **không cần cài đặt thêm bất kỳ phần mềm nào**, hoạt động hoàn toàn offline!

### Cách 2: Khởi Chạy Bằng Local Web Server
Nếu bạn muốn chạy như một website cục bộ trên máy tính:

```bash
# Mở terminal tại thư mục De_Cuong_On_Tap rồi chạy lệnh:
python -m http.server 8080

# Sau đó mở trình duyệt truy cập:
http://localhost:8080
```

---

## 📁 Cấu Trúc Thư Mục

```
De_Cuong_On_Tap/
│── index.html                         # Giao diện chính (chế độ module liên kết style.css và app.js)
│── style.css                          # Hệ thống thiết kế CSS (Design System, Dark/Light, Responsive)
│── app.js                             # Logic tương tác (Terminal Sim, Calculator, Quiz, Search, Progress)
│── de_cuong_on_tap_devops_ptit.html   # File duy nhất tích hợp sẵn (All-in-one standalone, dễ chia sẻ)
└── README.md                          # Hướng dẫn chi tiết sử dụng đề cương ôn tập
```

---
*Chúc các bạn sinh viên PTIT ôn tập hiệu quả và đạt điểm số xuất sắc trong kỳ thi môn DevOps!* 🎓
