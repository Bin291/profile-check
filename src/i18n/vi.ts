const vi = {
  nav: {
    home: 'Trang Chủ',
    about: 'Về Tôi',
    skills: 'Kỹ Năng',
    projects: 'Dự Án',
    contact: 'Liên Hệ',
  },
  hero: {
    badge: 'Fullstack Developer · TP. Hồ Chí Minh',
    viewProjects: 'Xem Dự Án',
    description:
      'Chuyên sâu backend systems & database. Xây dựng hệ thống logic mạnh mẽ, API hiệu năng cao, và trải nghiệm người dùng mượt mà với React, Angular, NestJS.',
  },
  about: {
    label: 'Về Tôi',
    title1: 'Backend-first,',
    title2: 'Fullstack trong thực tế',
    p1: 'Mình là Bình, Fullstack Developer tại ITSS Company, đang học IT tại Đại học Hoa Sen (2022–nay). Điểm mạnh là thiết kế và triển khai hệ thống backend, database architecture, và RESTful API.',
    p2: 'Cũng có khả năng đảm nhận frontend với React, Angular, Next.js. Đã xây dựng và deploy các sản phẩm thực tế phục vụ hàng nghìn người dùng như FormCV, Partner Portal, và Ryhza.',
    timeline: [
      {
        year: '06/2025–nay',
        role: 'Fullstack Developer',
        org: 'ITSS Company',
        note: 'Phát triển website & mobile app, tăng 20% traffic sau 3 tháng',
      },
      {
        year: '2025',
        role: 'Web Developer Intern',
        org: 'Mikademy Co., Ltd.',
        note: 'Tích lũy kinh nghiệm thực tế với môi trường chuyên nghiệp',
      },
      {
        year: '2022–nay',
        role: 'IT — Cử nhân',
        org: 'Đại học Hoa Sen',
        note: 'GPA 2.15 · Chuyên ngành Công nghệ Thông tin',
      },
    ],
    stats: {
      projects: 'Dự Án Thực Tế',
      users: 'Users Phục Vụ',
      uptime: 'API Uptime',
    },
  },
  skills: {
    label: 'Tech Stack',
    title: 'Kỹ Năng',
  },
  projects: {
    label: 'Portfolio',
    title: 'Dự Án Tâm Huyết',
    viewLive: 'Xem trực tiếp',
    list: [
      {
        desc: 'Hệ thống tạo CV tự động với AI giúp hơn 5,000 người tìm việc tối ưu hóa hồ sơ. Thuật toán phân tích CV đạt độ chính xác lọc ứng viên 85%.',
      },
      {
        desc: 'Hệ thống partner tenant cho doanh nghiệp hợp tác với FormCV, xử lý 10,000+ yêu cầu/ngày với uptime 99.5%.',
      },
      {
        desc: 'Nền tảng nghe nhạc trực tuyến với xử lý audio thời gian thực, phục vụ 1,000+ người dùng.',
      },
    ],
  },
  contact: {
    label: 'Liên Hệ',
    title1: 'Có dự án hay',
    title2: 'cơ hội hợp tác?',
    subtitle: 'Mình luôn sẵn sàng trao đổi về các dự án thú vị. Hãy liên hệ qua email hoặc kết nối trực tiếp.',
    namePlaceholder: 'Tên của bạn',
    emailPlaceholder: 'Email của bạn',
    messagePlaceholder: 'Lời nhắn...',
    send: 'Gửi Thông Điệp',
    sending: 'Đang gửi...',
    success: '✓ Gửi thành công! Mình sẽ phản hồi sớm nhất có thể.',
    error: '✗ Gửi thất bại. Vui lòng thử lại hoặc email trực tiếp.',
  },
  footer: {
    rights: '© 2026 Nguyễn Phương Bình. All rights reserved.',
  },
} as const;

export default vi;
