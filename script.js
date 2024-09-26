// script.js

// Seleciona o input e a área de imagem
const imageInput = document.getElementById('imageInput');
const uploadedImage = document.getElementById('uploadedImage');

// Quando o usuário faz o upload de uma imagem
imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    uploadedImage.src = e.target.result; // Define a imagem enviada
    uploadedImage.style.display = 'block'; // Mostra a imagem na div
  };

  reader.readAsDataURL(file); // Lê o arquivo como URL
});

// Interact.js para permitir que a imagem seja movida e redimensionada
interact('.user-image')
  .draggable({
    onmove: function (event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // Move a imagem
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    const target = event.target;
    const width = event.rect.width;
    const height = event.rect.height;

    // Atualiza o tamanho da imagem
    target.style.width = width + 'px';
    target.style.height = height + 'px';
  });
