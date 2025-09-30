// datos de flores (déjalos tal cual)
const floresData = [
  { img: "img/carro1.jpg", msg: "Me encanta cómo logras hacerme sonreír incluso en los días difíciles. Gracias por existir en mi vida." },
  { img: "img/carro2.webp", msg: "Eres el pedacito de paz que calma mis tormentas." },
  { img: "img/carro3.webp", msg: "Cuando miro tus ojos, encuentro el hogar que siempre soñé." },
  { img: "img/carro4.webp", msg: "Contigo aprendo que el verdadero amor se siente en los detalles más simples." },
  { img: "img/carro5.webp", msg: "Eres la casualidad más bonita que llegó a mi vida." },
  { img: "img/carro6.jpg", msg: "Gracias por ser mi apoyo, mi alegría y mi mejor compañía." },
  { img: "img/carro7.jpg", msg: "Contigo, cada día es una oportunidad para ser feliz." },
  { img: "img/carro8.webp", msg: "A tu lado, el tiempo deja de correr y solo existe la felicidad." },
  { img: "img/carro9.jpg", msg: "No necesito nada más cuando estoy contigo." },
  { img: "img/carro10.webp", msg: "Eres mi refugio, mi alegría y mi mejor historia." }
];

// función para abrir modal-flor (usada por onclick en el HTML)
window.mostrarModalFlor = function(idx) {
  const modal = document.getElementById('modal-flor');
  const modalImg = document.getElementById('modal-img');
  const modalMsg = document.getElementById('modal-msg');
  if (!modal || !modalImg || !modalMsg) return;
  const data = floresData[idx] || floresData[0];
  modalImg.src = data.img;
  modalMsg.textContent = data.msg;
  modal.style.display = 'flex';
};

// espera a que exista el DOM
document.addEventListener('DOMContentLoaded', () => {
  // referencias seguras
  const btn = document.getElementById('btn-iniciar');
  const pantalla = document.getElementById('pantalla-inicio');
  const flowers = document.querySelector('.flowers'); // en tu HTML la clase es .flowers
  const music = document.getElementById('bgMusic');
  const goToCardBtn = document.getElementById('goToCardBtn');
  const card = document.getElementById('card');
  const mensajeFlores = document.querySelector('.mensaje-flores'); // 🔹 referencia al mensaje

  // Modal-flor cierre (X y click fuera)
  const modalFlor = document.getElementById('modal-flor');
  const cerrarModal = document.getElementById('cerrar-modal');
  if (cerrarModal && modalFlor) {
    cerrarModal.addEventListener('click', () => { modalFlor.style.display = 'none'; });
    modalFlor.addEventListener('click', (e) => { if (e.target === modalFlor) modalFlor.style.display = 'none'; });
  }

  // botón iniciar: oculta pantalla y muestra flores + reproduce música
  if (btn) {
    btn.addEventListener('click', () => {
      if (pantalla) pantalla.style.display = 'none';
      if (flowers) flowers.style.display = 'block';
      if (mensajeFlores) mensajeFlores.style.display = 'block'; // 🔹 mostrar mensaje
      if (music) {
        music.loop = true;
        music.play().catch(err => console.log("Autoplay bloqueado:", err));
      }
    });
  }

  // aseguramos que el botón quede abajo (si existe)
  if (goToCardBtn) {
    goToCardBtn.style.position = "absolute";
    goToCardBtn.style.bottom = "40px";
    goToCardBtn.style.left = "50%";
    goToCardBtn.style.transform = "translateX(-50%)";
    goToCardBtn.style.zIndex = "9999";

    // texto inicial
    goToCardBtn.innerText = "Ver tarjeta";

    goToCardBtn.addEventListener('click', () => {
      if (goToCardBtn.innerText === "Ver tarjeta") {
        // estamos en flores → mostrar tarjeta
        if (flowers) flowers.style.display = 'none';
        if (mensajeFlores) mensajeFlores.style.display = 'none'; // 🔹 ocultar mensaje
        if (card) setTimeout(() => { card.style.display = 'grid'; }, 400);
        goToCardBtn.innerText = "Regresar";
      } else {
        // estamos en la tarjeta → volver a flores
        if (card) card.style.display = 'none';
        if (flowers) flowers.style.display = 'block';
        if (mensajeFlores) mensajeFlores.style.display = 'block'; // 🔹 volver a mostrar
        goToCardBtn.innerText = "Ver tarjeta";
      }
    });
  }

  // Modal de sorpresa + confetti
  const openBtn = document.getElementById('openBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeBtn');
  const confettiRoot = document.getElementById('confetti');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      spawnConfetti(40);
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }

  // partículas
  function lanzarParticula() {
    const container = document.querySelector('.particles');
    if (!container) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = (Math.random() * 100) + 'vw';
    const size = (Math.random() * 1.2 + 0.6);
    particle.style.width = size + 'vmin';
    particle.style.height = size + 'vmin';
    const dur = Math.random() * 1.2 + 1.7;
    particle.style.animationDuration = dur + 's';
    const translateX = (Math.random() - 0.5) * 12;
    particle.style.transform = `translateX(${translateX}vw)`;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), dur * 1000);
  }

  setInterval(() => {
    for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) lanzarParticula();
  }, 400);
});
