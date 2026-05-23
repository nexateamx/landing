document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    
    // Obtenemos los datos directamente de localStorage
    const userString = localStorage.getItem('discord_user');

    if (userString) {
        try {
            const user = JSON.parse(userString);
            
            // Inyectamos el perfil del usuario
            authContainer.innerHTML = `
                <div class="user-profile">
                    <img src="${user.avatar_url}" alt="Avatar" class="user-avatar">
                    <span class="user-name">${user.username}</span>
                    <button onclick="logout()" class="btn-logout">Cerrar sesión</button>
                </div>
            `;
        } catch (e) {
            console.error("Error al parsear el usuario:", e);
            renderLoginButton();
        }
    } else {
        renderLoginButton();
    }
});

function renderLoginButton() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <a href="/api/login" class="btn-discord">
    <i class="fa-brands fa-discord"></i> Login con Discord
</a>
    `; 
}

function logout() {
    localStorage.removeItem('discord_user');
    window.location.reload(); 
}