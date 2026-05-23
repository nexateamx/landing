const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.static('./'));

const CLIENT_ID = '1507533598700605570';
const CLIENT_SECRET = 'OC0bTdTmP1-_CMSim1Htv3MdZhRWa5QY';
// Cambiamos a tu dominio real
const REDIRECT_URI = 'https://blutter.xyz/'; 

app.get('/api/login', (req, res) => {
    // La URL de autorización ahora usa tu dominio
    const authUrl = `https://discord.com/oauth2/authorize?client_id=1507533598700605570&response_type=code&redirect_uri=https%3A%2F%2Fblutter.xyz%2F&scope=identify+guilds`;
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

        // Redirección al Dashboard tras éxito
       res.send(`
    <script>
        localStorage.setItem('discord_user', '${userData}');
        window.location.href = '/dashboard';
    </script>
`);
    } catch (err) {
        console.error(err);
        res.send('Error en la autenticación.');
    }
});

app.listen(3000, () => console.log('Servidor corriendo en https://blutter.xyz'));