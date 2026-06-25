/* =========================================
   Universal Active Menu Script (V3 - Bulletproof)
   จัดการไฮไลต์เมนูสีทองสำหรับ Darinworks
========================================= */
document.addEventListener("DOMContentLoaded", function() {
  // 1. ดึงค่าตัวท้ายสุดของ URL ออกมา
  let currentPath = window.location.pathname.split("/").pop();
  
  // 2. ท่าไม้ตาย: ถ้าค่าที่ได้เป็นค่าว่าง หรือไม่มีนามสกุล .html ให้บังคับว่าเป็นหน้า index.html ทันที
  if (currentPath === "" || !currentPath.includes(".html")) {
    currentPath = "index.html";
  }

  // 3. เริ่มค้นหาเมนู
  const navLinks = document.querySelectorAll('.header-nav a, .minimal-tabs a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // กันพัง กรณีเผลอมีแท็ก <a> ที่ไม่ได้ใส่ลิงก์
    if (!linkHref) return; 
    
    let isMatch = false;

    // เช็กเงื่อนไขแบบตรงไปตรงมา
    if (linkHref === currentPath) {
      isMatch = true;
    } else if (currentPath.includes('proto') && linkHref.includes('prototype')) {
      isMatch = true;
    } else if (currentPath.includes('clinic') && linkHref.includes('services')) {
      isMatch = true;
    }

    if (isMatch) {
      link.classList.add('active');
    }
  });
});
