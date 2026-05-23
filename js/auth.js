document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const userString = localStorage.getItem('discord_user');

    if (userString) {
        try {
            const user = JSON.parse(userString);
            authContainer.innerHTML = `
                <div class="user-profile">
                    <img src="${user.avatar_url}" alt="Avatar" class="user-avatar">
                    <span class="user-name">${user.username}</span>
                    <button onclick="logout()" class="btn-logout">Cerrar sesión</button>
                </div>
            `;
        } catch (e) {
            renderLoginButton();
        }
    } else {
        renderLoginButton();
    }
});

function renderLoginButton() {
    const authContainer = document.getElementById('auth-container');
    // Construimos la URL dinámicamente según donde estés
    const loginUrl = `${window.location.origin}/api/login`;
    authContainer.innerHTML = `
        <a href="${loginUrl}" class="btn-discord">
            <i class="fa-brands fa-discord"></i> Login con Discord
        </a>
    `;
}

function logout() {
    localStorage.removeItem('discord_user');
    window.location.href = '/';
}