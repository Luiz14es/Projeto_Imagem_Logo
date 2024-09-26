const imgs = document.getElementById("img");  
const img = document.querySelectorAll("#img img");  
const inputLogo = document.getElementById("logoInput");

let idx = 0;

function carrossel() {
    idx++;

    if (idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function prevImage() {
    idx--;
    if (idx < 0) {
        idx = img.length - 1;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function nextImage() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

document.getElementById("prev").addEventListener("click", () => {
    prevImage();  
});

document.getElementById("next").addEventListener("click", () => {
    nextImage();
    
});