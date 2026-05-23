document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');

    // Función para obtener el valor de una cookie por nombre
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userDataCookie = getCookie('user_data');

    if (userDataCookie) {
        // La cookie existe, decodificamos el JSON
        const user = JSON.parse(decodeURIComponent(userDataCookie));
        
        authContainer.innerHTML = `
            <div class="user-profile">
                <img src="${user.avatar_url}" alt="Avatar" class="user-avatar">
                <span class="user-name">${user.username}</span>
            </div>
        `;
    } else {
        // No hay cookie, mostrar login
        authContainer.innerHTML = `
            <button class="btn-discord" onclick="window.location.href='/api/login'">
                <i class="fa-brands fa-discord"></i> Login con Discord
            </button>
        `;
    }
});