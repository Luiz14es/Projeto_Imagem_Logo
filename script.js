const imgs = document.getElementById("img");
const inputLogo = document.getElementById("logoInput");
const logoContainer = document.getElementById("logoContainer");
let idx = 0;
let x = 0, y = 0;

function carossel() {
    idx++;
    if (idx > imgs.children.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function anteriorImg() {
    idx--;
    if (idx < 0) {
        idx = imgs.children.length - 1;
    }
    imgs.style.transform = `translateX(${-idx * 500}px)`;
}

function proximaImg() {
    idx++;
    if (idx > imgs.children.length - 1) {
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

inputLogo.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const newImg = document.createElement('img');
        newImg.src = e.target.result;
        newImg.alt = "Logo do usuário";
        newImg.style.width = "150px"; 
        newImg.style.height = "150px"; 
        newImg.style.top = "0"; 
        newImg.style.left = "0"; 

        logoContainer.appendChild(newImg);  
        
        addInteractToLogo(newImg);
    }

    reader.readAsDataURL(file);
});

function addInteractToLogo(element) {
    let x = 0, y = 0;

    interact(element)
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({ x: 30, y: 30 })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    restriction: "#logoContainer",
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                    endOnly: true
                })
            ],
            inertia: true
        })
        .on('dragmove', function (event) {
            x += event.dx;
            y += event.dy;
            event.target.style.transform = `translate(${x}px, ${y}px)`;
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move(event) {
                    const target = event.target;
                    let x = (parseFloat(target.getAttribute('data-x')) || 0);
                    let y = (parseFloat(target.getAttribute('data-y')) || 0);

                    target.style.width = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.transform = `translate(${x}px,${y}px)`;

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            },
            modifiers: [
                interact.modifiers.restrictEdges({ outer: '#logoContainer' }),
                interact.modifiers.restrictSize({ min: { width: 50, height: 50 } })
            ],
            inertia: true
        });
}
