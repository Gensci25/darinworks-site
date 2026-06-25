/* =========================================
   Universal Active Menu Script
   จัดการไฮไลต์เมนูสีทองสำหรับ Darinworks
========================================= */
document.addEventListener("DOMContentLoaded", function() {
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll('.header-nav a, .minimal-tabs a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    let isMatch = false;

    // 1. ดักจับหน้าแรกสุด (Home)
    if (linkHref === "index.html" && (currentPath === "index.html" || currentPath === "" || !currentPath.includes('.html'))) {
      isMatch = true;
    }
    // 2. สำหรับกรณีปกติที่ชื่อไฟล์ตรงกันเป๊ะ
    else if (linkHref === currentPath) {
      isMatch = true;
    }
    // 3. กลุ่มหน้าย่อย Prototype
    else if (currentPath.includes('proto') && linkHref.includes('prototype')) {
      isMatch = true;
    }
    // 4. กลุ่มหน้าย่อย Clinic / Services
    else if (currentPath.includes('clinic') && linkHref.includes('services')) {
      isMatch = true;
    }

    if (isMatch) {
      link.classList.add('active');
    }
  });
});
