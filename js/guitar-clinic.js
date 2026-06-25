// =================================================================
// ─── ส่วนที่ 1: ระบบตาราง QUICK FILTER ───────────────────────────
// =================================================================
function filterCategory(category) {
  // สลับ Class Active บนปุ่มตัวกรองเพื่อไฮไลต์สีทอง
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // ตรวจเช็กและไฮไลต์ปุ่มที่ถูกกดคลิก
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }

  // ซ่อน หรือ แสดง แถวในตารางตามเงื่อนไขหมวดหมู่ที่เลือก
  const rows = document.querySelectorAll('#matrixTable tbody tr');
  rows.forEach(row => {
    const rowCategory = row.getAttribute('data-category');
    if (category === 'all' || rowCategory === category) {
      row.style.display = ''; // แสดงแถว
    } else {
      row.style.display = 'none'; // ซ่อนแถว
    }
  });
}

// =================================================================
// ─── ส่วนที่ 2: คลังข้อมูลรูปภาพและเนื้อหาสำหรับ POPUP MODAL ────────
// =================================================================
// คุณสามารถแก้ไขข้อความ หรือเปลี่ยนลิงก์รูปภาพในโฟลเดอร์ images/ ได้จากตรงนี้เลยครับ
const galleryData = {
  diagnosis: {
    title: "1. Diagnosis & Check",
    desc: "ก่อนเริ่มงานซ่อมทุกครั้ง เราจะทำการตรวจเช็กโครงสร้างไม้คอ (Neck Relief) องศาการวางหย่อง และสภาพเฟรตอย่างละเอียด เพื่อหาสาเหตุที่แท้จริงของอาการสายตีเฟรตหรือทัชชิ่งเพี้ยน ไม่ใช่แค่การแก้ปัญหาปลายเหตุ",
    images: [
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Inspection+1",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Neck+Relief+Check",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Nut+Slot+Analysis"
    ]
  },
  precision: {
    title: "2. Digital Precision",
    desc: "ลาก่อนการกะระยะด้วยสายตา ที่ Darinworks เราวัดค่า Action และ Intonation ด้วยเครื่องมือมาตรฐานวิศวกรรม คุมความคลาดเคลื่อนให้อยู่ในระดับมิลลิเมตร (0.01mm) เพื่อสัมผัสการเล่นที่เพอร์เฟกต์ที่สุด",
    images: [
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Digital+Gauge",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Action+Measurement",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Feeler+Gauge",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Radius+Check"
    ]
  },
  hydration: {
    title: "3. Care & Hydration",
    desc: "งานเซ็ตอัปของเราปิดท้ายด้วยการทำความสะอาดฮาร์ดแวร์ทุกชิ้น และคืนความชุ่มชื้นให้ฟิงเกอร์บอร์ดด้วยออยล์สกัดธรรมชาติเกรดพรีเมียม ป้องกันไม้แตกร้าวและยืดอายุการใช้งานเครื่องดนตรีของคุณ",
    images: [
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Fretboard+Oil",
      "https://via.placeholder.com/800x600/1a1a1a/c9a84c?text=Hardware+Polishing"
    ]
  }
};

// ตัวแปรเก็บสถานะการสไลด์ปัจจุบัน
let currentSlideIndex = 0;
let currentGallery = [];

// =================================================================
// ─── ส่วนที่ 3: ฟังก์ชันควบคุม MODAL POPUP & CAROUSEL SLIDER ──────
// =================================================================

// ฟังก์ชันเปิดป๊อปอัปเมื่อกดกล่องสเปก
function openModal(categoryKey) {
  const modal = document.getElementById('galleryModal');
  const data = galleryData[categoryKey];
  
  if (!data) return;

  // บรรจุข้อมูลชื่อหัวข้อและคำอธิบายลงในป๊อปอัป
  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalDesc').innerText = data.desc;
  
  // โหลดเซ็ตกลุ่มรูปภาพ
  currentGallery = data.images;
  currentSlideIndex = 0; // รีเซ็ตให้แสดงผลที่รูปแรกสุดเสมอ
  
  renderSlides(); // สร้างอิลิเมนต์รูปภาพ
  renderDots();   // สร้างจุดไข่ปลา
  updateCarousel(); // อัปเดตการแสดงผลรูปและจุดให้ตรงกัน

  modal.classList.add('active'); // เปิดหน้าต่างป๊อปอัปให้แสดงผล
}

// ฟังก์ชันปิดป๊อปอัปเมื่อกดพื้นที่สีดำภายนอก
function closeModal(event) {
  if (event.target.id === 'galleryModal') {
    document.getElementById('galleryModal').classList.remove('active');
  }
}

// ฟังก์ชันปิดป๊อปอัปเมื่อกดปุ่มกากบาท [X] ตรงๆ
function closeModalDirect() {
  document.getElementById('galleryModal').classList.remove('active');
}

// ฟังก์ชันสร้างโครงสร้างรูปภาพใน HTML
function renderSlides() {
  const container = document.getElementById('slideContainer');
  container.innerHTML = ''; // ล้างรูปของเก่าออกให้สะอาดก่อน
  
  currentGallery.forEach((imgUrl, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${imgUrl}" alt="Darinworks Process ${index + 1}">`;
    container.appendChild(slide);
  });
}

// ฟังก์ชันสร้างจุดไข่ปลาด้านล่างรูปภาพ (Instagram Style)
function renderDots() {
  const dotsContainer = document.getElementById('dotsContainer');
  dotsContainer.innerHTML = ''; // ล้างจุดเก่าออกก่อน
  
  currentGallery.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    // ลูกเล่นเพิ่มเติม: พอลูกค้ากดที่จุดไข่ปลาก็จะสลับรูปภาพไปยังตำแหน่งนั้นได้ทันที
    dot.onclick = () => {
      currentSlideIndex = index;
      updateCarousel();
    };
    dotsContainer.appendChild(dot);
  });
}

// ฟังก์ชันเลื่อนรูปภาพเมื่อกดปุ่มลูกศรซ้าย-ขวา (-1 คือย้อนกลับ, 1 คือถัดไป)
function changeSlide(direction) {
  currentSlideIndex += direction;
  
  // ลอจิกการวนลูป: ถ้าเลยรูปสุดท้ายให้กลับไปรูปแรก หรือถ้าถอยหลังเกินรูปแรกให้ไปรูปท้ายสุด
  if (currentSlideIndex >= currentGallery.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = currentGallery.length - 1;
  }
  
  updateCarousel();
}

// ฟังก์ชันอัปเดตสถานะ Active เพื่อเปิดปิดรูปภาพและจุดไข่ปลาให้สัมพันธ์กันคีย์เวิร์ดตรงกัน
function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  // รีเซ็ตการแสดงผลรูปภาพและจุดไข่ปลาทั้งหมดออกก่อน
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // สั่ง Active เปิดแสดงผลเฉพาะรูปและจุดที่ตรงกับ Index ปัจจุบันเท่านั้น
  if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add('active');
  if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}
