const imgs = document.getElementById("img");  // Seleciona o contêiner
const img = document.querySelectorAll("#img img");  // Seleciona todas as imagens

let idx = 0;

function carrossel() {
    idx++;

    if (idx > img.length - 1) {
        idx = 0;
    }

    // Aplica a transformação ao contêiner das imagens
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