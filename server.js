const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const CLIENT_ID = '1507533598700605570';
const CLIENT_SECRET = 'OC0bTdTmP1-_CMSim1Htv3MdZhRWa5QY';

// Detección automática de entorno
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PRODUCTION ? 'https://blutter.xyz' : 'http://localhost:3000';
const REDIRECT_URI = `${BASE_URL}/`;

app.get('/api/login', (req, res) => {
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds`;
    res.redirect(authUrl);
});

app.get('/', async (req, res, next) => {
    const { code } = req.query;
    if (!code) return next(); // Si no hay código, sigue a los archivos estáticos

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
        res.status(500).send('Error en la autenticación.');
    }
});

// 2. Archivos estáticos
app.use(express.static('./'));

// 3. Manejo de error 404 (Siempre al final)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en ${BASE_URL}`));