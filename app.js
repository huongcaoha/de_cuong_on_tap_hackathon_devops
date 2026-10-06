/**
 * ===================================================================
 * ĐỀ CƯƠNG ÔN TẬP DEVOPS FUNDAMENTAL - PTIT
 * Interactive Script Logic: Search, Quiz, Permission Calculator,
 * Copy Code, Dark/Light Mode, Table of Contents Spy, Progress Tracker
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyButtons();
  initReadingProgress();
  initScrollSpy();
  initSearch();
  initCategoryFilter();
  initPermissionCalculator();
  initQuiz();
  initProgressTracker();
  initMobileMenu();
  initTerminalSimulator();
});

/* ==========================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('ptit_devops_theme') || 'light';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ptit_devops_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Đã chuyển sang chế độ ${newTheme === 'dark' ? 'Tối (Dark)' : 'Sáng (Light)'}`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle .theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    // Show Moon icon for light mode
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    // Show Sun icon for dark mode
    icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  }
}

/* ==========================================
   2. Copy Code to Clipboard
   ========================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBox = btn.closest('.code-box');
      if (!codeBox) return;
      const codeElem = codeBox.querySelector('code');
      if (!codeElem) return;

      const textToCopy = codeElem.innerText.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Đã chép!`;
        btn.style.background = 'var(--accent-green)';
        btn.style.color = '#fff';
        showToast('Đã sao chép lệnh vào bộ nhớ tạm!');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Lỗi sao chép:', err);
        showToast('Không thể sao chép, vui lòng thử lại!', true);
      });
    });
  });
}

/* ==========================================
   3. Reading Progress Bar
   ========================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================
   4. ScrollSpy (Active Table of Contents)
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('.topic-section, .sub-section');
  const navLinks = document.querySelectorAll('.sidebar-nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================
   5. Live Search Filter
   ========================================== */
function initSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.content-card, .timeline-item');

    if (query === '') {
      cards.forEach(card => card.style.display = '');
      return;
    }

    let matchCount = 0;
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================
   6. Category Filter (Tabs)
   ========================================== */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.topic-section');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      sections.forEach(sec => {
        if (filter === 'all') {
          sec.style.display = '';
        } else if (sec.classList.contains(filter)) {
          sec.style.display = '';
        } else {
          sec.style.display = 'none';
        }
      });

      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  });
}

/* ==========================================
   7. Interactive Linux Permission Calculator
   ========================================== */
function initPermissionCalculator() {
  const calcCheckboxes = document.querySelectorAll('.calc-cb');
  const digitOutput = document.getElementById('calc-digit-result');
  const symbolicOutput = document.getElementById('calc-symbolic-result');
  const cmdOutput = document.getElementById('calc-cmd-preview');
  const targetFileInput = document.getElementById('calc-target-input');

  if (!calcCheckboxes.length || !digitOutput) return;

  function calculate() {
    let u = 0, g = 0, o = 0;
    let sym = '-';

    // User (Owner)
    if (document.getElementById('cb-u-r')?.checked) { u += 4; sym += 'r'; } else { sym += '-'; }
    if (document.getElementById('cb-u-w')?.checked) { u += 2; sym += 'w'; } else { sym += '-'; }
    if (document.getElementById('cb-u-x')?.checked) { u += 1; sym += 'x'; } else { sym += '-'; }

    // Group
    if (document.getElementById('cb-g-r')?.checked) { g += 4; sym += 'r'; } else { sym += '-'; }
    if (document.getElementById('cb-g-w')?.checked) { g += 2; sym += 'w'; } else { sym += '-'; }
    if (document.getElementById('cb-g-x')?.checked) { g += 1; sym += 'x'; } else { sym += '-'; }

    // Others
    if (document.getElementById('cb-o-r')?.checked) { o += 4; sym += 'r'; } else { sym += '-'; }
    if (document.getElementById('cb-o-w')?.checked) { o += 2; sym += 'w'; } else { sym += '-'; }
    if (document.getElementById('cb-o-x')?.checked) { o += 1; sym += 'x'; } else { sym += '-'; }

    const octal = `${u}${g}${o}`;
    digitOutput.textContent = octal;
    symbolicOutput.textContent = sym;

    const filename = targetFileInput ? (targetFileInput.value.trim() || 'myfile.txt') : 'myfile.txt';
    if (cmdOutput) {
      cmdOutput.textContent = `chmod ${octal} ${filename}`;
    }
  }

  calcCheckboxes.forEach(cb => cb.addEventListener('change', calculate));
  if (targetFileInput) {
    targetFileInput.addEventListener('input', calculate);
  }

  calculate();
}

/* ==========================================
   8. Interactive Quiz System
   ========================================== */
const quizQuestions = [
  {
    question: "Lệnh nào sau đây dùng để xem dung lượng các thư mục con theo định dạng con người dễ đọc (Human-readable)?",
    options: ["df -h", "du -sh *", "ls -l", "free -m"],
    answer: 1,
    explanation: "'du -sh *' (Disk Usage - Summary Human-readable) tính toán và hiển thị kích thước từng tệp/thư mục. Trong khi 'df -h' hiển thị dung lượng toàn bộ ổ đĩa."
  },
  {
    question: "Quyền '755' trong Linux tương ứng với chuỗi ký hiệu quyền hạn (Symbolic) nào?",
    options: ["-rwxrwxrwx", "-rwxr-xr-x", "-rw-r--r--", "-rwxr--r--"],
    answer: 1,
    explanation: "7 = 4+2+1 (rwx), 5 = 4+1 (r-x), 5 = 4+1 (r-x). Vậy 755 là -rwxr-xr-x (Owner toàn quyền, Group & Others đọc và chạy)."
  },
  {
    question: "Để theo dõi log Nginx theo thời gian thực (Real-time updates) khi có truy cập mới, DevOps sử dụng lệnh nào?",
    options: ["cat /var/log/nginx/access.log", "head -n 50 /var/log/nginx/access.log", "tail -f /var/log/nginx/access.log", "nano /var/log/nginx/access.log"],
    answer: 2,
    explanation: "Lệnh 'tail -f' (follow) giữ mở tệp tin và liên tục in ra các dòng log mới nhất được ghi vào."
  },
  {
    question: "Trong quy chuẩn Git Flow, nhánh nào được phân nhánh (branch out) từ 'main' để xử lý sự cố khẩn cấp trên Production?",
    options: ["feature/*", "release/*", "hotfix/*", "bugfix/*"],
    answer: 2,
    explanation: "Nhánh 'hotfix/*' được rẽ nhánh trực tiếp từ 'main' (master) để sửa lỗi cấp bách, sau đó merge vào cả 'main' và 'develop'."
  },
  {
    question: "Khi hoàn thành một nhánh 'feature' trong Git Flow, tại sao nên dùng cờ 'git merge --no-ff'?",
    options: [
      "Để tăng tốc độ merge nhanh hơn",
      "Để ép buộc xóa nhánh tính năng ngay lập tức",
      "Để luôn tạo 1 commit merge, giúp bảo toàn lịch sử và dấu vết của tính năng đó",
      "Để không bao giờ xảy ra xung đột merge conflict"
    ],
    answer: 2,
    explanation: "--no-ff (No Fast-Forward) ngăn Git gộp thẳng commit mà luôn tạo ra một Commit Merge riêng biệt, giữ nguyên cấu trúc nhánh lịch sử."
  },
  {
    question: "Trong Nginx, câu lệnh nào được dùng để kiểm tra tính chính xác của cú pháp cấu hình TRƯỚC KHI nạp lại dịch vụ?",
    options: ["nginx -v", "nginx -t", "systemctl status nginx", "service nginx restart"],
    answer: 1,
    explanation: "'nginx -t' (Test configuration) kiểm tra toàn bộ file config xem có lỗi cú pháp hoặc sai đường dẫn không. Đây là nguyên tắc sống còn tránh làm sập server."
  },
  {
    question: "Khác biệt cơ bản giữa 'systemctl restart nginx' và 'systemctl reload nginx' là gì?",
    options: [
      "restart tắt và mở lại dịch vụ gây gián đoạn ngắn (downtime), reload nạp lại file cấu hình mượt mà không ngắt kết nối (Zero Downtime)",
      "reload tắt hẳn nginx, restart chỉ khởi động lại worker",
      "Hai lệnh này hoàn toàn giống hệt nhau về cơ chế",
      "reload chỉ kiểm tra cú pháp, không áp dụng thay đổi"
    ],
    answer: 0,
    explanation: "'reload' gửi tín hiệu SIGHUP, Nginx nạp config mới với worker processes mới mà không làm rớt các kết nối của người dùng đang truy cập."
  },
  {
    question: "Trong file cấu hình Nginx, directive nào quy định thư mục gốc chứa các file mã nguồn tĩnh (index.html, css, js)?",
    options: ["server_name", "location", "root", "listen"],
    answer: 2,
    explanation: "'root' chỉ định đường dẫn tuyệt đối đến thư mục chứa mã nguồn web trên VPS (ví dụ: root /var/www/my-app;)."
  },
  {
    question: "Để kích hoạt một Virtual Host Nginx từ thư mục 'sites-available' sang 'sites-enabled', ta dùng câu lệnh nào?",
    options: [
      "cp /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/",
      "ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/",
      "mv /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/",
      "touch /etc/nginx/sites-enabled/app.conf"
    ],
    answer: 1,
    explanation: "Dùng liên kết mềm (Symbolic Link 'ln -s') giúp đồng bộ tức thời khi sửa file tại sites-available mà không cần phải copy lại."
  },
  {
    question: "Lệnh nào sau đây gán quyền sở hữu thư mục web '/var/www/my-site' cho người dùng hệ thống chạy Nginx (thường là www-data)?",
    options: [
      "chmod 755 /var/www/my-site",
      "chown -R www-data:www-data /var/www/my-site",
      "usermod -aG root www-data",
      "chgrp nginx /var/www/my-site"
    ],
    answer: 1,
    explanation: "'chown -R www-data:www-data' đổi cả chủ sở hữu (Owner) và nhóm (Group) đệ quy cho toàn bộ thư mục và tệp tin bên trong."
  }
];

function initQuiz() {
  const container = document.getElementById('quiz-questions-container');
  const scoreElem = document.getElementById('quiz-score');
  const totalElem = document.getElementById('quiz-total');

  if (!container) return;

  totalElem.textContent = quizQuestions.length;
  let score = 0;
  let answeredCount = 0;

  quizQuestions.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'quiz-question-card';
    card.id = `quiz-q-${index}`;

    let optionsHtml = '';
    q.options.forEach((opt, optIndex) => {
      optionsHtml += `
        <button class="quiz-option-btn" data-q="${index}" data-opt="${optIndex}">
          <span class="badge-tag">${String.fromCharCode(65 + optIndex)}</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `;
    });

    card.innerHTML = `
      <div class="quiz-q-num">Câu hỏi ${index + 1} / ${quizQuestions.length}</div>
      <div class="quiz-q-text">${escapeHtml(q.question)}</div>
      <div class="quiz-options">${optionsHtml}</div>
      <div class="quiz-explanation" id="quiz-exp-${index}">
        <strong>💡 Giải thích:</strong> ${escapeHtml(q.explanation)}
      </div>
    `;

    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option-btn');
    if (!btn) return;

    const qIndex = parseInt(btn.getAttribute('data-q'), 10);
    const optIndex = parseInt(btn.getAttribute('data-opt'), 10);
    const qData = quizQuestions[qIndex];
    const parentCard = document.getElementById(`quiz-q-${qIndex}`);
    const explanation = document.getElementById(`quiz-exp-${qIndex}`);

    if (parentCard.classList.contains('answered')) return;
    parentCard.classList.add('answered');

    const allBtns = parentCard.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (optIndex === qData.answer) {
      btn.classList.add('correct');
      score++;
      showToast('🎉 Chính xác!');
    } else {
      btn.classList.add('wrong');
      allBtns[qData.answer].classList.add('correct');
      showToast('❌ Chưa đúng, xem giải thích bên dưới', true);
    }

    explanation.classList.add('show');
    answeredCount++;
    scoreElem.textContent = score;

    if (answeredCount === quizQuestions.length) {
      const percentage = Math.round((score / quizQuestions.length) * 100);
      showToast(`🏆 Hoàn thành trắc nghiệm! Điểm số: ${score}/${quizQuestions.length} (${percentage}%)`);
    }
  });
}

/* ==========================================
   9. Learning Progress Tracker (Checklist)
   ========================================== */
function initProgressTracker() {
  const checkboxes = document.querySelectorAll('.topic-check, .check-badge input');
  const countDisplay = document.getElementById('completed-count');
  const percentDisplay = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('sidebar-progress-fill');

  if (!checkboxes.length) return;

  const saved = JSON.parse(localStorage.getItem('ptit_devops_progress') || '{}');

  checkboxes.forEach((cb, idx) => {
    const topicId = cb.getAttribute('data-topic') || `topic-auto-${idx}`;
    if (saved[topicId]) {
      cb.checked = true;
      cb.closest('.check-badge')?.classList.add('checked');
    }

    cb.addEventListener('change', () => {
      saved[topicId] = cb.checked;
      if (cb.checked) {
        cb.closest('.check-badge')?.classList.add('checked');
      } else {
        cb.closest('.check-badge')?.classList.remove('checked');
      }
      localStorage.setItem('ptit_devops_progress', JSON.stringify(saved));
      updateProgress();
      if (cb.checked) {
        showToast('🎯 Tuyệt vời! Bạn đã hoàn thành một mục kiến thức!');
      }
    });
  });

  function updateProgress() {
    let completed = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) completed++;
    });

    const total = checkboxes.length;
    const percent = Math.round((completed / total) * 100);

    if (countDisplay) countDisplay.textContent = `${completed}/${total}`;
    if (percentDisplay) percentDisplay.textContent = `${percent}%`;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
  }

  updateProgress();
}

/* ==========================================
   10. Terminal Playground Simulator
   ========================================== */
function initTerminalSimulator() {
  const terminalBody = document.getElementById('term-sim-output');
  const terminalInput = document.getElementById('term-sim-input');
  const chips = document.querySelectorAll('.terminal-chip');

  if (!terminalBody || !terminalInput) return;

  function runSimCommand(cmd) {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    // Append prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">root@vps-ptit:~#</span> ${escapeHtml(cleanCmd)}`;
    terminalBody.appendChild(promptLine);

    const lower = cleanCmd.toLowerCase();
    let responseHtml = '';

    if (lower === 'clear') {
      terminalBody.innerHTML = '';
      terminalInput.value = '';
      return;
    } else if (lower === 'help') {
      responseHtml = `<div style="color: #93c5fd;">Các lệnh hỗ trợ mô phỏng:<br>
      • <strong>pwd</strong> - In thư mục hiện tại<br>
      • <strong>ls -la</strong> - Liệt kê file và quyền truy cập<br>
      • <strong>nginx -t</strong> - Kiểm tra cú pháp cấu hình Nginx<br>
      • <strong>systemctl status nginx</strong> - Trạng thái dịch vụ Nginx<br>
      • <strong>ufw status</strong> - Trạng thái tường lửa UFW & các port mở<br>
      • <strong>git status</strong> - Trạng thái kho Git và nhánh<br>
      • <strong>git flow init</strong> - Khởi tạo mô hình Git Flow<br>
      • <strong>git merge --abort</strong> - Hủy bỏ quá trình merge đang bị conflict<br>
      • <strong>chmod 755 index.html</strong> - Phân quyền tệp tin<br>
      • <strong>df -h</strong> - Dung lượng ổ đĩa VPS<br>
      • <strong>clear</strong> - Xóa sạch màn hình terminal</div>`;
    } else if (lower === 'pwd') {
      responseHtml = `<div style="color: #34d399;">/var/www/my-static-web</div>`;
    } else if (lower.startsWith('ls')) {
      responseHtml = `<div style="color: #cbd5e1;">total 28K<br>
drwxr-xr-x 3 www-data www-data 4.0K Oct  6 09:00 .<br>
drwxr-xr-x 4 root     root     4.0K Oct  6 08:30 ..<br>
-rw-r--r-- 1 www-data www-data  842 Oct  6 09:05 index.html<br>
-rw-r--r-- 1 www-data www-data 1.2K Oct  6 09:08 style.css<br>
-rw-r--r-- 1 www-data www-data 2.1K Oct  6 09:12 app.js<br>
drwxr-xr-x 2 www-data www-data 4.0K Oct  6 09:02 images<br>
-rw------- 1 www-data www-data  120 Oct  6 09:15 .env</div>`;
    } else if (lower === 'nginx -t') {
      responseHtml = `<div style="color: #34d399;">nginx: the configuration file /etc/nginx/nginx.conf syntax is ok<br>
nginx: configuration file /etc/nginx/nginx.conf test is successful</div>`;
    } else if (lower.includes('status nginx')) {
      responseHtml = `<div style="color: #cbd5e1;">● nginx.service - A high performance web server and a reverse proxy server<br>
&nbsp;&nbsp;Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)<br>
&nbsp;&nbsp;Active: <span style="color: #34d399; font-weight: bold;">active (running)</span> since Sun 2026-10-06 08:00:15 UTC<br>
&nbsp;&nbsp;Main PID: 1248 (nginx)<br>
&nbsp;&nbsp;Tasks: 3 (limit: 2362)<br>
&nbsp;&nbsp;Memory: 6.8M</div>`;
    } else if (lower.includes('reload nginx')) {
      responseHtml = `<div style="color: #34d399;">[OK] Nginx reloaded gracefully without downtime.</div>`;
    } else if (lower === 'git status') {
      responseHtml = `<div style="color: #cbd5e1;">On branch <span style="color: #f59e0b; font-weight: bold;">develop</span><br>
Your branch is up to date with 'origin/develop'.<br>
<br>
nothing to commit, working tree clean</div>`;
    } else if (lower.startsWith('git flow init')) {
      responseHtml = `<div style="color: #cbd5e1;">Initialized empty Git repository in /var/www/my-static-web/.git/<br>
Branch name for production releases: [<span style="color: #60a5fa;">main</span>]<br>
Branch name for "next release" development: [<span style="color: #f59e0b;">develop</span>]<br>
Feature branches? [feature/]<br>
Release branches? [release/]<br>
Hotfix branches? [hotfix/]<br>
<span style="color: #34d399;">Git Flow setup completed successfully!</span></div>`;
    } else if (lower.startsWith('chmod')) {
      responseHtml = `<div style="color: #34d399;">Mode changed successfully. (Quyền hạn mới đã được áp dụng)</div>`;
    } else if (lower.startsWith('chown')) {
      responseHtml = `<div style="color: #34d399;">Ownership updated: www-data:www-data</div>`;
    } else if (lower === 'df -h') {
      responseHtml = `<div style="color: #cbd5e1;">Filesystem&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Size&nbsp;&nbsp;Used&nbsp;Avail&nbsp;Use%&nbsp;Mounted on<br>
/dev/vda1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40G&nbsp;&nbsp;8.4G&nbsp;&nbsp;&nbsp;30G&nbsp;&nbsp;22%&nbsp;/<br>
tmpfs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.9G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;1.9G&nbsp;&nbsp;&nbsp;0%&nbsp;/run/user/0</div>`;
    } else if (lower.startsWith('ufw status')) {
      responseHtml = `<div style="color: #cbd5e1;">Status: <span style="color: #34d399; font-weight: bold;">active</span><br>
<br>
To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From<br>
--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----<br>
22/tcp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ALLOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anywhere<br>
Nginx Full&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ALLOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anywhere<br>
22/tcp (v6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ALLOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anywhere (v6)<br>
Nginx Full (v6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ALLOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anywhere (v6)</div>`;
    } else if (lower.startsWith('git merge --abort')) {
      responseHtml = `<div style="color: #34d399;">Merge aborted. Repository restored to pre-merge state. (Đã hủy merge an toàn)</div>`;
    } else if (lower.startsWith('whoami')) {
      responseHtml = `<div style="color: #f87171;">root</div>`;
    } else {
      responseHtml = `<div style="color: #f87171;">bash: ${escapeHtml(cleanCmd)}: command not found (Gõ 'help' để xem danh sách lệnh)</div>`;
    }

    const outputElem = document.createElement('div');
    outputElem.className = 'terminal-line';
    outputElem.innerHTML = responseHtml;
    terminalBody.appendChild(outputElem);

    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runSimCommand(terminalInput.value);
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      terminalInput.value = cmd;
      runSimCommand(cmd);
    });
  });
}

/* ==========================================
   11. Mobile Menu
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const sidebar = document.querySelector('.app-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close on link click
    sidebar.querySelectorAll('.sidebar-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    });
  }
}

/* ==========================================
   Helper: Toast Notification
   ========================================== */
function showToast(message, isError = false) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) {
    toast.style.borderColor = 'var(--accent-red)';
    toast.style.color = '#fca5a5';
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${isError 
        ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'}
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}
