const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");
const inputLogo = document.getElementById("logoInput");
const logoContainer = document.getElementById("logoContainer");

let idx = 0;
let x = 0, y = 0; 
let angle = 0;

function carrossel() {
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

document.getElementById("anterior").addEventListener("click", () => anteriorImg());
document.getElementById("proxima").addEventListener("click", () => proximaImg());

inputLogo.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const logoElement = document.createElement('img');
            logoElement.src = e.target.result;
            logoElement.id = "logo";  
            logoElement.style.position = "absolute";
            logoElement.style.top = "0";
            logoElement.style.left = "0";
            logoElement.style.width = "100px";  
            logoElement.style.height = "100px"; 
            logoContainer.appendChild(logoElement);

            addInteractToLogo(logoElement);
        };
        reader.readAsDataURL(file);
    }
});

function addInteractToLogo(element) {
    let posX = 0, posY = 0; 

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
            posX += event.dx;
            posY += event.dy;

            event.target.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
            event.target.setAttribute('data-x', posX);
            event.target.setAttribute('data-y', posY);
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

                    target.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            },
            modifiers: [
                interact.modifiers.restrictEdges({ outer: '#logoContainer' }),
                interact.modifiers.restrictSize({ min: { width: 50, height: 50 } })
            ],
            inertia: true
        })
        .gesturable({
            onmove: function (event) {
                angle += event.da; 
                event.target.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
            }
        })
        .on('click', function () {
            angle += 90; 
            angle %= 360; 
            element.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`; 
        });
}
