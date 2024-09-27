const imgs = document.getElementById("img");  
const img = document.querySelectorAll("#img img");  
const inputLogo = document.getElementById("logoInput");
const logo = document.getElementById("logo");
const logoContainer = document.getElementById("logoContainer");

let idx = 0;

function carossel() {
    idx++;

    if (idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function anteriorImg() {
    idx--;
    if (idx < 0) {
        idx = img.length - 1;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function proximaImg() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

document.getElementById("anterior").addEventListener("click", () => {
    anteriorImg();  
});

document.getElementById("proxima").addEventListener("click", () => {
    proximaImg();  
});

inputLogo.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logo.src = e.target.result;
            logo.classList.remove("hidden"); 
        };
        reader.readAsDataURL(file);
    }
});
