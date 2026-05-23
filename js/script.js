document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const loginBtn = document.getElementById('login-btn');

    // Manejo adaptativo de menú móvil (Hamburguesa)
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterna los iconos de FontAwesome entre barras y cerrar (X)
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar el menú automáticamente al seleccionar una categoría (Modo Celular)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Evento click del botón de Login con Discord
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('Redirigiendo a los servidores de OAuth2 de Discord...');
            // Aquí podrás poner más adelante tu enlace real:
            // window.location.href = 'https://discord.com/api/oauth2/...';
        });
    }
});