const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.static('./'));

const CLIENT_ID = '1507533598700605570';
const CLIENT_SECRET = 'OC0bTdTmP1-_CMSim1Htv3MdZhRWa5QY';
const REDIRECT_URI = 'http://localhost:3000/'; // Usamos la raíz

// Ruta de Login
app.get('/api/login', (req, res) => {
    const authUrl = `https://discord.com/oauth2/authorize?client_id=1507533598700605570&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=identify+guilds`;
    res.redirect(authUrl);
});

// Ruta única para procesar el callback
app.get('/', async (req, res, next) => {
    const { code } = req.query;

    if (!code) return next(); // Si no hay código, sirve el index.html normalmente

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

        // MÉTODO INFALIBLE: Inyectar en localStorage mediante HTML
        res.send(`
            <script>
                localStorage.setItem('discord_user', '${userData}');
                window.location.href = '/';
            </script>
        `);
    } catch (err) {
        console.error(err);
        res.send('Error en la autenticación.');
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));