// ป้องกันการคลิกขวา (Right-Click)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
    window.open('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', '_blank');
});

// ป้องกันการกด F12 และคีย์ลัดสำหรับดูโค้ด (Developer Tools)
document.onkeydown = function(e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) || 
        (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0)))) {
        e.preventDefault();
        window.open('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', '_blank');
        return false;
    }
}
