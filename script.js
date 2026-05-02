document.addEventListener('DOMContentLoaded', function() {

    // ── Tema claro/oscuro ──────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        } else {
            themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        }
    }

    // ── Pestañas Novedades / Galería ───────────────
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Quitar activo de todo
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            // Activar el que se clickeó
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });

    // ── Interacción de Videos ──────────────────────
    const videos = document.querySelectorAll('.media-video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            // Si está en el lightbox, no hacemos el play/pause simple aquí
            if (video.closest('.lightbox-content')) return;
            
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // ── LIGHTBOX ───────────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const mediaItems = document.querySelectorAll('.media-item');

    mediaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            let content = '';

            if (img) {
                content = `<img src="${img.src}" alt="Gallery Image">`;
            } else if (video) {
                content = `<video src="${video.src}" autoplay controls playsinline></video>`;
            }

            lightboxContent.innerHTML = content;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxContent.innerHTML = '';
        document.body.style.overflow = ''; // Restaurar scroll
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // ── Ocultar Preloader ──────────────────────────
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        const percentageText = document.getElementById('loader-percentage');
        let count = 0;
        
        // Animación del porcentaje
        const interval = setInterval(() => {
            count++;
            percentageText.innerText = count + '%';
            if (count >= 100) {
                clearInterval(interval);
                // Un pequeño delay después de llegar a 100%
                setTimeout(() => {
                    preloader.classList.add('loaded');
                }, 500);
            }
        }, 20); // Ajusta la velocidad aquí
    });

});

