const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('./'));

const CLIENT_ID = '1507533598700605570';
const CLIENT_SECRET = 'OC0bTdTmP1-_CMSim1Htv3MdZhRWa5QY';

// Detecta si es localhost o blutter.xyz
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PRODUCTION ? 'https://blutter.xyz' : 'http://localhost:3000';
const REDIRECT_URI = `${BASE_URL}/`;

app.get('/api/login', (req, res) => {
    // 1. Definimos la URL de Discord con tu ID y tu Redirect URI
    const authUrl = `https://discord.com/oauth2/authorize?client_id=1507533598700605570&response_type=code&redirect_uri=https%3A%2F%2Fblutter.xyz%2F&scope=identify+guilds`;
    
    // 2. FORZAMOS la redirección al navegador del usuario
    res.redirect(authUrl);
});

app.get('/', async (req, res, next) => {
    const { code } = req.query;
    if (!code) return next();

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }));

        const { access_token } = tokenResponse.data;
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const user = userResponse.data;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        const userData = JSON.stringify({ username: user.username, avatar_url: avatarUrl });

        res.send(`
            <script>
                localStorage.setItem('discord_user', '${userData}');
                window.location.href = '/dashboard.html';
            </script>
        `);
    } catch (err) {
        res.send('Error en la autenticación.');
    }
});

app.listen(3000, () => console.log(`Servidor corriendo en ${BASE_URL}`));